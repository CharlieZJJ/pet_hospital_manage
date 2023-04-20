<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px" class="common-aside">
<!--             <div style="display: flex; justify-content: flex-end; align-items: center;margin-bottom: 30px" class="Touxiang">-->
<!--                <el-dropdown style="text-align: center; margin: auto ">-->
<!--                  <div class="account">-->
<!--                    <img src="../../public/img/值班医生.png" alt="头像" class="touxiang"/>-->
<!--                    <div style="font-weight: bolder;margin-top: 10px; "><div  style="color: aqua">你好:{{wellCome}}</div></div>-->
<!--                  </div>-->
<!--                  <template #dropdown>-->
<!--                    <el-dropdown-menu>-->

<!--                      <el-dropdown-item @click="handleClickEdit">修改用户名</el-dropdown-item>-->
<!--                      <el-dropdown-item @click="handleChangePassword">修改密码</el-dropdown-item>-->
<!--                      <el-dropdown-item @click="logout">退出</el-dropdown-item>-->
<!--                    </el-dropdown-menu>-->
<!--                  </template>-->
<!--                </el-dropdown>-->
<!--              </div>-->
                <el-menu background-color="none" text-color="#fff" :router="true">
                    <el-menu-item index="/user"> <el-icon>
                            <User />
                        </el-icon> 用户管理</el-menu-item>
                    <el-menu-item index="/illcase"> <el-icon>
                            <FirstAidKit />
                        </el-icon> 病例管理</el-menu-item>
                    <el-menu-item index="/questionbank"> <el-icon>
                            <SetUp />
                        </el-icon> 题库管理</el-menu-item>
                    <el-menu-item index="/examination"> <el-icon>
                            <DocumentChecked />
                        </el-icon> 试卷管理</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
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
                    <el-input v-model="editPassword.oldPassword" autocomplete="off" show-password disabled></el-input>
                  </el-form-item>
                  <el-form-item label="新密码" prop="newPassword">
                    <el-input v-model="editPassword.newPassword" autocomplete="off" show-password></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="handleUpdatePasswordSubmit">提交</el-button>
                    <el-button type="primary" @click="handleUpdatePasswordReset">重置</el-button>
                    <el-button type="primary" @click="dialogPasswordVisible = false">取消</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
                <el-breadcrumb :separator-icon="ArrowRight">
                    <el-breadcrumb-item v-for="route in routes" :key="route.path" :to="{ path: route.path }">
                        {{ route.name }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <br />
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
  name:"layout",
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
import { ArrowRight } from '@element-plus/icons-vue'
import {computed, ref} from 'vue';
import { useRouter } from "vue-router";
import {changePassword, searchUser, updateUser} from "@/api/api";
import {useStore} from 'vuex'
import {ElMessage} from "element-plus";
const router = useRouter()
const store = useStore()
const dialogVisible=ref(false)
const dialogPasswordVisible=ref(false)
const dialogUserTypeVisible=ref(false)
const wellCome=ref(JSON.parse(localStorage.getItem('login')).data.username)
// console.log(router.currentRoute.value.matched)
const routes = computed(() => {
    // 过滤掉没有meta的 
    let ret = [];
    router.currentRoute.value.matched.forEach(function (val, index) {
        const route = {
            path: val.path,
            name: val.name,
        }
        ret.push(route)
    })
    // console.log(ret)
    return ret
})
const editData = ref({
  id: 0,
  name: '',
  nameBackup: ''
})
const editPassword=ref({
  oldPassword:'',
  newPassword:''
})
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
const handleChangePassword = (data) => {


  editPassword.value['oldPassword']=JSON.parse(localStorage.getItem('login')).data.password
  dialogPasswordVisible.value = true
}
const handleUpdatePasswordReset = () => {
  editPassword.value['newPassword'] = editPassword.value['oldPassword']

}

const handleUpdateReset = () => {
  editData.value['name'] = editData.value['nameBackup']

}

const handleClickEdit = (data) => {

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
      ElMessage({
        message: '修改成功',
        type: 'success',
      })
    }

  })
}



</script>

<style scoped>
.common-header {
    background-color: #d2d2d2;
    display: flex;
}

.common-aside {
    background-color: rgb(34, 40, 50);
    width: 200px;
}

/* rgb(38, 52, 69) */

.el-container {
    height: 100vh;
    overflow: hidden;
}

.logo {
    width: 80px;
}

.title {
    color: white;
}

.el-aside::-webkit-scrollbar {
    display: none;
}

.el-submenu__title:hover {
    background-color: rgb(27, 32, 40) !important;
}

.el-menu-item:hover {
    background-color: rgb(27, 32, 40) !important;
}
</style>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.Touxiang{
  margin-left: -2vw;
}

.touxiang{
  width:35px;
  height:35px;
  border-radius:50%;
  margin-top: 15px;

  /*设为圆形*/
}
</style>