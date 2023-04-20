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
    <el-table row-key="id" :data="tableData" border stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" reserve-selection  />
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
        layout="total,  prev, pager, next, jumper"
    ></el-pagination>

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
        <el-button type="default" @click="handleAddQuestions" ><el-icon>
          <DocumentAdd />
        </el-icon>添加试题</el-button>

        <el-form-item style="margin-top: 20px;">
          <el-button type="success" @click="handleAddSubmit">提交</el-button>
          <el-button type="primary" @click="handleAddReset">重置</el-button>
          <el-button type="danger" @click="handleAddCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog v-model="addQuestions" style="width:1100px" title="添加试题">
      <el-table row-key="id" :data="tableQuestionData" :pagination="paginationRef" ref="questionTable" border stripe highlight-current-row style="width: 100%" @selection-change="handleSelectionQuestion">

        <el-table-column reserve-selection type="selection" />

        <el-table-column prop="id" label="题目ID" min-width="90px" />
        <el-table-column prop="illCaseType" label="题目类型" min-width="90px" />
        <el-table-column prop="context" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" label="题目内容" min-width="600px"  />
        <el-table-column prop="score" label="给分" min-width="150px">
          <template v-slot="scope">
            <el-input v-model="scores[scope.row.id]" placeholder="请输入分数" ></el-input>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
          ref="pagination"
          :page-size="5"
          :current-page="paginationCurrentPage"
          :total="paginationtotal"
          layout="total,  prev, pager, next, jumper"
          @current-change="handleCurrentChange"
      ></el-pagination>
      <el-button style="margin-top: 20px;" @click="handleClickQuestionSubmit" type="success">添加</el-button>
    </el-dialog>

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
        <el-button type="default" @click="handleeditQuestions" ><el-icon>
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
      <el-table  ref="multipleTableRef" row-key="id" :data="tableEditQuestionData" border stripe style="width: 100%" :row-class-name="row => row.selected ? 'selected-row' : ''"  @selection-change="handleSelectionEditQuestion">

        <el-table-column type="selection" reserve-selection></el-table-column>

        <el-table-column prop="id" label="题目ID" min-width="70px" />
        <el-table-column prop="illCaseType" label="题目类型" min-width="100px" />
        <el-table-column prop="context" label="题目内容" min-width="400px" />
        <el-table-column prop="score" label="给分" min-width="150px">
          <template v-slot="scope">
            <el-input v-model="scoresEdit[scope.row.id]" placeholder="请输入分数" ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          ref="paginationEdit"
          :page-size="5"
          :current-page="paginationEditCurrentPage"
          :total="paginationEdittotal"
          @current-change="handleCurrentEditChange"
          layout="total,  prev, pager, next, jumper"
      ></el-pagination>
      <el-button style="margin-top: 20px;" @click="handleEditQuestionSubmit" type="success">添加</el-button>
    </el-dialog>
  </el-card>
</template>





<script setup>
import { defineComponent } from 'vue'
import {ref, onMounted, watch, watchEffect, nextTick} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import {addPaper, removePaper, updatePaper, searchPaper, searchQuestion} from '@/api/api';
import { ElMessage, ElTable} from 'element-plus';

const paginationRef = ref(null);
const paginationEditRef=ref(null);
const paginationCurrentPage = ref(1);
const paginationtotal = ref(0);
const paginationEditCurrentPage = ref(1);
const paginationEdittotal = ref(0);
// const pagination = {
//   CurrentPage: 1,
//   total: 0,
//   layout: "total,  prev, pager, next, jumper",
// };
// const paginationEdit = {
//   CurrentPage: 1,
//   total: 0,
//   layout: "total,  prev, pager, next, jumper",
// };

