<template>
    <el-card shadow="always">
        <div class="card-header">
            <el-input v-model="arg" placeholder="请输入关键字"><template #append>
                    <el-button type="primary" @click="handleSearchIll"><el-icon>
                            <Search />
                        </el-icon>搜索</el-button>
                </template></el-input>&nbsp;&nbsp;&nbsp;
            <el-button type="primary" @click="addIllDialog = true"><el-icon>
                    <DocumentAdd />
                </el-icon>添加</el-button>
            <el-button type="primary" @click="handleIllDeleteBatch"> <el-icon>
                    <Delete />
                </el-icon>删除</el-button>
        </div>
        <el-table :data="tableData" border stripe style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" />
            <el-table-column prop="id" label="ID" width="70"/>
            <el-table-column prop="name" label="病例名称" />
            <el-table-column prop="reception" label="接诊" />
            <el-table-column prop="examination" label="检验" />
            <el-table-column prop="diagnostic" label="诊断" />
            <el-table-column prop="treatment" label="治疗" />
            <el-table-column label="操作" align="center" width="190">
                <template v-slot="scope">
                    <el-button type="primary" v-model="scope.row.id" @click="handleClickEdit(scope.row)">
                        <el-icon>
                            <Edit />
                        </el-icon>
                    </el-button>
                    <el-button type="primary" v-model="scope.row.id" @click="handleFile(scope.row)">
                        <el-icon>
                            <Link />
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
        <el-dialog v-model="addIllDialog" title="添加新的病例" width="30%" center>
            <el-form ref="addIllForm" :model="addIllData" status-icon label-width="70px">
                <el-form-item label="病例名" prop="name">
                    <el-input v-model="addIllData.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="接诊" prop="reception">
                    <el-input v-model="addIllData.reception" autocomplete="off" />
                </el-form-item>
                <el-form-item label="检验" prop="examination">
                    <el-input v-model="addIllData.examination" autocomplete="off" />
                </el-form-item>
                <el-form-item label="诊断" prop="diagnostic">
                    <el-input v-model="addIllData.diagnostic" autocomplete="off" />
                </el-form-item>
                <el-form-item label="治疗" prop="treatment">
                    <el-input v-model="addIllData.treatment" autocomplete="off" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAddSubmit">提交</el-button>
                    <el-button type="primary" @click="handleAddReset">重置</el-button>
                    <el-button type="primary" @click="handleAddCancle">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog v-model="updateIllDialog" title="添加新的病例" width="30%" center>
            <el-form ref="updateIllForm" :model="updateIllData" status-icon label-width="70px">
                <el-form-item label="ID" prop="id">
                    <el-input v-model="updateIllData.id" autocomplete="off" disabled />
                </el-form-item>
                <el-form-item label="病例名" prop="name">
                    <el-input v-model="updateIllData.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="接诊" prop="reception">
                    <el-input v-model="updateIllData.reception" autocomplete="off" />
                </el-form-item>
                <el-form-item label="检验" prop="examination">
                    <el-input v-model="updateIllData.examination" autocomplete="off" />
                </el-form-item>
                <el-form-item label="诊断" prop="diagnostic">
                    <el-input v-model="updateIllData.diagnostic" autocomplete="off" />
                </el-form-item>
                <el-form-item label="治疗" prop="treatment">
                    <el-input v-model="updateIllData.treatment" autocomplete="off" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleUpdateSubmit">提交</el-button>
                    <el-button type="primary" @click="handleUpdateReset">重置</el-button>
                    <el-button type="primary" @click="updateIllDialog = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog v-model="fileDialog" title="查看文件" width="30%" center>
            
        </el-dialog>
    </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { searchIll, addIll, removeIll, updateIll } from '@/api/api';
import { ElMessage } from 'element-plus';

const store = useStore()
const router = useRouter()

const tableData = ref([])
const arg = ref('')

const addIllDialog = ref(false)
const addIllForm = ref()
const addIllData = ref({
    name: '',
    reception: '',
    examination: '',
    diagnostic: '',
    treatment: ''
})

