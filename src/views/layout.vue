<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px" class="common-aside">
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
                <el-dialog v-model="dialogVisible" title="更改用户信息" width="30%" center>
                    <el-form ref="editDataForm" :model="editData" status-icon label-width="70px">
                        <el-form-item label="ID" prop="id">
                            <el-input v-model="editData.id" autocomplete="off" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="用户名" prop="name">
                            <el-input v-model="editData.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleUpdateSubmit">提交</el-button>
                            <el-button type="primary" @click="handleUpdateReset">重置</el-button>
                            <el-button type="primary" @click="dialogVisible = false">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
                <el-dialog v-model="dialogPasswordVisible" title="修改密码" width="30%" center>
                    <el-form ref="editPasswordForm" :model="editPassword" status-icon label-width="70px">
                        <el-form-item label="旧密码" prop="oldPassword">
                            <el-input v-model="editPassword.oldPassword" autocomplete="off" show-password
                                disabled></el-input>
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
                <div v-if="showDashboard" class="dashboard-editor-container">
                    <el-row :gutter="40" class="panel-group">
                        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                            <div class="card-panel" @click="handleSetLineChartData('user')">
                                <div>
                                    <User class="card-panel-icon-wrapper icon-people" />
                                </div>
                                <div class="card-panel-description">
                                    <div class="card-panel-text">
                                        用户
                                    </div>
                                    <CountTo ref="myCount" :start-val="0" :end-val="userTotal" :duration="2600"
                                        class="card-panel-num" />
                                </div>
                            </div>
                        </el-col>
                        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                            <div class="card-panel" @click="handleSetLineChartData('illcase')">
                                <div>
                                    <FirstAidKit class="card-panel-icon-wrapper icon-message" />
                                </div>
                                <div class="card-panel-description">
                                    <div class="card-panel-text">
                                        病例
                                    </div>
                                    <CountTo :start-val="0" :end-val="illCaseTotal" :duration="2600"
                                        class="card-panel-num" />
                                </div>
                            </div>
                        </el-col>
                        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                            <div class="card-panel" @click="handleSetLineChartData('questionbank')">
                                <div>
                                    <SetUp class="card-panel-icon-wrapper icon-money" />
                                </div>
                                <div class="card-panel-description">
                                    <div class="card-panel-text">
                                        题库
                                    </div>
                                    <CountTo :start-val="0" :end-val="questionTotal" :duration="2600"
                                        class="card-panel-num" />
                                </div>
                            </div>
                        </el-col>
                        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                            <div class="card-panel" @click="handleSetLineChartData('examination')">
                                <div>
                                    <DocumentChecked class="card-panel-icon-wrapper icon-shopping" />
                                </div>
                                <div class="card-panel-description">
                                    <div class="card-panel-text">
                                        试卷
                                    </div>
                                    <CountTo :start-val="0" :end-val="examinationTotal" :duration="2600"
                                        class="card-panel-num" />
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 24 }" :lg="{ span: 8 }" :xl="{ span: 8 }"
                            style="padding-right:8px;margin-bottom:30px;">
                            <div class="chart-wrapper" id="PieCharts" ref="pieChartRef"
                                style="width: 500px; height: 300px" />
                        </el-col>
                    </el-row>
                </div>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "layout",
    data: function () {
        return {
            wellCome: JSON.parse(localStorage.getItem('login')).data.username,

        }
    },

    methods: {
        logout() {
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
import { computed, onMounted, ref, nextTick } from 'vue';
import { useRouter, useRoute } from "vue-router";
import * as echarts from 'echarts'
import { searchIll, searchQuestion, searchPaper, searchUser } from '@/api/api'
import { CountTo } from 'vue3-count-to'
import { useStore } from 'vuex';

const router = useRouter()
const route = useRoute()
const store = useStore()

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
const editPassword = ref({
    oldPassword: '',
    newPassword: ''
})
const handleUpdatePasswordSubmit = () => {
    if (editPassword.value.oldPassword === editPassword.value.newPassword) {
        dialogPasswordVisible.value = false;
        return;
    }

    const login = store.getters.isLogIn;

    if (!login.isLogIn) {
        router.push('/login')
    }
    console.log(editData.value.name)
    changePassword({
        token: login.token,
        oldPassword: editPassword.value.oldPassword,
        newPassword: editPassword.value.newPassword
    }).then(res => {
        dialogPasswordVisible.value = false;
        const login = JSON.parse(localStorage.getItem('login') || '{}');
        if (res.success === true) {
            login.data.password = editPassword.value.newPassword;
            localStorage.setItem('login', JSON.stringify(login));
            ElMessage({
                message: '修改成功',
                type: 'success',
            })
        }

    })
}

const handleSetLineChartData = name => {
    router.push(name)
}
const handleChangePassword = (data) => {


    editPassword.value['oldPassword'] = JSON.parse(localStorage.getItem('login')).data.password
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
        const row = res.data.find(user => user.username === JSON.parse(localStorage.getItem('login')).data.username);
        console.log(row);
        editData.value['id'] = row ? row.id : null;
    })


    editData.value['name'] = JSON.parse(localStorage.getItem('login')).data.username
    editData.value['nameBackup'] = JSON.parse(localStorage.getItem('login')).data.username
    console.log(editData.value)
    dialogVisible.value = true
}
const handleUpdateSubmit = () => {
    if (editData.value.name === editData.value.nameBackup) {
        dialogVisible.value = false;
        return;
    }

    const login = store.getters.isLogIn;

    if (!login.isLogIn) {
        router.push('/login')
    }
    console.log(editData.value.name)
    updateUser({
        token: login.token,

        newUsername: editData.value.name
    }).then(res => {
        dialogVisible.value = false;
        console.log(res);
        if (res.success === true) {
            const login = JSON.parse(localStorage.getItem('login') || '{}');
            login.data.username = editData.value.name;
            localStorage.setItem('login', JSON.stringify(login));
            wellCome.value = editData.value.name;
            ElMessage({
                message: '修改成功',
                type: 'success',
            })
        }

    })
}



