<template>

  <div>
    <div style="display: flex; justify-content: flex-end; align-items: center;margin-bottom: 20px;">

      <el-input placeholder="请输入搜索关键字" v-model="arg" style="width: 300px" class="search-box"></el-input>
      <el-button type="primary" style="margin-left: 10px;" @click="handleSearch">搜索</el-button>
    </div>
    <el-table :data="tableData" border stripe style="width: 100%, margin-top: 20px;">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button
              type="primary"
              v-model="scope.row.id"
              @click="handleClickEdit(scope.row)"
          >
            <el-icon>
              <Edit />
            </el-icon>
          </el-button>
          <el-button
              type="danger"
              v-model="scope.row.id"
              @click="handleDelete(scope.row)"
          >
            <el-icon>
              <Delete />
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="handlePageChange"
        layout="prev, pager, next"
    ></el-pagination>
    <el-dialog
        v-model="dialogVisible"
        title="更改用户信息"
        width="30%"
        center
    >
      <el-form
          ref="editDataForm"
          :model="editData"
          status-icon
          label-width="70px"
      >
        <el-form-item label="ID" prop="id">
          <el-input v-model="editData.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="editData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUpdateSubmit">提交</el-button>
          <el-button type="primary" @click="handleUpdateReset">重置</el-button>
          <el-button type="primary" @click="dialogVisible = false"
          >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { searchUser, updateUser } from '@/api/api';

const store = useStore()
const router = useRouter()

const pageSize = 5
const tableData = ref([])
const arg = ref('')
const dialogVisible = ref(false)

const editData = ref({
  id: 0,
  name: '',
  nameBackup: ''
})

const editDataForm = ref()

const currentPage = ref(1)
const total = ref(0)

onMounted(() => {
  search('%', currentPage.value)
})

watch(currentPage, (newValue) => {
  search(arg.value, newValue)
})

const handleUpdateSubmit = () => {
  if(editData.value.name === editData.value.nameBackup) {
    dialogVisible.value = false;
    return;
  }

  const login = store.getters.isLogIn;

  if(!login.isLogIn) {
    router.push('/login')
  }
  console.log(editData.value.name)
  updateUser({
    token: login.token,

    newUsername: editData.value.name
  }).then(res => {
    dialogVisible.value = false;
    search('%',currentPage.value)
  })
}

const handleUpdateReset = () => {
  editData.value['name'] = editData.value['nameBackup']
}

const handleClickEdit = (data) => {
  // console.log(data)
  editData.value['id'] = data.id
  editData.value['name'] = data.name
  editData.value['nameBackup'] = data.name
  // console.log(editData.value)
  dialogVisible.value = true
}
const handleDelete = (data) => {
  const index = tableData.value.findIndex(item => item.id === data.id)
  if (index !== -1) {
    tableData.value.splice(index, 1)
  }
}


const search = (arg, page) => {
  if (arg === '') {
    arg = '%'
  }
  const login = store.getters.isLogIn;
  if (!login.isLogIn) {
    router.push('/login')
  }
  searchUser({
    token: login.token,
    username: arg,

  }).then(res => {
    tableData.value=[];
    let i,j=0;

    for(i = 0+(page-1)*pageSize,j=0;j<pageSize&&i<res.data.length;i++,j++){
      tableData.value[j]=res.data[i];
    }
    total.value = res.data.length
    console.log(tableData);
    console.log(tableData.value);

  })
}
const handleSearch = () => {
  // console.log("outside", search('user'))

  search(arg.value, 1)

}

const handlePageChange = (newPage) => {
  currentPage.value = newPage
}

</script>


<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>