const handleAddQuestions= () =>{
  addQuestions.value = true;
}
const handleCurrentChange = async (page) => {
  paginationCurrentPage.value = page;
  console.log(multipleSelectionQuestion.value);
  searchQuestions(page);
};
const handleCurrentEditChange = async (page) => {
  paginationEditCurrentPage.value = page;
  console.log(multipleSelectionEditQuestion.value);
  searchAllQuestions(page);
};
const handleeditQuestions = () =>{
  editQuestions.value = true;
  nextTick(() => {
    for(let index=0;index<tableEditQuestionData.value.length;index++){
      multipleTableRef.value.toggleRowSelection(tableEditQuestionData.value[index], false);
      if(tableEditQuestionData.value[index].selected){
        console.log(tableEditQuestionData.value[index]);
        multipleTableRef.value.toggleRowSelection(tableEditQuestionData.value[index], true);
      }
    }
  });
}

const scores = ref([]);
const scoresEdit=ref([]);



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
// const handleSelectionEditQuestion = (val) =>{
//   multipleSelectionEditQuestion.value=val.map((elem) => ({
//     questionId: elem.id,
//     // score: parseInt(elem.score) ?? 0 // 初始默认为0
//     score: elem.score // 初始默认为0
//
//   }));
// }

const handleSelectionEditQuestion = (val) => {
  multipleSelectionEditQuestion.value=[]
  for (let i = 0; i < val.length; i++) {
    const elem = val[i];

    multipleSelectionEditQuestion.value.push({

      score: parseInt(scoresEdit.value[elem.id])??0 ,
      questionId: elem.id
    }) ;

    console.log(scoresEdit.value[elem.id]);
  }
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
  multipleSelectionQuestion.value=[]
  for (let i = 0; i < val.length; i++) {
    const elem = val[i];

    multipleSelectionQuestion.value.push({
      score: parseInt(scores.value[elem.id])??0 ,
      questionId: elem.id
    });
    console.log(scores.value[elem.id]);
  }

};

let selectHistory=[]
const tableQuestionEditDataCopy=ref([])

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
const addQuestions=ref(false);


const multipleTableRef = ref()
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
const questionExistIds=ref([]);
// defineExpose({
//   tableEditQuestionData,
//   multipleTable
// });