const showDashboard = computed(() => {
    return route.meta.showDashboard
})

const userTotal = ref(24)
const questionTotal = ref(37)
const illCaseTotal = ref(31)
const examinationTotal = ref(22)
onMounted(() => {
    console.log(route.meta.showDashboard)
    searchQuestion({
        illCaseTypes: [],
        context: "",
        start: 0,
        length: 10000
    }).then(res => {
        nextTick(() => {
            questionTotal.value = res.recordsTotal
        })
    })
    searchIll({
        name: '%'
    }).then(res => {
        nextTick(() => {
            console.log(res)
            illCaseTotal.value = res.data.length
        })
    })
    searchPaper({
        paperTitle: '',
        ids: [],
        length: 8000,
        start: 0
    }).then(res => {
        nextTick(() => {
            examinationTotal.value = res.recordsTotal
        })
    })
    const login = store.getters.isLogIn;
    if (!login.isLogIn) {
        router.push('/login')
    }
    searchUser({
        token: login.token,
        username: '%',
    }).then(res => {
        nextTick(() => {
            userTotal.value = res.data.length
        })
    })
})



let pieChartOption = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        left: 'center',
        bottom: '10',
        data: ['接诊', '检验', '诊断', '治疗']
    },
    series: [
        {
            color: ['#435EBE', '#5DDAB4', '#9694FF', '#FF7976'],
            name: '病例类型',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
        }
    ]
}


const pieChartRef = ref(null)

const initChart = (option) => {
    // console.log('here');
    const pieChart = echarts.init(document.getElementById('PieCharts'), 'macarons')
    // console.log(pieChart)
    pieChart.setOption(option)
    window.onresize = function () {
        //自适应大小
        pieChart.resize();
    };
    // console.log('here')
}

onMounted(() => {
    const q1 = searchQuestion({
        illCaseTypes: [1],
        context: "",
        start: 0,
        length: 10000
    })

    const q2 = searchQuestion({
        illCaseTypes: [2],
        context: "",
        start: 0,
        length: 10000
    })

    const q3 = searchQuestion({
        illCaseTypes: [3],
        context: "",
        start: 0,
        length: 10000
    })

    const q4 = searchQuestion({
        illCaseTypes: [4],
        context: "",
        start: 0,
        length: 10000
    })

    const map = ['接诊', '检验', '诊断', '治疗']
    Promise.all([q1, q2, q3, q4]).then(res => {
        for (let i = 0; i < res.length; i++) {
            pieChartOption.series[0].data.push({
                value: res[i].recordsTotal,
                name: map[i]
            })
        }
        nextTick(() => {
            initChart(pieChartOption)
        })
    })
})

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

.panel-group {
    margin-top: 18px;




}

.card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    height: 124px;
    background: #FFFFFF;
    border-radius: 10px;

}

img {
    width: 60px;
    height: 60px;
    display: inline-block;
}

.icon-people {
    /* color:  */
    background-color: #9694ff;
    color: #fbfaff;
}

.icon-message {
    background-color: #57caeb;
    color: #fbfaff;
}

.icon-money {
    color: #fbfaff;
    background-color: #5ddab4;
}

.icon-shopping {
    color: #fbfaff;
    background-color: #ff7976;
}

.card-panel-icon-wrapper {
    width: 3em;
    height: 3em;
    float: left;
    margin: 26px 0 0 26px;
    padding: 16px;
    transition: all 0.38s ease-out;
    border-radius: 16px;
}

.card-panel-icon {
    float: left;
    font-size: 48px;
}

.card-panel-description {
    float: right;
    font-weight: bold;
    margin: 26px;
    margin-left: 0px;


}

.card-panel-text {
    line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    margin-bottom: 12px;
}

.card-panel-num {
    font-size: 20px;
}

.card-panel-col {
    margin-bottom: 32px;
}

@media (max-width:550px) {
    .card-panel-description {
        display: none;
    }

    .card-panel-icon-wrapper {
        float: none !important;
        width: 100%;
        height: 100%;
        margin: 0 !important;


    }

    svg {
        display: block;
        margin: 14px auto !important;
        float: none !important;
    }
}

@media (max-width:1024px) {
    .chart-wrapper {
        padding: 8px;
    }
}

.dashboard-editor-container {
    padding: 32px;
    background-color: #F2F7FF;
    position: relative;
}

.chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
    border-radius: 8px;
}
</style>