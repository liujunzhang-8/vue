<template>
  <el-card class="guest-container">
    <template #header>
      <div class="header">
        <el-button type="primary" :icon="Plus" @click="handleSolve">解除禁用</el-button>
        <el-button type="danger" :icon="Delete" @click="handleForbid">禁用账号</el-button>
      </div>
    </template>
    <el-table
      v-loading="state.loading"
      ref="multipleTable"
      :data="state.tableData"
      border
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        prop="nickName"
        label="昵称"
      ></el-table-column>
      <el-table-column
        prop="loginName"
        label="登录名"
      ></el-table-column>
      <el-table-column
        label="身份状态"
      > 
        <template #default="scope">
            <span :style="scope.row.lockedFlag == 0 ? 'color: green;' : 'color: red;'">
                {{ scope.row.lockedFlag == 0 ? '正常' : '禁用' }}
            </span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否注销"
      >
        <template #default="scope">
            <span :style="scope.row.lockedFlag == 0 ? 'color: green;' : 'color: red;'">
                {{ scope.row.isDeleted == 0 ? '正常' : '注销' }}
            </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="注册时间"
      ></el-table-column>
    </el-table>
    <!-- 总数超过一页，再展示分页器 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="state.total"
      :page-size="state.pageSize"
      :current-page="state.currentPage"
      @current-change="changePage"
    />
  </el-card>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { Plus, Delete } from "@element-plus/icons-vue";
import axios from '@/utils/axios';

const multipleTable = ref(null);
const state = reactive({
  loading: false,
  tableData: [], // 数据列表
  multipleSelection: [], // 选中项
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 10, // 分页大小
});

// 初始化
onMounted(() => {
    getGuestList()
})

// 获取商品列表
const getGuestList = () => {
    if(state.currentPage == undefined) {
        state.currentPage = 1
    }
  state.loading = true;
  axios
    .get("/users", {
      params: {
        pageNumber: state.currentPage,
        pageSize: state.pageSize,
      },
    })
    .then((res) => {
      state.tableData = res.list;
      state.total = res.totalCount;
      state.currentPage = res.currentPage;
      state.loading = false;
    });
};

// 解除禁用
const handleSolve = () => {
    if(!state.multipleSelection.length) {
        ElMessage.error('请选择项')
        return
    }
    axios.put(`/users/0`, {
        ids: state.multipleSelection.map(item => item.userId)
    }).then(() => {
        ElMessage.success('解除成功')
        getGuestList()
    })
}

// 禁用账号
const handleForbid = () => {
    if(!state.multipleSelection.length) {
        ElMessage.error('请选择项')
        return
    }
    axios.put(`/users/1`, {
        ids: state.multipleSelection.map(item => item.userId)
    }).then(() => {
        ElMessage.success('禁用成功')
        getGuestList()
    })
}

const handleSelectionChange = (val) => {
    state.multipleSelection = val
}

const changePage = (val) => {
    state.currentPage = val
    getGuestList()
}


onUnmounted(() => {
})

</script>
<style lang='scss' scoped>
.guest-container {
  min-height: 100%;
}
.el-card .is-always-shadow {
  min-height: 100% !important;
}
.el-pagination {
  margin: 20px 0;
}
</style>