const handleClickEdit = data => {
  editExamDialog.value = true
  editExamData.value.id = data.id
  editExamData.value.paperTitle = data.paperTitle
  editExamData.value.totalTime = data.totalTime
  editExamData.value.totalScore = data.totalScore
  editExamData.value.backup = data
  let ids=[];
  ids.push(data.id);
  console.log("ids:"+ids);
  searchPaper({
    ids:ids,
    start:0,
    length:5
  }).then(res =>{
    console.log(res.data);
    questionExistIds.value=[];
    for(let i = 0; i < 1000; i++) {

          scoresEdit.value[i]=0;
    }
    for(let i = 0;i<res.data[0].questions.length;i++ ){
      questionExistIds.value.push(res.data[0].questions[i].id);
      scoresEdit.value[res.data[0].questions[i].id]=res.data[0].questions[i].score
    }
    multipleSelectionEditQuestion.value=[]
    for(let i =0;i<questionExistIds.value.length;i++){
      multipleSelectionEditQuestion.value.push({
        questionId:questionExistIds.value[i],
        score:scoresEdit.value[questionExistIds.value[i]]
      })
    }

    console.log("questionExistIds:");
    console.log(questionExistIds.value);
    const sortFunc = (a, b) => {
      const indexA = questionExistIds.value.indexOf(a.id);
      const indexB = questionExistIds.value.indexOf(b.id);

      if (indexA >= 0 && indexB >= 0) {
        return indexA - indexB;
      } else if (indexA >= 0) {
        return -1;
      } else if (indexB >= 0) {
        return 1;
      } else {
        return 0;
      }
    };
    searchQuestion({
      start:0,
      length:8000
    }).then((res) => {
      console.log("查题目res.data:");
      console.log(res.data);
      res.data.sort(sortFunc);
      console.log("题目排好序res.data:");
      console.log(res.data);
      tableEditQuestionData.value = res.data.map(item => {
        // 这里可以对返回的数据进行映射和处理，以满足表格的需求
        let illCaseType = '';
        if (item.illCaseType === 1) {
          illCaseType = "传染病";
        } else if (item.illCaseType === 2) {
          illCaseType = "寄生虫病"
        }
        else if (item.illCaseType === 3) {
          illCaseType = "内科"
        }
        else if (item.illCaseType === 4) {
          illCaseType = "外科"
        }else {
          illCaseType="其他";
        }
        let isSelected=false;
        for(let j=0;j<questionExistIds.value.length;j++){
          if(item.id===questionExistIds.value[j]){
            isSelected=true;
          }
        }


        return {
          selected:isSelected,
          id: item.id,
          illCaseType: illCaseType,
          context: item.context
        }
        // nextTick(() =>{
        //
        // })
      })

      tableQuestionEditDataCopy.value=[]
      tableQuestionEditDataCopy.value=tableEditQuestionData.value;
      console.log(tableQuestionEditDataCopy.value);
      tableEditQuestionData.value=[];
      let i,j=0;
      for(i = 0+(paginationEditCurrentPage.value-1)*5,j=0;j<5&&i<tableQuestionEditDataCopy.value.length;i++,j++){
        tableEditQuestionData.value[j]= tableQuestionEditDataCopy.value[i];
      }

      paginationEdittotal.value=tableQuestionEditDataCopy.value.length;
      console.log(paginationEdittotal.value);
    });
  });

}
const handleClickQuestionSubmit = () =>{
  console.log("multipleSelectionQuestion.value")
  console.log(multipleSelectionQuestion.value)
  addQuestions.value=false;
  console.log("multipleSelectionQuestion.value")
  console.log(multipleSelectionQuestion.value)
  for(let i=0;i<multipleSelectionQuestion.value.length;i++){

    console.log(scores.value[multipleSelectionQuestion.value[i].questionId]);
    multipleSelectionQuestion.value[i].score=parseInt(scores.value[multipleSelectionQuestion.value[i].questionId]) ||0
  }

  questionData.value=multipleSelectionQuestion.value;
  // console.log("tableQuestionData.value:")
  // console.log(tableQuestionData.value)
  console.log("multipleSelectionQuestion.value")
  console.log(multipleSelectionQuestion.value)
}
const handleEditQuestionSubmit = () =>{
  editQuestions.value=false

  questionData.value=multipleSelectionEditQuestion.value;
  console.log("tableEditQuestionData.value:")
  console.log(tableEditQuestionData.value)
  console.log("multipleSelectionEditQuestion.value:")
  console.log(multipleSelectionEditQuestion.value)
}

