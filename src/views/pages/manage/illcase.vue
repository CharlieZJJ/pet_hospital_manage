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
        <el-table ref="illCaseRef" :data="tableData" border stripe style="width: 100%" height="460" @selection-change="handleSelectionChange">
            <el-table-column type="selection" />
            <el-table-column prop="id" label="ID" width="70" />
            <el-table-column prop="name" label="病例名称" show-overflow-tooltip="true" />
            <el-table-column prop="reception" label="接诊" show-overflow-tooltip="true" />
            <el-table-column prop="examination" label="检验" show-overflow-tooltip="true" />
            <el-table-column prop="diagnostic" label="诊断" show-overflow-tooltip="true" />
            <el-table-column prop="treatment" label="治疗" show-overflow-tooltip="true" />
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
        <el-pagination v-model:current-page="currentPage" :page-size="10" :background="background" 
        layout="prev, pager, next, jumper" :total="total" @current-change="handlePageChange" />
        <el-dialog v-model="addIllDialog" title="添加新的病例" width="30%" center @close="handleAddIllDialogClose">
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
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog v-model="updateIllDialog" title="更新病例" width="30%" center @close="handleUpdateIllDialogClose">
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
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog v-model="fileDialog" title="查看文件" width="60%" center @close="handleFileDialogClose">
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
                        <el-menu :default-active="mode" mode="horizontal" @select="handleSelectHorizontalMenu">
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
                        <el-upload v-if="mode != 1" ref="uploadFileForm" action='#' :http-request="uploadAction" multiple
                            :show-file-list="true" :auto-upload="true" style="width: 100%;" class="left-view">
                            <el-button type="primary">点击上传</el-button>
                        </el-upload>
                        <template v-if="mode == 0">
                            <el-table :data="otherFileData" border stripe style="width: 100%"
                                @selection-change="handleSelectionChange">
                                <el-table-column type="selection" />
                                <el-table-column prop="id" label="ID" width="70" />
                                <el-table-column prop="name" label="文件名" />
                                <el-table-column label="操作" align="center" width="190">
                                    <template v-slot="scope">
                                        <el-button type="primary" v-model="scope.row.id"
                                            @click="handleClickFileDownload(scope.row)">
                                            <el-icon>
                                                <Download />
                                            </el-icon>
                                        </el-button>
                                        <el-button type="danger" v-model="scope.row.id"
                                            @click="handleClickFileDelete(scope.row)">
                                            <el-icon>
                                                <Delete />
                                            </el-icon>
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                        <template v-else-if="mode == 1">
                            <el-upload v-model:file-list="imgs" :http-request="uploadAction" list-type="picture-card"
                                :on-preview="handleImagePreview" :on-remove="hangleImageDelete">
                                <el-icon>
                                    <Plus />
                                </el-icon>
                            </el-upload>

                            <el-dialog v-model="imagePreviewDialog">
                                <el-image :src="imagePreviewUrl" :zoom-rate="1.2"
                                    :preview-src-list="Array.of(imagePreviewUrl)" :initial-index="0" />
                            </el-dialog>
                        </template>
                        <template v-else>
                            <el-row :gutter="20" v-for="video in videos">
                                <el-col :span="12">
                                    <div class="grid-content ep-bg-purple">
                                        <video-player ref="videoPlayer" :options="playerOptions" :sources="video"
                                            :playerOptions="true">
                                        </video-player>
                                        <el-button type="danger" @click="handleRemoveVideo(video)">删除</el-button>
                                    </div>
                                </el-col>
                            </el-row>
                        </template>
                    </el-main>
                </el-container>
            </el-container>
        </el-dialog>
    </el-card>
</template>

<script setup>
import {ref, onMounted, watch, nextTick} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { searchIll, addIll, removeIll, updateIll, getFileIds, uploadFile, deleteFile } from '@/api/api';
import { ElMessage } from 'element-plus';

const store = useStore()
const router = useRouter()
const illCaseRef=ref()
/**
 * 文件操作
 */
