<template>
    <el-card shadow="always">
        <div class="card-header">
            <el-select v-model="arg.illCaseTypes" multiple placeholder="Select" class="select"
                @change="handleQuestionSearch">
                <el-option v-for="illCaseType in illCaseTypes" :key="illCaseType.value" :label="illCaseType.label"
                    :value="illCaseType.value" width="200px" />
            </el-select>
            <el-input v-model="arg.context" placeholder="请输入要查询的题目内容" class="input" />
            <el-button type="primary" @click="handleQuestionSearch">搜索</el-button>
            <el-button type="primary" @click="addQuestionDialog = true"><el-icon>
                    <DocumentAdd />
                </el-icon>添加</el-button>
            <el-button type="primary" @click="handleQuestionDeleteBatch"> <el-icon>
                    <Delete />
                </el-icon>删除</el-button>
        </div>
        <el-table :data="tableData" border stripe style="width: 100%" height="460" @selection-change="handleSelectionChange"
            :cell-style="handleCellStyle" row-key="id">
            <el-table-column type="selection" align="center" reserve-selection/>
            <el-table-column prop="id" label="ID" width="70" align="center" />
            <el-table-column prop="context" label="题目" align="center" show-overflow-tooltip="true"/>
            <el-table-column label="选项" align="center">
                <el-table-column prop="options[0].option" label="A" align="center" show-overflow-tooltip="true"/>
                <el-table-column prop="options[1].option" label="B" align="center" show-overflow-tooltip="true"/>
                <el-table-column prop="options[2].option" label="C" align="center" show-overflow-tooltip="true"/>
                <el-table-column prop="options[3].option" label="D" align="center" show-overflow-tooltip="true"/>
            </el-table-column>
            <el-table-column prop="illCaseType" label="分类" align="center" />
            <el-table-column label="操作" align="center" width="190">
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
        <el-pagination v-model:current-page="currentPage" :page-size="10" :background="background"
            layout="prev, pager, next, jumper" :total="total" @current-change="handleQuestionSearch" />
        <el-dialog v-model="addQuestionDialog" title="添加新的题目" width="30%" center @close="handleAddQuestionDialogClose">
            <el-form ref="addQuestionForm" :model="addQuestionData" status-icon label-width="70px">
                <el-form-item label="题目" prop="context">
                    <el-input v-model="addQuestionData.context" autocomplete="off" />
                </el-form-item>
                <el-form-item label="类型" prop="illCaseType">
                    <el-select v-model="addQuestionData.illCaseType" placeholder="请选择题目类型" size="large">
                        <el-option v-for="illCaseType in illCaseTypes" :key="illCaseType.value" :label="illCaseType.label"
                            :value="illCaseType.value" />
                    </el-select>
                </el-form-item>
                <div v-for="(option, index) in addQuestionData.options">
                    <el-form-item :label="'选项 ' + String.fromCharCode(index + 65)" prop="option">
                        <div class="card-header">
                            <el-input v-model="option.option" autocomplete="off" style="width: 100%;" /> &nbsp;
                            <el-button :type="btn[index].type" @click="handleAddQuestionRight(index)"><span
                                    v-html="btn[index].msg"></span></el-button>
                        </div>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button type="primary" @click="handleAddSubmit">提交</el-button>
                    <el-button type="primary" @click="handleAddReset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog v-model="updateQuestionDialog" title="更改题目" width="30%" center @close="handleUpdateQuestionDialogClose">
            <el-form ref="addQuestionForm" :model="updateQuestionData" status-icon label-width="70px">
                <el-form-item label="题目" prop="context">
                    <el-input v-model="updateQuestionData.context" autocomplete="off" />
                </el-form-item>
                <el-form-item label="类型" prop="illCaseType">
                    <el-select v-model="updateQuestionData.illCaseType" placeholder="请选择题目类型" size="large">
                        <el-option v-for="illCaseType in illCaseTypes" :key="illCaseType.value" :label="illCaseType.label"
                            :value="illCaseType.value" />
                    </el-select>
                </el-form-item>
                <div v-for="(option, index) in updateQuestionData.options">
                    <el-form-item :label="'选项 ' + String.fromCharCode(index + 65)" prop="option">
                        <div class="card-header">
                            <el-input v-model="option.option" autocomplete="off" style="width: 540px;" /> &nbsp;
                            <el-button :type="btn[index].type" @click="handleUpdateQuestionRight(index)"><span
                                    v-html="btn[index].msg"></span></el-button>
                        </div>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button type="primary" @click="handleUpdateSubmit">提交</el-button>
                    <el-button type="primary" @click="handleUpdateReset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-card>
</template>

<script setup>
import { searchQuestion, addQuestion, updateQuestion, removeQuestion } from '@/api/api';
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';


const store = useStore()
const router = useRouter()

