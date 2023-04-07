<template>
    <el-button type="primary" @click="addIllDialog = true"><el-icon>
            <DocumentAdd />
        </el-icon>添加</el-button>
    <el-button type="primary" @click="handleIllDeleteBatch"> <el-icon>
            <Delete />
        </el-icon>删除</el-button>
    <el-card class="box-card">
        <el-table :data="tableData" border stripe style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" />
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="name" label="病例名称" />
            <el-table-column prop="reception" label="接诊" />
            <el-table-column prop="examination" label="检验" />
            <el-table-column prop="diagnostic" label="诊断" />
            <el-table-column prop="treatment" label="治疗" />
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
                    <el-button type="primary" @click="dialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- <el-button @click="handleSearch">search</el-button> -->
    </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { searchIll, addIll } from '@/api/api';
import { ElMessage } from 'element-plus';

const store = useStore()
const router = useRouter()

const tableData = ref([])

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

const multipleSelection = ref([])

const handleSelectionChange = (val) => {
    console.log(val)
    
    console.log(multipleSelection)
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
        console.log(tableData.value);
    })
}

</script>