const handleRemoveVideo = (video) => {
    let id = video.src.substr(video.src.indexOf('id=') + 3)
    const login = store.getters.isLogIn;
    if (!login.isLogIn) {
        router.push('/login')
    }
    deleteFile({
        id: id,
        token: login.token
    }).then(res => {
        ElMessage.success('删除成功！')

    })
}

const handleFileDialogClose = () => {
    videos.value = []
    imgs.value = []
    otherFileData.value = []
    mode.value = 0
    currentID.value = 0;
    currentCaseType.value = 0;
    fileDialog.value = false;
}

const imagePreviewDialog = ref(false)
const imagePreviewUrl = ref('')
const handleImagePreview = (file) => {
    imagePreviewDialog.value = true
    imagePreviewUrl.value = file.url
}

const hangleImageDelete = (file) => {
    let id = file.url.substr(file.url.indexOf('id=') + 3);
    const login = store.getters.isLogIn;
    if (!login.isLogIn) {
        router.push('/login')
    }
    deleteFile({
        id: id,
        token: login.token
    }).then(res => {
        ElMessage.success('删除成功！')

    })
}

const handleClickFileDelete = data => {
    let id = data.id;
    const login = store.getters.isLogIn;
    if (!login.isLogIn) {
        router.push('/login')
    }
    deleteFile({
        id: id,
        token: login.token
    }).then(res => {
        ElMessage.success('删除成功！')
        getFileIds({
            caseID: currentID.value,
            casetype: currentCaseType.value,
            filetype: 0
        }).then(res => {
            fileIDList.value.other = res.data
        })
        otherFileData.value.map((val, pos) => {
            if (val.id == id) {
                otherFileData.value.splice(pos, 1);
            }
        })
    })
}

const uploadFileForm = ref()
const uploadAction = (option) => {
    const login = store.getters.isLogIn;
    if (!login.isLogIn) {
        router.push('/login')
    }
    let filetype = 0
    if (option.file.type === 'video/mp4') {
        filetype = 2
    } else if (option.file.type === 'image/jpeg' || option.file.type === 'image/jpg' || option.file.type == 'image/png') {
        filetype = 1
    } else {
        filetype = 0
    }

    let param = new FormData()
    param.append('file', option.file)
    param.append('caseID', currentID.value)
    param.append('casetype', currentCaseType.value)
    param.append('filetype', filetype)
    param.append('token', login.token)
    uploadFile(param).then(res => {
        if (res && res.success) {
            ElMessage.success('上传成功！')
        }
    })
    getFileIds({
        caseID: currentID.value,
        casetype: currentCaseType.value,
        filetype: filetype
    }).then(res => {

        if (filetype == 0) {
            fileIDList.value.other = res.data
        } else if (filetype == 1) {
            fileIDList.value.imgs = res.data
        } else {
            fileIDList.value.video = res.data
        }
    })
}


const fileDialog = ref(false)

const currentID = ref(0)
const currentCaseType = ref(0)
const mode = ref(0)

const imgs = ref([])
const videos = ref([])
const otherFileData = ref([])

const handleFile = val => {
    fileDialog.value = true
    currentID.value = val.id
    handleSelectMenu(currentCaseType.value, null)
    // console.log('here')
}

const handleSelectMenu = (key, path) => {
    currentCaseType.value = parseInt(key)
    mode.value = 0
    getFileIds({
        caseID: currentID.value,
        casetype: currentCaseType.value,
        filetype: mode.value
    }).then(res => {
        otherFileData.value = []
        for (let i = 0; i < res.data.length; i++) {
            otherFileData.value.push(res.data[i])
        }
    })
}