/**
 * 删除和批量删除
 */

const handleDelete = data => {
    const login = store.getters.isLogIn;
    if (!login.isLogIn) {
        router.push('/login')
    }
    // console.log(data)
    removeQuestion(Array.of(data.id)).then(res => {
        ElMessage.success('删除成功')
        searchDefault()
    })
}

const handleQuestionDeleteBatch = () => {
    const login = store.getters.isLogIn;
    if (!login.isLogIn) {
        router.push('/login')
    }
    removeQuestion(multipleSelection.value).then(res => {
        ElMessage.success('删除成功')
        searchDefault()
    })
}

const multipleSelection = ref([])

const handleSelectionChange = (val) => {
    multipleSelection.value = []
    val.forEach(elem => {
        multipleSelection.value.push(elem.id)
    })
    console.log(multipleSelection.value)
}

/**
 * 更改现有的题目
 */

const updateQuestionDialog = ref(false)
const updateQuestionData = ref({
    id: "",
    illCaseType: "",
    context: "",
    options: [
        {
            option: "",
            right: false
        },
        {
            option: "",
            right: false
        },
        {
            option: "",
            right: false
        },
        {
            option: "",
            right: false
        }
    ]
})

let updateQuestionDataBackup = {
    id: "",
    illCaseType: "",
    context: "",
    options: [
        {
            option: "",
            right: false
        },
        {
            option: "",
            right: false
        },
        {
            option: "",
            right: false
        },
        {
            option: "",
            right: false
        }
    ]
}

const handleClickEdit = data => {
    // console.log(updateQuestionDataBackup)
    updateQuestionData.value.illCaseType = illCaseTypeMap.indexOf(data.illCaseType)
    updateQuestionData.value.context = data.context
    updateQuestionData.value.options = data.options
    updateQuestionData.value.id = data.id
    updateQuestionDataBackup = JSON.parse(JSON.stringify(data))
    for (let i = 0; i < 4; i++) {
        if (updateQuestionData.value.options[i].right) {
            btn.value[i].type = 'success'
            btn.value[i].msg = '&#10004'
        }
    }
    updateQuestionDialog.value = true
}

const handleUpdateQuestionDialogClose = () => {
    updateQuestionDialog.value = false
    updateQuestionData.value.illCaseType = ""
    updateQuestionData.value.context = ""
    updateQuestionData.value.id = ""
    updateQuestionData.value.options = [
        {
            option: "",
            right: false
        },
        {
            option: "",
            right: false
        },
        {
            option: "",
            right: false
        },
        {
            option: "",
            right: false
        }
    ]
    updateQuestionDataBackup.illCaseType = ""
    updateQuestionDataBackup.context = ""
    updateQuestionDataBackup.illCaseType = [
        {
            option: "",
            right: false
        },
        {
            option: "",
            right: false
        },
        {
            option: "",
            right: false
        },
        {
            option: "",
            right: false
        }
    ]
    updateQuestionDataBackup.id = ""
    for (let i = 0; i < btn.value.length; i++) {
        btn.value[i].type = 'info'
        btn.value[i].msg = '&#10006'
    }
}

const handleUpdateSubmit = () => {
    const login = store.getters.isLogIn;
    if (!login.isLogIn) {
        router.push('/login')
    }
    updateQuestion(updateQuestionData.value).then(res => {
        ElMessage.success("成功啦~")
    })
    handleUpdateQuestionDialogClose()
    searchDefault()
}

const handleUpdateQuestionRight = index => {
    for (let i = 0; i < btn.value.length; i++) {
        if (i == index) {
            btn.value[i].type = 'success'
            btn.value[i].msg = '&#10004'
            updateQuestionData.value.options[i].right = true
        } else {
            btn.value[i].type = 'info'
            btn.value[i].msg = '&#10006'
            updateQuestionData.value.options[i].right = false
        }
    }
}

const handleUpdateReset = () => {
    let tmp = JSON.parse(JSON.stringify(updateQuestionDataBackup))
    updateQuestionData.value.illCaseType = illCaseTypeMap.indexOf(tmp.illCaseType)
    updateQuestionData.value.context = tmp.context
    console.log(updateQuestionData.value.options)
    updateQuestionData.value.options = tmp.options
    console.log(updateQuestionData.value.options)
    for (let i = 0; i < btn.value.length; i++) {
        if (updateQuestionData.value.options[i].right) {
            btn.value[i].type = 'success'
            btn.value[i].msg = '&#10004'
        } else {
            btn.value[i].type = 'info'
            btn.value[i].msg = '&#10006'
        }
    }
}

/**
 * 添加新的题目
 */
const addQuestionDialog = ref(false)

const handleAddQuestionDialogClose = () => {
    addQuestionDialog.value = false
    handleAddReset()
}

