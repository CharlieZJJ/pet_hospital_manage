<template>
  <el-card shadow="always">
    <div class="card-header">
      <el-input v-model="arg" placeholder="请输入关键字" style="width: 300px"></el-input> &nbsp; &nbsp;
      <el-button type="primary" @click="handleSearchExam"><el-icon>
        <Search />
      </el-icon>搜索
      </el-button>
      <el-button type="primary" @click="addExamDialog = true"><el-icon>
        <DocumentAdd />
      </el-icon>添加</el-button>
      <el-button type="primary" @click="handleExamDeleteBatch"> <el-icon>
        <Delete />
      </el-icon>删除</el-button>
    </div>
    <el-table :data="tableData" border stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" />
      <el-table-column prop="id" label="试卷ID" width="70" />
      <el-table-column prop="paperTitle" label="试卷名称" />
      <el-table-column prop="totalTime" label="考试时间(分钟)" />
      <el-table-column prop="totalScore" label="总分" />
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
    <!-- <el-pagination v-model:current-page="currentPage1" :page-size="10" :small="small" layout="total, prev, pager, next" :total="100" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" /> -->
    <el-dialog v-model="addExamDialog" title="添加新的试卷" width="30%" center>
      <el-form ref="addExamForm" :model="addExamData" status-icon label-width="70px">

        <el-form-item label="试卷名称" prop="paperTitle">
          <el-input v-model="addExamData.paperTitle" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用时(分钟)" prop="totalTime">
          <el-input v-model="addExamData.totalTime" autocomplete="off" />
        </el-form-item>
        <el-form-item label="总分" prop="totalScore">
          <el-input v-model="addExamData.totalScore" autocomplete="off" />
        </el-form-item>
        <el-button type="primary" @click="addQuestions = true"><el-icon>
          <DocumentAdd />
        </el-icon>添加试题</el-button>

        <el-form-item>
          <el-button type="primary" @click="handleAddSubmit">提交</el-button>
          <el-button type="primary" @click="handleAddReset">重置</el-button>
          <el-button type="primary" @click="handleAddCancle">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog v-model="addQuestions" title="添加试题">
      <el-table :data="tableQuestionData" border stripe style="width: 100%" @selection-change="handleSelectionQuestion">
        <el-table-column type="selection" />
        <el-table-column prop="id" label="题目ID" width="70" />
        <el-table-column prop="context" label="题目内容" />
        <el-table-column prop="score" label="给分">
          <el-input v-model="Score" placeholder="请输入分数" style="width: 30px"></el-input>
          </el-table-column>
        <el-table-column label="操作" align="center" width="190">
          <template v-slot="scope">
            <el-button type="primary" v-model="scope.row.id" @click="handleClickQuestionEdit(scope.row)">
              <el-icon>
                <Edit />
              </el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name:"examPage",
  data:function() {
    return{
      Score: '', // Vue 实例中的 Score 变量
      score: ''  // 表格中的 score 列

    }
  },

  methods: {

  },
  watch: {
    Score(val) {
      this.score = val; // 将 Score 变量的值赋值给 score 列
    }
  }

}
</script>

<script setup>
import {ref, onMounted, watch} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import {  addPaper, removePaper, updatePaper, searchPaper} from '@/api/api';
import { ElMessage } from 'element-plus';

const Score=ref(0)
const score=ref(0)
const store = useStore()
const router = useRouter()




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
  removeExam({
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

const handleExamDeleteBatch = () => {
  const login = store.getters.isLogIn;
  if (!login.isLogIn) {
    router.push('/login')
  }
  multipleSelection.value.forEach(ele => {
    removeExam({
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

const updateExamDialog = ref(false)
const updateExamForm = ref()
const updateExamData = ref({
  id: '',
  title: '',
  startTime: '',
  endTime: '',
  paperId: '',
  students: '',
  backup: {
    title: '',
    startTime: '',
    endTime: '',
    paperId: '',
    students: '',
  }
})

const handleClickEdit = data => {

  updateExamData.value.id = data.id
  updateExamData.value.title = data.title
  updateExamData.value.startTime = data.startTime
  updateExamData.value.endTime = data.endTime
  updateExamData.value.paperId = data.paperId
  updateExamData.value.students = data.students
  updateExamData.value.backup = data
  updateExamDialog.value = true
}

const handleUpdateSubmit = () => {
  const login = store.getters.isLogIn;
  if (!login.isLogIn) {
    router.push('/login')
  }
  updateExam({
    token: login.token,
    id: updateExamData.value.id,
    title: updateExamData.value.title,
    startTime: updateExamData.value.startTime,
    endTime: updateExamData.value.endTime,
    paperId: updateExamData.value.paperId,
    students: updateExamData.value.students,
  }).then(res => {
    ElMessage({
      message: '修改成功',
      type: 'success',
    })
    location.reload()
  })
}

const handleUpdateReset = () => {
  updateExamData.value.title = updateExamData.value.backup.title
  updateExamData.value.startTime = updateExamData.value.backup.startTime
  updateExamData.value.endTime = updateExamData.value.backup.endTime
  updateExamData.value.paperId = updateExamData.value.backup.paperId
  updateExamData.value.students = updateExamData.value.backup.students
}

const tableQuestionData=ref([])
const tableData = ref([])
const arg = ref('')

onMounted(() => {
  search('')
  // console.log(tableData)
})

const search = (arg) => {
  if (arg === '') {
    arg = ''
  }
  const login = store.getters.isLogIn;
  if (!login.isLogIn) {
    router.push('/login')
  }
  searchPaper({
    paperTitle: arg,
    ids:[0],
    length:8000,
    start:0
  }).then(res => {
    tableData.value = res.data

    console.log(tableData.value);
  })
}

const handleSearchExam = () => {
  if (arg.value === '0') {
    searchPaper({
      paperTitle: '',
      ids:[0],
      length:8000,
      start:0
    }).then(res => {
      tableData.value = res.data
      // console.log(tableData.value);
    })
  } else {
    searchPaper({
      paperTitle: arg.value,
      ids:[0],
      length:8000,
      start:0
    }).then(res => {
      tableData.value = res.data
      // console.log(tableData.value);
    })
  }
}


const addExamDialog = ref(false)
const addExamForm = ref()
const addExamData = ref({
  paperTitle: '0',
  totalTime:0,
  paperId: 0,
  totalScore:0
})

const addQuestions=ref(false)
const addQuestionForm=ref()
const addQuestionData=ref({
  id:0,
  context:'',
  score:''
})



const handleAddSubmit = () => {
  const login = store.getters.isLogIn;
  if (!login.isLogIn) {
    router.push('/login')
  }
  addPaper({
    token: login.token,
    title: addExamData.value.paperTitle,
    totalTime: addExamData.value.totalTime,
    questions: addQuestionData.value,
  }).then(res => {
    ElMessage({
      message: '添加成功',
      type: 'success',
    })
    addExamDialog.value = false;
    location.reload()
  })
}

const handleAddReset = () => {
  addExamData.value.title = ''
  addExamData.value.startTime = ''
  addExamData.value.endTime = ''
  addExamData.value.paperId = ''
  addExamData.value.students = ''
}

const handleAddCancle = () => {
  addExamData.value = false
  addExamData.value.title = ''
  addExamData.value.startTime = ''
  addExamData.value.endTime = ''
  addExamData.value.paperId = ''
  addExamData.value.students = ''
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