const handleAddSubmit = () => {
    const login = store.getters.isLogIn;
    if (!login.isLogIn) {
        router.push('/login')
    }
    addIll({
        token: login.token,
        name: addIllData.value.name,
        reception: addIllData.value.reception,
        examination: addIllData.value.examination,
        diagnostic: addIllData.value.diagnostic,
        treatment: addIllData.value.treatment,
    }).then(res => {
        ElMessage({
            message: '添加成功',
            type: 'success',
        })
        addIllDialog.value = false;
        location.reload()
    })
}

const handleAddReset = () => {
    addIllData.value.name = ''
    addIllData.value.reception = ''
    addIllData.value.examination = ''
    addIllData.value.diagnostic = ''
    addIllData.value.treatment = ''
}

const handleAddCancle = () => {
    addIllData.value = false
    addIllData.value.name = ''
    addIllData.value.reception = ''
    addIllData.value.examination = ''
    addIllData.value.diagnostic = ''
    addIllData.value.treatment = ''
}

const multipleSelection = ref([])

const handleSelectionChange = (val) => {
    // console.log(val[0].id)
    multipleSelection.value = []
    val.forEach(elem => {
        multipleSelection.value.push(elem.id)
    })
    // console.log(multipleSelection)
}

const handleDelete = data => {
    const login = store.getters.isLogIn;
    if (!login.isLogIn) {
        router.push('/login')
    }
    removeIll({
        token: login.token,
        id: data.id
    }).then(res => {
        ElMessage({
            message: '删除成功',
            type: 'success',
        })
        location.reload()
    })
}

const handleIllDeleteBatch = () => {
    const login = store.getters.isLogIn;
    if (!login.isLogIn) {
        router.push('/login')
    }
    multipleSelection.value.forEach(ele => {
        removeIll({
            token: login.token,
            id: ele
        })
    })
    ElMessage({
        message: '删除成功',
        type: 'success',
    })
    location.reload()
}

const updateIllDialog = ref(false)
const updateIllForm = ref()
const updateIllData = ref({
    id: '',
    name: '',
    reception: '',
    examination: '',
    diagnostic: '',
    treatment: '',
    backup: {
        name: '',
        reception: '',
        examination: '',
        diagnostic: '',
        treatment: '',
    }
})

const handleClickEdit = data => {
    updateIllData.value.id = data.id
    updateIllData.value.name = data.name
    updateIllData.value.reception = data.reception
    updateIllData.value.examination = data.examination
    updateIllData.value.diagnostic = data.diagnostic
    updateIllData.value.treatment = data.treatment
    updateIllData.value.backup = data
    updateIllDialog.value = true
}

const handleUpdateSubmit = () => {
    const login = store.getters.isLogIn;
    if (!login.isLogIn) {
        router.push('/login')
    }
    updateIll({
        token: login.token,
        id: updateIllData.value.id,
        name: updateIllData.value.name,
        reception: updateIllData.value.reception,
        examination: updateIllData.value.examination,
        diagnostic: updateIllData.value.diagnostic,
        treatment: updateIllData.value.treatment,
    }).then(res => {
        ElMessage({
            message: '修改成功',
            type: 'success',
        })
        location.reload()
    })
}

const handleUpdateReset = () => {
    updateIllData.value.name = updateIllData.value.backup.name
    updateIllData.value.reception = updateIllData.value.backup.reception
    updateIllData.value.examination = updateIllData.value.backup.examination
    updateIllData.value.diagnostic = updateIllData.value.backup.diagnostic
    updateIllData.value.treatment = updateIllData.value.backup.treatment
}


const handleSearchIll = () => {
    if (arg.value === '') {
        searchIll({
            name: '%',
        }).then(res => {
            tableData.value = res.data
            // console.log(tableData.value);
        })
    } else {
        searchIll({
            name: arg.value,
        }).then(res => {
            tableData.value = res.data
            // console.log(tableData.value);
        })
    }
}

const fileDialog = ref(false)
const fileIDList = ref([])

const handleFile = data => {
    fileDialog.value = true
    
}

onMounted(() => {
    search('%')
    // console.log(tableData)
})

const search = (arg) => {
    if (arg === '') {
        arg = '%'
    }
    const login = store.getters.isLogIn;
    if (!login.isLogIn) {
        router.push('/login')
    }
    searchIll({
        name: arg,
    }).then(res => {
        tableData.value = res.data
        // console.log(tableData.value);
    })
}

</script>

<style>
.card-header {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-bottom: 8px;
}
</style>