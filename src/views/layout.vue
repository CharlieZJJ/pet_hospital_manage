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
                    <el-menu-item index="/cosplay"> <el-icon>
                            <UserFilled />
                        </el-icon> 角色扮演管理</el-menu-item>
                    <el-menu-item index="/questionbank"> <el-icon>
                            <SetUp />
                        </el-icon> 题库管理</el-menu-item>
                    <el-menu-item index="/examination"> <el-icon>
                            <DocumentChecked />
                        </el-icon> 试卷管理</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>

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

<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { computed } from 'vue';
import { useRouter } from "vue-router";
const router = useRouter()
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