const btn = ref([
    {
        type: "info",
        msg: "&#10006"
    },
    {
        type: "info",
        msg: "&#10006"
    },
    {
        type: "info",
        msg: "&#10006"
    },
    {
        type: "info",
        msg: "&#10006"
    },
])

const handleAddQuestionRight = (index) => {
    for (let i = 0; i < btn.value.length; i++) {
        if (i == index) {
            btn.value[i].type = 'success'
            btn.value[i].msg = '&#10004'
            addQuestionData.value.options[i].right = true
        } else {
            btn.value[i].type = 'info'
            btn.value[i].msg = '&#10006'
            addQuestionData.value.options[i].right = false
        }
    }
    console.log(addQuestionData.value)
}


const addQuestionForm = ref()
const addQuestionData = ref({
    illCaseType: "",
    context: "",
    options: [
        {
            option: "",
            right: false
        },
        {
            option: "",
            right: false
        },
        {
            option: "",
            right: false
        },
        {
            option: "",
            right: false
        }
    ]
})

const handleAddSubmit = () => {
    const login = store.getters.isLogIn;
    if (!login.isLogIn) {
        router.push('/login')
    }
    // console.log(addQuestionData.value)
    addQuestion(addQuestionData.value).then(res => {
        ElMessage.success('成功啦~')
        handleAddQuestionDialogClose()
        searchDefault()
    })
}

const handleAddReset = () => {
    for (let i = 0; i < btn.value.length; i++) {
        btn.value[i].type = 'info'
        btn.value[i].msg = '&#10006'
    }
    addQuestionData.value.illCaseType = ""
    addQuestionData.value.context = ""
    for (let i = 0; i < 4; i++) {
        addQuestionData.value.options[i].option = ""
        addQuestionData.value.options[i].right = false
    }
}


/**
 * 搜索接口
 */

const currentPage = ref(1)
const total = ref(0)

const arg = ref({
    illCaseTypes: [],
    context: "",
    start: (currentPage.value - 1) * 10,
    length: 10
})

const handleQuestionSearch = () => {
    // console.log("arg", arg.value)
    arg.value.start = (currentPage.value - 1) * 10
    console.log(arg.value)
    search(arg.value)
}

const tableData = ref([])


const illCaseTypeMap = ["", "接诊", "检验", "诊断", "治疗"]

const illCaseTypes = [
    {
        value: 1,
        label: "接诊",
    },
    {
        value: 2,
        label: "检验",
    },
    {
        value: 3,
        label: "诊断",
    },
    {
        value: 4,
        label: "治疗",
    },
]

const search = data => {
    const login = store.getters.isLogIn;
    if (!login.isLogIn) {
        router.push('/login')
    }

    searchQuestion({
        illCaseTypes: data.illCaseTypes,
        context: data.context,
        start: data.start,
        length: data.length
    }).then(res => {
        tableData.value = []
        for(var ele of res.data) {
            tableData.value.push({
                id: ele.id,
                context: ele.context,
                options: ele.options,
                illCaseType: illCaseTypeMap[ele.illCaseType]
            })
        }
        total.value = res.recordsTotal
    })
}

const searchDefault = () => {
    searchQuestion({
        illCaseTypes: data.illCaseTypes,
        context: data.context,
        start: data.start,
        length: data.length
    }).then(res => {
        tableData.value = res.data.map(ele => {
            return {
                id: ele.id,
                context: ele.context,
                options: ele.options,
                illCaseType: illCaseTypeMap[ele.illCaseType]
            }
        })
        total.value = res.recordsTotal
        console.log(tableData)
        // console.log(tableData.value)
    })
}

onMounted(() => {
    search(arg.value)
})

/**
 * 设置单元格颜色
 */
const handleCellStyle = (row, column, rowIndex, columnIndex) => {
    switch (row.column.label) {
        case 'A': {
            let ele = tableData.value.find(n => n.id == row.row.id)
            if (ele.options[0].right) {
                return { color: "#2bae85" }
            }
            break;
        }
        case 'B': {
            let ele = tableData.value.find(n => n.id == row.row.id)
            if (ele.options[1].right) {
                return { color: "#2bae85" }
            }
            break;
        }
        case 'C': {
            let ele = tableData.value.find(n => n.id == row.row.id)
            if (ele.options[2].right) {
                return { color: "#2bae85" }
            }
            break;
        }
        case 'D': {
            let ele = tableData.value.find(n => n.id == row.row.id)
            if (ele.options[3].right) {
                return { color: "#2bae85" }
            }
            break;
        }
        default: {
            return {}
        }
    }
    return { color: "#000000" }
}

</script>

<style>
.card-header {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-bottom: 8px;
}

.input {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-right: 10px;
    width: 15%;
}

.select {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-right: 10px;
}

.el-select .el-input__inner {
    width: 250px;
}
</style>