const handleSelectHorizontalMenu = (key, path) => {
    let base = 'https://2663y694s3.zicp.vip/illManage/getFile?id=';
    if (key == 0) {
        mode.value = 0
        getFileIds({
            caseID: currentID.value,
            casetype: currentCaseType.value,
            filetype: mode.value
        }).then(res => {
            otherFileData.value = []
            for (let i = 0; i < res.data.length; i++) {
                otherFileData.value.push(res.data[i])
            }
        })
    } else if (key == 1) {
        mode.value = 1
        getFileIds({
            caseID: currentID.value,
            casetype: currentCaseType.value,
            filetype: mode.value
        }).then(res => {
            imgs.value = []
            for (let i = 0; i < res.data.length; i++) {
                imgs.value.push({
                    name: res.data[i].name,
                    url: base + res.data[i].id
                })
            }
        })
    } else {
        mode.value = 2
        videos.value = []
        getFileIds({
            caseID: currentID.value,
            casetype: currentCaseType.value,
            filetype: mode.value
        }).then(res => {
            videos.value = []
            for (let i = 0; i < res.data.length; i++) {
                videos.value.push({
                    type: 'video/mp4',
                    src: base + res.data[i].id
                })
            }
        })
    }
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
    poster: '', //你的封面地址
    width: document.documentElement.clientWidth,
    notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时		
})


const handleClickFileDownload = data => {
    window.open('https://2663y694s3.zicp.vip/illManage/getFile?id=' + data.id, "_blank")
}


/**
 * 删除病例和批量删除
 */
const multipleSelection = ref([])

const handleSelectionChange = (val) => {
    multipleSelection.value = []
    val.forEach(elem => {
        multipleSelection.value.push(elem.id)
    })
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
        search('%', 0)
    })
}

const handleIllDeleteBatch = () => {
    const login = store.getters.isLogIn;
    if (!login.isLogIn) {
        router.push('/login')
    }
    console.log(multipleSelection.value)
    for (let i = 0; i < multipleSelection.value.length; i++) {
        removeIll({
            token: login.token,
            id: multipleSelection.value[i]
        })
    }
    ElMessage({
        message: '删除成功',
        type: 'success',
    })
    search('%', 0)
}

/**
 * 更新病例
 */
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


const handleUpdateIllDialogClose = () => {
    updateIllData.value.id = ''
    updateIllData.value.name = ''
    updateIllData.value.reception = ''
    updateIllData.value.examination = ''
    updateIllData.value.diagnostic = ''
    updateIllData.value.treatment = ''
    updateIllData.value.backup.name = ''
    updateIllData.value.backup.reception = ''
    updateIllData.value.backup.examination = ''
    updateIllData.value.backup.diagnostic = ''
    updateIllData.value.backup.treatment = ''
}

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
        updateIllDialog.value = false;
        search('%', 0)
    })
}

const handleUpdateReset = () => {
    updateIllData.value.name = updateIllData.value.backup.name
    updateIllData.value.reception = updateIllData.value.backup.reception
    updateIllData.value.examination = updateIllData.value.backup.examination
    updateIllData.value.diagnostic = updateIllData.value.backup.diagnostic
    updateIllData.value.treatment = updateIllData.value.backup.treatment
}


/**
 * 搜索病例
 */
const tableData = ref([])
const arg = ref('')

const total = ref(0)
const currentPage = ref(1)
const handlePageChange = data => {
    currentPage.value = data
}

watch(currentPage, (newValue) => {
    search(arg.value, newValue - 1)
})


onMounted(() => {
    search('%', 0)
})

const search = (arg, page) => {
    if (arg === '') {
        arg = '%'
    }
    const login = store.getters.isLogIn;
    if (!login.isLogIn) {
        router.push('/login')
    }
    searchIll({
        name: arg,
        paging: page
    }).then(res => {
        tableData.value = res.data
        total.value = res.totalpages * 10
        // console.log(res)
        console.log(total.value);

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

/**
 * 添加新的病例
 */
const addIllDialog = ref(false)
const addIllForm = ref()
const addIllData = ref({
    name: '',
    reception: '',
    examination: '',
    diagnostic: '',
    treatment: ''
})


const handleAddIllDialogClose = () => {
    addIllData.value.name = ''
    addIllData.value.reception = ''
    addIllData.value.examination = ''
    addIllData.value.diagnostic = ''
    addIllData.value.treatment = ''
}


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
        search('%', 0)
    })
}

const handleAddReset = () => {
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

.demo-image__lazy {
    height: 400px;
    overflow-y: auto;
}

.demo-image__lazy .el-image {
    display: block;
    min-height: 200px;
    margin-bottom: 10px;
}

.demo-image__lazy .el-image:last-child {
    margin-bottom: 0;
}
</style>