const handleEditExamSubmit = () => {
  const login = store.getters.isLogIn;
  if (!login.isLogIn) {
    router.push('/login')
  }
  // nextTick(()=>{
  //   let val = multipleTableRef.value.getSelectionRows
  //   multipleSelectionEditQuestion.value=[]
  //   for (let i = 0; i < val.length; i++) {
  //     const elem = val[i];
  //
  //     multipleSelectionEditQuestion.value[i] = {
  //
  //       score: parseInt(scoresEdit.value[elem.id])??0 ,
  //       questionId: elem.id
  //     };
  //
  //     console.log(scoresEdit.value[elem.id]);
  //   }
  //     }
  // )

  // for (let i = 0; i < multipleSelectionEditQuestion.value.length; i++) {
  //   const question = multipleSelectionEditQuestion.value[i];
  //   const foundQuestion = tableEditQuestionData.value.find((item) => item.id === question.questionId);
  //   if (foundQuestion) {
  //     multipleSelectionEditQuestion.value[i].score = foundQuestion.score
  //   }
  // }
  console.log("tableQuestionData.value:")
  console.log(tableEditQuestionData.value)
  console.log("multipleSelectionEditQuestion.value:")
  console.log(multipleSelectionEditQuestion.value)
  for(let i=0;i<multipleSelectionEditQuestion.value.length;i++){

    console.log(scoresEdit.value[multipleSelectionEditQuestion.value[i].questionId]);
    multipleSelectionEditQuestion.value[i].score=parseInt(scoresEdit.value[multipleSelectionEditQuestion.value[i].questionId]) ||0
  }
  updatePaper({
    token: login.token,
    id: editExamData.value.id,
    paperTitle: editExamData.value.paperTitle,
    totalTime: editExamData.value.totalTime,
    totalScore: editExamData.value.totalScore,
    questions:multipleSelectionEditQuestion.value
  }).then(res => {
    if(res.message==="成功"){
      ElMessage({
      message: '修改成功',
      type: 'success',
    })}
    editExamDialog.value=false;
    search("",currentPage.value);
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
  for(let i = 0; i < 1000; i++) {
    scores.value.push(0),
    scoresEdit.value.push(0)
  }

  // console.log(tableData)
})
watch(currentPage, (newValue) => {
  search(arg.value, newValue)
})

watch(paginationCurrentPage,(newValue) => {
  searchQuestions(newValue)
})
watch(paginationEditCurrentPage,(newValue) => {
  searchQuestions(newValue)
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
    for(i = 0+(page-1)*pageSize,j=0;j<pageSize&&i<res.recordsTotal;i++,j++){
      tableData.value[j]= res.data[i];
    }
    total.value = res.recordsTotal
    console.log(tableData);
    console.log(tableData.value);
    console.log(tableData.value);
  });
     searchQuestions()

}

const searchQuestions = (page) =>{

    searchQuestion({
      start:(page-1)*5||0,
      length:5
    }).then(res =>{
      tableQuestionData.value = res.data.map(item => {

        // 这里可以对返回的数据进行映射和处理，以满足表格的需求
        let illCaseType = '';
        if (item.illCaseType === 1) {
          illCaseType = "传染病";
        } else if (item.illCaseType === 2) {
          illCaseType = "寄生虫病"
        }
        else if (item.illCaseType === 3) {
          illCaseType = "内科"
        }
        else if (item.illCaseType === 4) {
          illCaseType = "外科"
        }else {
          illCaseType="其他";
        }
        // scores.value[item.id]=0;
        return {
          checked:false,
          id: item.id,
          illCaseType: illCaseType,
          context: item.context
        }
      })

      paginationtotal.value=res.recordsTotal;
      //for(let i = 0; i < res.re)
      // tableQuestionData.value=res.data,
      console.log(tableQuestionData.value);
    });
}

const searchAllQuestions = (page) =>{
  tableEditQuestionData.value=[];
  let i,j=0;
  for(i = 0+(paginationEditCurrentPage.value-1)*5,j=0;j<5&&i<tableQuestionEditDataCopy.value.length;i++,j++){
    tableEditQuestionData.value[j]= tableQuestionEditDataCopy.value[i];
  }
  paginationEdittotal.value=tableQuestionEditDataCopy.value.length;
}
//accept, analysis, definition,ideation,idea selection,implementation,evaluation

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

  // for (let i = 0; i < multipleSelectionQuestion.value.length; i++) {
  //   const question = multipleSelectionQuestion.value[i];
  //   const foundQuestion = tableQuestionData.value.find((item) => item.id === question.questionId);
  //   if (foundQuestion) {
  //     multipleSelectionQuestion.value[i].score = foundQuestion.score
  //   }
  // }
  addPaper({
    token: login.token,
    paperTitle: addExamData.value.paperTitle,
    totalTime: addExamData.value.totalTime,
    totalScore:addExamData.value.totalScore,
    questions: multipleSelectionQuestion.value
  }).then(res => {
    if(res.message==="success"){
      ElMessage({
        message: '添加成功',
        type: 'success',
      })
    }



    addExamDialog.value = false;
  //   location.reload()
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
