<template>
  <el-card shadow="always">
    <div class="card-header">
      <el-input v-model="arg" placeholder="请输入关键字" style="width: 300px"></el-input> &nbsp; &nbsp;
      <el-button type="default" @click="handleSearchExam"><el-icon>
        <Search />
      </el-icon>搜索
      </el-button>
      <el-button type="primary" @click="addExamDialog = true"><el-icon>
        <DocumentAdd />
      </el-icon>添加</el-button>
      <el-button type="danger" @click="handleExamDeleteBatch"> <el-icon>
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
    <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="handlePageChange"
        layout="prev, pager, next"
    ></el-pagination>
    <!-- <el-pagination v-model:current-page="currentPage1" :page-size="10" :small="small" layout="total, prev, pager, next" :total="100" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" /> -->
    <el-dialog v-model="addExamDialog" title="添加新的试卷" width="30%" center>
      <el-form ref="addExamForm" :model="addExamData" status-icon label-width="70px">

        <el-form-item label="试卷名称" prop="paperTitle" label-width="100px">
          <el-input v-model="addExamData.paperTitle" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用时(分钟)" prop="totalTime" label-width="100px">
          <el-input v-model="addExamData.totalTime" autocomplete="off" />
        </el-form-item>
        <el-form-item label="总分" prop="totalScore" label-width="100px">
          <el-input v-model="addExamData.totalScore" autocomplete="off" />
        </el-form-item>
        <el-button type="default" @click="addQuestions = true" ><el-icon>
          <DocumentAdd />
        </el-icon>添加试题</el-button>

        <el-form-item style="margin-top: 20px;">
          <el-button type="success" @click="handleAddSubmit">提交</el-button>
          <el-button type="primary" @click="handleAddReset">重置</el-button>
          <el-button type="danger" @click="handleAddCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog v-model="addQuestions" title="添加试题">
      <el-table :data="tableQuestionData" ref="questionTable" border stripe style="width: 100%" @selection-change="handleSelectionQuestion">

        <el-table-column type="selection" />

        <el-table-column prop="id" label="题目ID" min-width="70px" />
        <el-table-column prop="illCaseType" label="题目类型" min-width="100px" />
        <el-table-column prop="context" label="题目内容" min-width="400px"  />
        <el-table-column prop="score" label="给分" min-width="150px">
          <template v-slot="scope">
            <el-input v-model="scope.row.score" placeholder="请输入分数" ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="margin-top: 20px;" @click="handleClickQuestionSubmit" type="success">添加</el-button>
    </el-dialog>
<!--    <el-dialog v-model="updatePaperDialog" title="修改试卷" width="30%" center @close="handleUpdatePaperDialogClose">-->
<!--      <el-form ref="updateIllForm" :model="updatePaperData" status-icon label-width="70px">-->
<!--        <el-form-item label="ID" prop="id">-->
<!--          <el-input v-model="updatePaperData.id" autocomplete="off" disabled />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="病例名" prop="name">-->
<!--          <el-input v-model="updatePaperData.name" autocomplete="off" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="接诊" prop="reception">-->
<!--          <el-input v-model="updateIllData.reception" autocomplete="off" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="检验" prop="examination">-->
<!--          <el-input v-model="updateIllData.examination" autocomplete="off" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="诊断" prop="diagnostic">-->
<!--          <el-input v-model="updateIllData.diagnostic" autocomplete="off" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="治疗" prop="treatment">-->
<!--          <el-input v-model="updateIllData.treatment" autocomplete="off" />-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="handleUpdateSubmit">提交</el-button>-->
<!--          <el-button type="primary" @click="handleUpdateReset">重置</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </el-dialog>-->
    <el-dialog v-model="editExamDialog" title="改动试卷" width="30%" center>
      <el-form ref="editExamForm" :model="editExamData" status-icon label-width="70px">
        <el-form-item label="试卷ID" prop="id" label-width="100px">
          <el-input v-model="editExamData.id" autocomplete="off" disabled/>
        </el-form-item>
        <el-form-item label="试卷名称" prop="paperTitle" label-width="100px">
          <el-input v-model="editExamData.paperTitle" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用时(分钟)" prop="totalTime" label-width="100px">
          <el-input v-model="editExamData.totalTime" autocomplete="off" />
        </el-form-item>
        <el-form-item label="总分" prop="totalScore" label-width="100px">
          <el-input v-model="editExamData.totalScore" autocomplete="off" />
        </el-form-item>
        <el-button type="default" @click="editQuestions = true" ><el-icon>
          <DocumentAdd />
        </el-icon>更新试题</el-button>

        <el-form-item style="margin-top: 20px;">
          <el-button type="success" @click="handleEditExamSubmit">提交</el-button>
          <el-button type="primary" @click="handleEditExamReset">重置</el-button>
          <el-button type="danger" @click="handleEditExamCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog v-model="editQuestions" title="更新试题">
      <el-table :data="tableEditQuestionData" border stripe style="width: 100%" @selection-change="handleSelectionEditQuestion">

        <el-table-column type="selection" />
        <el-table-column prop="id" label="题目ID" min-width="70px" />
        <el-table-column prop="illCaseType" label="题目类型" min-width="100px" />
        <el-table-column prop="context" label="题目内容" min-width="400px" />
        <el-table-column prop="score" label="给分" min-width="150px">
          <template v-slot="scope">
            <el-input v-model="scope.row.score" placeholder="请输入分数" ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="margin-top: 20px;" @click="handleEditQuestionSubmit" type="success">添加</el-button>
    </el-dialog>
  </el-card>
