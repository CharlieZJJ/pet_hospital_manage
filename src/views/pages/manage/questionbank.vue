<template>
    <el-card shadow="always">
        <div class="card-header">
            <el-input v-model="arg" placeholder="请输入关键字" style="width: 300px"></el-input> &nbsp; &nbsp;
            <el-button type="primary" @click="handleSearchQuestion"><el-icon>
                    <Search />
                </el-icon>搜索
            </el-button>
            <el-button type="primary" @click="addQuestionDialog = true"><el-icon>
                    <DocumentAdd />
                </el-icon>添加</el-button>
            <el-button type="primary" @click="handleQuestionDeleteBatch"> <el-icon>
                    <Delete />
                </el-icon>删除</el-button>
        </div>
        <el-table :data="tableData" border stripe style="width: 100%" height="460"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" />
            <el-table-column prop="id" label="ID" width="70" />
            <el-table-column prop="context" label="题目" show-overflow-tooltip="true" />
            <el-table-column label="选项">
            <template v-for="(option, index) in options">
                <el-table-column :prop="option" :label="String.fromCharCode(index)" show-overflow-tooltip="true" />
            </template>
            </el-table-column>
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
            layout="prev, pager, next, jumper" :total="total" @current-change="handlePageChange" />
    </el-card>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';


const store = useStore()
const router = useRouter()

/**
 * 搜索接口
 */
const tableData = ref([])
const search = arg => {
    const login = store.getters.isLogIn;
    if (!login.isLogIn) {
        router.push('/login')
    }
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