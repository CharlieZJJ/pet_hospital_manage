<template>
    <el-card shadow="always">
        <div class="card-header">
            <el-input v-model="arg" placeholder="请输入关键字" style="width: 300px"></el-input> &nbsp; &nbsp;
            <el-button type="primary" @click="handleSearchIll"><el-icon>
                    <Search />
                </el-icon>搜索
            </el-button>
            <el-button type="primary" @click="addIllDialog = true"><el-icon>
                    <DocumentAdd />
                </el-icon>添加</el-button>
            <el-button type="primary" @click="handleIllDeleteBatch"> <el-icon>
                    <Delete />
                </el-icon>删除</el-button>
        </div>
        <el-table :data="tableData" border stripe style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" />
            <el-table-column prop="id" label="ID" width="70" />
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
        <!-- <el-pagination v-model:current-page="currentPage1" :page-size="10" :small="small" layout="total, prev, pager, next" :total="100" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" /> -->
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
        <el-dialog v-model="fileDialog" title="查看文件" width="60%" center>
            <el-container>
                <el-aside width="100px">
                    <el-menu default-active="0" :collapse="true" @select="handleSelectMenu">
                        <el-menu-item index="0">
                            接诊
                        </el-menu-item>
                        <el-menu-item index="1">
                            检验
                        </el-menu-item>
                        <el-menu-item index="2">
                            诊断
                        </el-menu-item>
                        <el-menu-item index="3">
                            治疗
                        </el-menu-item>
                    </el-menu></el-aside>
                <el-container>
                    <el-header>
                        <el-menu default-active="0" mode="horizontal" @select="handleSelectMenuH">
                            <el-menu-item index="0">
                                其他
                            </el-menu-item>
                            <el-menu-item index="1">
                                图片
                            </el-menu-item>
                            <el-menu-item index="2">
                                视频
                            </el-menu-item>
                        </el-menu>
                    </el-header>
                    <el-main>
                        <template v-if="mode == 0">
                        </template>
                        <template v-else-if="mode == 1">
                            <div>
                                <el-image style="width: 100%; height: 100%" :src="imgs[0]" :zoom-rate="1.2"
                                    :preview-src-list="imgs" :initial-index="0" fit="cover" />
                            </div>
                        </template>
                        <template v-else>
                            <div v-for="video in videos">
                                <video-player class="player" ref="videoPlayer" :options="playerOptions" :sources="video"
                                    :playerOptions="true">
                                </video-player>
                            </div>
                        </template>
                    </el-main>
                </el-container>
            </el-container>
        </el-dialog>
    </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { searchIll, addIll, removeIll, updateIll, getFileIds, fetchFile } from '@/api/api';
import { ElMessage } from 'element-plus';

const store = useStore()
const router = useRouter()


const fileDialog = ref(false)
const fileIDList = ref({
    other: [],
    pic: [],
    video: [],
})
const currentID = ref(0)
const mode = ref(0)

const imgs = ref([])
const videos = ref([])

const handleFile = val => {
    fileDialog.value = true
    currentID.value = val.id
}

const playerOptions = ref({
    live: true,
    playbackRates: [0.5, 1.0, 1.25, 1.5, 2.0], // 播放速度
    autoplay: false, //如果true,浏览器准备好时开始回放。
    controls: true, //控制条
    preload: "auto", //视频预加载
    muted: true, //默认情况下将会消除任何音频。
    loop: false, //导致视频一结束就重新开始。
    language: "zh-CN",
    aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该								代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应						其容器。
    controlBar: {
        timeDivider: true,
        durationDisplay: true,
        remainingTimeDisplay: true,
        currentTimeDisplay: true, // 当前时间
        volumeControl: false, // 声音控制键
        playToggle: true, // 暂停和播放键
        progressControl: true, // 进度条
        fullscreenToggle: true, // 全屏按钮
    },
    poster: "https://pixabay.com/zh/illustrations/youtube-video-icon-play-button-1834016/", //你的封面地址
    width: document.documentElement.clientWidth,
    notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时		
})

const handleSelectMenuH = (key, path) => {

    let base = 'https://2663y694s3.zicp.vip/illManage/getFile?id='

    if (key == 0) {
        mode.value = 0
    } else if (key == 1) {
        mode.value = 1
        imgs.value = []
        fileIDList.value.pic.forEach(id => {
            imgs.value.push(base + id)
        })
        // console.log('here')
        // imgs.value.push(base + 27)
        // imgs.value.push(base + 29)
    } else {
        mode.value = 2
        videos.value = []
        fileIDList.value.video.forEach(id => {
            videos.value.push({
                type: "video/mp4",
                src: base + id
            })
        })
    }
}


const handleSelectMenu = (key, path) => {
    getFileIds({
        caseID: currentID.value,
        casetype: parseInt(key),
        filetype: 0
    }).then(res => {
        fileIDList.value.other = res.data
    })
    getFileIds({
        caseID: currentID.value,
        casetype: parseInt(key),
        filetype: 1
    }).then(res => {
        fileIDList.value.pic = res.data
    })
    getFileIds({
        caseID: currentID.value,
        casetype: parseInt(key),
        filetype: 2
    }).then(res => {
        fileIDList.value.video = res.data
    })
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


const tableData = ref([])
const arg = ref('')

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

</script>

<style>
.card-header {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-bottom: 8px;
}
</style>