</template>

<script setup>
import {ref, onMounted, watch, watchEffect} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import {addPaper, removePaper, updatePaper, searchPaper, searchQuestion} from '@/api/api';
import { ElMessage } from 'element-plus';
const currentPage = ref(1)
const total = ref(0)
const pageSize = 5
const store = useStore()
const router = useRouter()
const editExamDialog=ref(false)
const editQuestions=ref(false)
const multipleSelection = ref([])
const tableEditQuestionData=ref([])
const multipleSelectionEditQuestion=ref([])
const handleSelectionEditQuestion = (val) =>{
  multipleSelectionEditQuestion.value=val.map((elem) => ({
    questionId: elem.id,
    // score: parseInt(elem.score) ?? 0 // 初始默认为0
    score: elem.score // 初始默认为0

  }));
}
const handleSelectionChange = (val) => {
  // console.log(val[0].id)
  multipleSelection.value = []
  val.forEach(elem => {
    multipleSelection.value.push(elem.id)
  })
  // console.log(multipleSelection)
}

const multipleSelectionQuestion=ref([])
const handleSelectionQuestion = (val) => {
  multipleSelectionQuestion.value = val.map((elem) => ({
    questionId: elem.id,
    // score: parseInt(elem.score) ?? 0 // 初始默认为0
    score: elem.score // 初始默认为0

  }));
};

const handleDelete = data => {
  // const login = store.getters.isLogIn;
  // if (!login.isLogIn) {
  //   router.push('/login')
  // }
  removePaper(
    // token: login.token,
    // id: data.id
    [data.id]
  ).then(res => {
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
   // console.log(ele),
    removePaper([ele])
   // console.log(ele)
  });
  ElMessage({
    message: '删除成功',
    type: 'success',
  });
  location.reload();
}
const addQuestions=ref(false)

const editExamForm = ref()
const editExamData = ref({
  id: 0,
  paperTitle:'',
  totalTime:0 ,
  totalScore:0,
  backup: {
    paperTitle: 0,
    totalTime:0 ,
    totalScore:0,
    id: 0
  }
})

const questionData=ref([{
  id:0,
  context:"",
  score:0
}])
const editQuestionData=ref([{
  id:0,
  context:"",
  score:0
}])
const handleClickEdit = data => {
  editExamDialog.value = true
  editExamData.value.id = data.id
  editExamData.value.paperTitle = data.paperTitle
  editExamData.value.totalTime = data.totalTime
  editExamData.value.totalScore = data.totalScore
  editExamData.value.backup = data
  searchQuestion({
    start:0,
    length:8000
  }).then(res =>{
    tableEditQuestionData.value = res.data.map(item => {
      // 这里可以对返回的数据进行映射和处理，以满足表格的需求
      let illCaseType = '';
      if (item.illCaseType === 1) {
        illCaseType = "猫科";
      } else if (item.illCaseType === 2) {
        illCaseType = "犬科"
      } else {
        illCaseType="其他";
      }
      return {

        id: item.id,
        illCaseType: illCaseType,
        context: item.context
      }
    })
    // tableQuestionData.value=res.data,
    console.log(tableQuestionData.value);
  });
}
const handleClickQuestionSubmit = () =>{
  addQuestions.value=false,
  questionData.value=multipleSelectionQuestion.value;
  console.log("tableQuestionData.value:")
  console.log(tableQuestionData.value)
  console.log(multipleSelectionQuestion.value)
}
const handleEditQuestionSubmit = () =>{
  editQuestions.value=false
  questionData.value=multipleSelectionEditQuestion.value;
  console.log("tableQuestionData.value:")
  console.log(tableEditQuestionData.value)
  console.log(multipleSelectionEditQuestion.value)
}

