<template>
  <div style="display: flex; justify-content: flex-end; align-items: center;margin-bottom: 30px" class="Touxiang">
    <el-dropdown style="text-align: right">
      <div class="account">
        <img src="../../../../public/img/值班医生.png" alt="头像" class="touxiang"/>
        <div style="font-weight: bolder;margin-top: 10px; "><div  style="color: aqua">{{wellCome}}</div></div>
      </div>
      <template #dropdown>
        <el-dropdown-menu>

          <el-dropdown-item @click="handleClickEdit">修改用户名</el-dropdown-item>
          <el-dropdown-item @click="handleChangePassword">修改密码</el-dropdown-item>
          <el-dropdown-item @click="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <el-card shadow="always" >

<!-- <div style="display:flex; justify-content: flex-end; align-items: center;margin-bottom: 20px;">-->

<!--      <el-input placeholder="请输入搜索关键字" v-model="arg" style="width: 300px" class="search-box"></el-input>-->
<!--      <el-button type="primary" style="margin-left: 10px;" @click="handleSearch">搜索</el-button>-->
<!--    </div>-->
    <div class="card-header" style="display: flex; justify-content: flex-end; align-items: center;">
      <el-input v-model="arg" style="width: 500px;" placeholder="请输入关键字"><template #append>
        <el-button type="primary" @click="handleSearch"><el-icon>
          <Search />
        </el-icon>搜索</el-button>
      </template></el-input>&nbsp;&nbsp;&nbsp;


    </div>
    <el-table :data="tableData" border stripe style="width: 100%; margin-top: 20px;" @selection-change="handleSelectionChange">
      <el-table-column type="selection" />
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="usertype" label="权限"></el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button
              type="primary"
              v-model="scope.row.id"
              @click="handleClickUserType(scope.row)"
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
    <el-dialog
        v-model="dialogPasswordVisible"
        title="修改密码"
        width="30%"
        center
    >
      <el-form
          ref="editPasswordForm"
          :model="editPassword"
          status-icon
          label-width="70px"
      >
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="editPassword.oldPassword" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="editPassword.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUpdatePasswordSubmit">提交</el-button>
          <el-button type="primary" @click="handleUpdatePasswordReset">重置</el-button>
          <el-button type="primary" @click="dialogPasswordVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
        v-model="dialogUserTypeVisible"
        title="更改用户权限"
        width="30%"
        center
    >
      <el-form
          ref="editUserTypeForm"
          status-icon
          label-width="70px"
      >
        <el-form-item>
          <el-button type="success" @click="upManage">升为管理员</el-button>
          <el-button type="danger" @click="downUser">置为普通用户</el-button>
          <el-button type="primary" @click="dialogUserTypeVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name:"userPage",
  data:function() {
    return{
      wellCome: JSON.parse(localStorage.getItem('login')).data.username ,

    }
  },

  methods: {
    logout(){
      console.log(localStorage.getItem('login'));
      localStorage.removeItem('login');
      console.log(localStorage.getItem('login'));
      this.$router.push('/login');
    },


  },


}
</script>


<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import {changePassword, searchUser, setUserType, searchExam, updateUser} from '@/api/api';
import {ElMessage} from "element-plus";

const store = useStore()
const router = useRouter()
const wellCome=ref(JSON.parse(localStorage.getItem('login')).data.username)

const tableData = ref([])
const arg = ref('')
const dialogVisible = ref(false)
const dialogPasswordVisible=ref(false)
const dialogUserTypeVisible=ref(false)
const multipleSelection = ref([])
const editData = ref({
  id: 0,
  name: '',
  nameBackup: ''
})
const userData = ref({
  id: 0,
  name: '',
  })

const editDataForm = ref()
const editPassword=ref({
  oldPassword:'',
  newPassword:''
})
const editPasswordForm=ref()
const currentPage = ref(1)
const total = ref(0)
const pageSize = 5
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
    console.log(res);
    if(res.success===true){
      const login = JSON.parse(localStorage.getItem('login') || '{}');
      login.data.username = editData.value.name;
      localStorage.setItem('login', JSON.stringify(login));
      wellCome.value=editData.value.name;

      search('%',currentPage.value)
    }

  })
}

