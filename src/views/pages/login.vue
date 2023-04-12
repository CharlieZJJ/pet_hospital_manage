<template>
    <!-- <div class="login_wrap">
        <div class="form_wrap">
            <el-form ref="formRef" :model="loginData" label-width="120px" class="demo-dynamic">
                <el-form-item prop="username" label="账号" :rules="[
                    {
                        required: true,
                        message: '请输入您的账号！',
                        trigger: 'blur',
                    }
                ]">
                    <el-input v-model="data.loginData.username" />
                </el-form-item>
                <el-form-item prop="password" label="密码" :rules="[
                    {
                        required: true,
                        message: '请输入您的密码！',
                        trigger: 'blur',
                    }
                ]">
                    <el-input v-model="data.loginData.password" type="password" />
                </el-form-item>
            </el-form>
            <el-button type="primary" class="login_btn" @click="handleLogin">登陆</el-button>
        </div>
    </div> -->
    <div class="login-body">
        <div class="login-container">
            <div class="head">
                <img class="logo" src="../../assets/logo.png" width="300" height="160" />
                <div class="name">
                    <div class="title">虚拟宠物医院后台管理系统</div>
                </div>
            </div>
            <el-form label-position="top" :model="data.loginData" ref="formRef" class="login-form">
                <el-form-item label="账号" prop="username" :rules="[
                    {
                        required: true,
                        message: '请输入您的账号！',
                        trigger: 'blur',
                    }
                ]">
                    <el-input type="text" v-model.trim="data.loginData.username" autocomplete="off"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="密码" prop="password" :rules="[
                    {
                        required: true,
                        message: '请输入您的密码！',
                        trigger: 'blur',
                    }
                ]">
                    <el-input type="password" v-model.trim="data.loginData.password" autocomplete="off"></el-input>
                </el-form-item>
                <br/>
                <el-form-item>
                    <el-button style="width: 100%" type="primary" @click="handleLogin">立即登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { login } from '@/api/api';
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore()
const router = useRouter()
const data = reactive({
    loginData: {
        username: "",
        password: "",
    }
})

const handleLogin = () => {
    loginBase(data.loginData)
}

onMounted(() => {
    // const log = store.state.userInfo;
    // if (log != null) {
    //     loginBase(log.data)
    // }
})

const loginBase = (data) => {
    login(data).then(res => {
        const toStore = {
            data: data,
            token: res.data.token,
        }
        store.commit('setUserInfo', toStore)
        localStorage.setItem("login", JSON.stringify(toStore))

        router.push({
            path: '/'
        })
    })
}
</script>

<style scoped>
.login-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #fff;
}

.login-container {
    width: 420px;
    height: 450px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
    position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
}

.head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 20px 0;
}

.head img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
}

.head .title {
    font-size: 20px;
    color: #1BAEAE;
    font-weight: bold;
}

.head {
    font-size: 12px;
    color: #999;
}

.login-form {
    width: 70%;
    margin: 0 auto;
}

.login-form>>>.el-form--label-top .el-form-item__label {
    padding: 0;
}

.login-form>>>.el-form-item {
    margin-bottom: 0;
}</style>