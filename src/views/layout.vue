<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px" class="common-aside">
                <el-menu background-color="none" text-color="#fff" :router="true">
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <User />
                            </el-icon>
                            <!-- crud -->
                            <span>用户管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/user/add">添加用户</el-menu-item>
                            <el-menu-item index="/user/search">搜索用户</el-menu-item>
                            <el-menu-item index="/user/remove">删除用户</el-menu-item>
                            <el-menu-item index="/user/update">修改用户</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon>
                                <FirstAidKit />
                            </el-icon>
                            <!-- crud -->
                            <span>病例管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/illcase/add">添加病例</el-menu-item>
                            <el-menu-item index="/illcase/search">搜索病例</el-menu-item>
                            <el-menu-item index="/illcase/remove">删除病例</el-menu-item>
                            <el-menu-item index="/illcase/update">修改病例</el-menu-item>
                            <el-menu-item index="/illcase/duplicate">备份病例</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="3">
                        <template #title>
                            <el-icon>
                                <Avatar />
                            </el-icon>
                            <!-- crud -->
                            <span>人员管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/worker/add">添加人员</el-menu-item>
                            <el-menu-item index="/worker/search">搜索人员</el-menu-item>
                            <el-menu-item index="/worker/remove">删除人员</el-menu-item>
                            <el-menu-item index="/worker/update">修改人员</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="4">
                        <template #title>
                            <el-icon>
                                <Coin />
                            </el-icon>
                            <!-- crud -->
                            <span>药品管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/medicine/add">添加药品</el-menu-item>
                            <el-menu-item index="/medicine/search">搜索药品</el-menu-item>
                            <el-menu-item index="/medicine/remove">删除药品</el-menu-item>
                            <el-menu-item index="/medicine/update">修改药品</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="5">
                        <template #title>
                            <el-icon>
                                <DocumentRemove />
                            </el-icon>
                            <!-- crud -->
                            <span>档案管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/record/add">添加档案</el-menu-item>
                            <el-menu-item index="/record/search">搜索档案</el-menu-item>
                            <el-menu-item index="/record/remove">删除档案</el-menu-item>
                            <el-menu-item index="/record/update">修改档案</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="6">
                        <template #title>
                            <el-icon>
                                <Checked />
                            </el-icon>
                            <!-- crud -->
                            <span>收费管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/charge/add">添加收费</el-menu-item>
                            <el-menu-item index="/charge/search">搜索收费</el-menu-item>
                            <el-menu-item index="/charge/remove">删除收费</el-menu-item>
                            <el-menu-item index="/charge/update">修改收费</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="7">
                        <template #title>
                            <el-icon>
                                <List />
                            </el-icon>
                            <!-- crud -->
                            <span>化验项目管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/laboratoryItem/add">添加化验项目</el-menu-item>
                            <el-menu-item index="/laboratoryItem/search">搜索化验项目</el-menu-item>
                            <el-menu-item index="/laboratoryItem/remove">删除化验项目</el-menu-item>
                            <el-menu-item index="/laboratoryItem/update">修改化验项目</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="8">
                        <template #title>
                            <el-icon>
                                <Chicken />
                            </el-icon>
                            <!-- crud -->
                            <span>疫苗管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/vaccine/add">添加疫苗</el-menu-item>
                            <el-menu-item index="/vaccine/search">搜索疫苗</el-menu-item>
                            <el-menu-item index="/vaccine/remove">删除疫苗</el-menu-item>
                            <el-menu-item index="/vaccine/update">修改疫苗</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="9">
                        <template #title>
                            <el-icon>
                                <House />
                            </el-icon>
                            <!-- crud -->
                            <span>住院管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/hospitalized/add">添加住院</el-menu-item>
                            <el-menu-item index="/hospitalized/search">搜索住院</el-menu-item>
                            <el-menu-item index="/hospitalized/remove">删除住院</el-menu-item>
                            <el-menu-item index="/hospitalized/update">修改住院</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="10">
                        <template #title>
                            <el-icon>
                                <UserFilled />
                            </el-icon>
                            <!-- crud -->
                            <span>角色扮演管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/cosplay/add">添加角色扮演</el-menu-item>
                            <el-menu-item index="/cosplay/search">搜索角色扮演</el-menu-item>
                            <el-menu-item index="/cosplay/remove">删除角色扮演</el-menu-item>
                            <el-menu-item index="/cosplay/update">修改角色扮演</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="11">
                        <template #title>
                            <el-icon>
                                <Document />
                            </el-icon>
                            <!-- crud -->
                            <span>病例学习管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/illcaseStudy/add">添加病例学习</el-menu-item>
                            <el-menu-item index="/illcaseStudy/search">搜索病例学习</el-menu-item>
                            <el-menu-item index="/illcaseStudy/remove">删除病例学习</el-menu-item>
                            <el-menu-item index="/illcaseStudy/update">修改病例学习</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="12">
                        <template #title>
                            <el-icon>
                                <SetUp />
                            </el-icon>
                            <span>题库管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/questionbank/add">添加题库</el-menu-item>
                            <el-menu-item index="/questionbank/search">搜索题库</el-menu-item>
                            <el-menu-item index="/questionbank/remove">删除题库</el-menu-item>
                            <el-menu-item index="/questionbank/update">修改题库</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="13">
                        <template #title>
                            <el-icon>
                                <DocumentChecked />
                            </el-icon>
                            <span>试卷管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/examination/add">添加试卷</el-menu-item>
                            <el-menu-item index="/examination/search">搜索试卷</el-menu-item>
                            <el-menu-item index="/examination/remove">删除试卷</el-menu-item>
                            <el-menu-item index="/examination/update">修改试卷</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="14">
                        <template #title>
                            <el-icon>
                                <Stamp />
                            </el-icon>
                            <span>权限管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/roles">角色列表</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                </el-menu>
            </el-aside>
            <el-main><router-view></router-view></el-main>
        </el-container>
    </div>
</template>

<script setup>


</script>

<style scoped>
.common-header {
    background-color: #d2d2d2;
    display: flex;
}

.common-aside {
    background-color: rgb(48, 65, 86);
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

</style>