const handleEditExamSubmit = () => {
  const login = store.getters.isLogIn;
  if (!login.isLogIn) {
    router.push('/login')
  }

  for (let i = 0; i < multipleSelectionEditQuestion.value.length; i++) {
    const question = multipleSelectionEditQuestion.value[i];
    const foundQuestion = tableEditQuestionData.value.find((item) => item.id === question.questionId);
    if (foundQuestion) {
      multipleSelectionEditQuestion.value[i].score = foundQuestion.score
    }
  }



  console.log("tableQuestionData.value:")
  console.log(tableEditQuestionData.value)
  console.log(multipleSelectionEditQuestion.value)
  updatePaper({
    token: login.token,
    id: editExamData.value.id,
    paperTitle: editExamData.value.paperTitle,
    totalTime: editExamData.value.totalTime,
    totalScore: editExamData.value.totalScore,
    questions:multipleSelectionEditQuestion.value
  }).then(res => {
    ElMessage({
      message: '修改成功',
      type: 'success',
    })
   // location.reload()
  })
}

const handleEditExamReset = () => {
  editExamData.value.id = editExamData.value.backup.id
  editExamData.value.paperTitle = editExamData.value.backup.paperTitle
  editExamData.value.totalTime = editExamData.value.backup.totalTime
  editExamData.value.totalScore = editExamData.value.backup.totalScore
}
const handleEditExamCancel = () =>{
  editExamDialog.value = false
  editExamData.value.paperTitle = ''
  editExamData.value.totalScore = 0
  editExamData.value.totalTime = 0

}
const tableQuestionData=ref([])
const tableData = ref([])
const arg = ref('')

onMounted(() => {
  search('',currentPage.value)

  // console.log(tableData)
})
watch(currentPage, (newValue) => {
  search(arg.value, newValue)
})
const handlePageChange = (newPage) => {
  currentPage.value = newPage
}

const search = (arg,page) => {
  if (arg === '') {
    arg = ''
  }
  const login = store.getters.isLogIn;
  if (!login.isLogIn) {
    router.push('/login')
  }
  searchPaper({
    paperTitle: arg,
    ids:[],
    length:8000,
    start:0
  }).then(res => {

    tableData.value=[];
    let i,j=0;
    for(i = 0+(page-1)*pageSize,j=0;j<pageSize&&i<res.data.length;i++,j++){
      tableData.value[j]= res.data[i];
    }
    total.value = res.data.length
    console.log(tableData);
    console.log(tableData.value);
    console.log(tableData.value);
  });
  searchQuestion({
    start:0,
    length:8000
  }).then(res =>{
    tableQuestionData.value = res.data.map(item => {
      // 这里可以对返回的数据进行映射和处理，以满足表格的需求
      let illCaseType = '';
      if (item.illCaseType === 1) {
        illCaseType = "猫科";
      } else if (item.illCaseType === 2) {
        illCaseType = "犬科"
      } else {
        illCaseType="其他";
      }
      return {

        id: item.id,
        illCaseType: illCaseType,
        context: item.context
      }
    })
    // tableQuestionData.value=res.data,
    console.log(tableQuestionData.value);
  });

}

const handleSearchExam = () => {

    search(arg.value,1)

}


const addExamDialog = ref(false)
const addExamForm = ref()
const addExamData = ref({
  paperTitle: '',
  totalTime:0,
  paperId: 0,
  totalScore:0
})
// const submitDataQuestion = ref(
//     multipleSelectionQuestion.value.map(({ id, score }) => ({
//       questionId: id,
//       score: score
//     }))
// );





const handleAddSubmit = () => {
  const login = store.getters.isLogIn;
  if (!login.isLogIn) {
    router.push('/login')
  }

  for (let i = 0; i < multipleSelectionQuestion.value.length; i++) {
    const question = multipleSelectionQuestion.value[i];
    const foundQuestion = tableQuestionData.value.find((item) => item.id === question.questionId);
    if (foundQuestion) {
      multipleSelectionQuestion.value[i].score = foundQuestion.score
    }
  }
  addPaper({
    token: login.token,
    paperTitle: addExamData.value.paperTitle,
    totalTime: addExamData.value.totalTime,
    totalScore:addExamData.value.totalScore,
    questions: multipleSelectionQuestion.value
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
  addExamData.value.paperTitle = ''
  addExamData.value.totalScore = 0
  addExamData.value.totalTime = 0
}

const handleAddCancel = () => {
  addExamDialog.value = false
  addExamData.value.paperTitle = ''
  addExamData.value.totalScore = 0
  addExamData.value.totalTime = 0

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