const handleUpdatePasswordSubmit = () => {
  if(editPassword.value.oldPassword === editPassword.value.newPassword) {
    dialogPasswordVisible.value = false;
    return;
  }

  const login = store.getters.isLogIn;

  if(!login.isLogIn) {
    router.push('/login')
  }
  console.log(editData.value.name)
  changePassword({
    token: login.token,
    oldPassword:editPassword.value.oldPassword,
    newPassword: editPassword.value.newPassword
  }).then(res => {
    dialogPasswordVisible.value = false;
    const login = JSON.parse(localStorage.getItem('login') || '{}');
    if(res.success===true){
      login.data.password = editPassword.value.newPassword;
      localStorage.setItem('login', JSON.stringify(login));
      ElMessage({
        message: '修改成功',
        type: 'success',
      })
    }

  })
}
const upManage = () => {

  const login = store.getters.isLogIn;

  if(!login.isLogIn) {
    router.push('/login')
  }
  console.log(editData.value.name)
  setUserType({
    token: login.token,
    id:userData.value.id,
    usertype:1
  }).then(res => {
    dialogUserTypeVisible.value = false;
    const login = JSON.parse(localStorage.getItem('login') || '{}');
    if(res.success===true){
      search('%',currentPage.value)
      ElMessage({
        message: '设置成功',
        type: 'success',
      })
    }

  })
}
const downUser = () => {

  const login = store.getters.isLogIn;

  if(!login.isLogIn) {
    router.push('/login')
  }
  console.log(editData.value.name)
  setUserType({
    token: login.token,
    id:userData.value.id,
    usertype:0
  }).then(res => {
    dialogUserTypeVisible.value = false;
    const login = JSON.parse(localStorage.getItem('login') || '{}');
    if(res.success===true){
      search('%',currentPage.value)
      ElMessage({
        message: '设置成功',
        type: 'success',
      })
    }

  })
}

const handleUpdatePasswordReset = () => {
  editPassword.value['newPassword'] = editPassword.value['oldPassword']

}
const handleUpdateReset = () => {
  editData.value['name'] = editData.value['nameBackup']

}

const handleClickEdit = (data) => {
  // console.log(data)
  console.log(tableData);
  const login = store.getters.isLogIn;
      searchUser({
        token: login.token,
        username: '%',

      }).then(res => {


        console.log(res);
        const row=res.data.find(user =>user.username === JSON.parse(localStorage.getItem('login')).data.username);
        console.log(row);
        editData.value['id'] = row ? row.id : null;
      })


  editData.value['name'] =  JSON.parse(localStorage.getItem('login')).data.username
  editData.value['nameBackup'] =  JSON.parse(localStorage.getItem('login')).data.username
   console.log(editData.value)
  dialogVisible.value = true
}
const handleClickUserType = (data) => {
  userData.value['id']=data.id
  dialogUserTypeVisible.value=true
}
const handleChangePassword = (data) => {
  // console.log(data)

  editPassword.value['oldPassword']=JSON.parse(localStorage.getItem('login')).data.password
  // console.log(editData.value)
  dialogPasswordVisible.value = true
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
    // searchExam({
    //   ids:[0],
    //   examTitle:"犬科考试",
    //   start:0,
    //   length:8000,
    // }).then(
    //     res =>{
    //       console.log(res.message),
    //           console.log(res.data)
    //     }
    // )
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
      tableData.value[j]= { id: res.data[i].id, username: res.data[i].username, usertype:res.data[i].usertype===1?"管理员":"普通用户" };
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

const handleSelectionChange = (val) => {
  // console.log(val[0].id)
    multipleSelection.value = []
  val.forEach(elem => {
    multipleSelection.value.push(elem.id)
  })
  // console.log(multipleSelection)
}



</script>


<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
.Touxiang{
  margin-left: 28vw;
}

.touxiang{
  width:35px;
  height:35px;
  border-radius:50%;
  margin-top: 15px;

  /*设为圆形*/
}
</style>