<template>
    <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="用户名" />
        <el-table-column label="操作" align="center">
            <template v-slot="scope">
                <el-button type="primary" v-model="scope.row.id" @click="handleClickEdit(scope.row)">
                    <el-icon>
                        <Edit />
                    </el-icon>
                </el-button>
                <el-button type="danger" v-model="scope.row.id" @click="handleDelete(scope.row)">
                    <el-icon>
                        <Delete />
                    </el-icon>
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="更改用户信息" width="30%" center>
        <el-form ref="editDataForm" :model="editData" status-icon label-width="70px">
            <el-form-item label="ID" prop="id">
                <el-input v-model="editData.id" autocomplete="off" disabled />
            </el-form-item>
            <el-form-item label="用户名" prop="name">
                <el-input v-model="editData.name" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleUpdateSubmit">提交</el-button>
                <el-button type="primary" @click="handleUpdateReset">重置</el-button>
                <el-button type="primary" @click="dialogVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <!-- <el-button @click="handleSearch">search</el-button> -->
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { searchUser, updateUser } from '@/api/api';

const store = useStore()
const router = useRouter()

const tableData = ref([])
const arg = ref('')
const dialogVisible = ref(false)

const editData = ref({
    id: 0,
    name: '',
    nameBackup: ''
})

const editDataForm = ref()

onMounted(() => {
    search('%')
    // console.log(tableData)
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

    updateUser({
        token: login.token,
        newUserName: editData.value.name
    }).then(res => {
        dialogVisible.value = fasle;
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

const handleSearch = () => {
    // console.log("outside", search('user'))
}

const handleDelete = (data) => {

}

const search = (arg) => {
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
        page: 0
    }).then(res => {
        tableData.value = res.data
    })
}

</script>


<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>