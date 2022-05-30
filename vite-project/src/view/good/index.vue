<template>
  <el-card class="good-container">
    <template #header>
      <div class="header">
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增商品</el-button>
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
      <el-table-column label="商品编号" prop="goodsId"></el-table-column>
      <el-table-column
        prop="goodsName"
        label="商品名"
      ></el-table-column>
      <el-table-column
        prop="goodsIntro"
        label="商品简介"
      ></el-table-column>
      <el-table-column
        width="150px"
        label="商品图片"
      > 
        <template #default="scope">
            <img style="width: 100px; height: 100px;" :key="scope.row.goodsId" :src="scope.row.goodsCoverImg" alt="商品主图">
        </template>
      </el-table-column>
      <el-table-column
        prop="stockNum"
        label="商品库存"
      ></el-table-column>
      <el-table-column
        prop="sellingPrice"
        label="商品售价"
      ></el-table-column>
      <el-table-column
        label="上架状态"
      >
        <template #default="scope">
            <span style="color: green;" v-if="scope.row.goodsSellStatus == 0">销售中</span>
            <span style="color: red;" v-else>已下架</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <a
            style="cursor: pointer; margin-right: 10px"
            @click="handleEdit(scope.row.goodsId)"
            >修改</a
          >
          <a
            style="cursor: pointer; margin-right: 10px"
            @click="handleStatus(scope.row.goodsId, 1)"
            v-if="scope.row.goodsSellStatus == 0"
            >下架</a
          >
          <a
            style="cursor: pointer; margin-right: 10px"
            @click="handleStatus(scope.row.goodsId, 0)"
            v-else
            >上架</a
          >
        </template>
      </el-table-column>
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
import { Plus } from "@element-plus/icons-vue";
import axios from '@/utils/axios';
import { useRoute, useRouter } from 'vue-router';

// 首页配置类型参数
const configTypeMap = {
    hot: 3,
    new: 4,
    recommend: 5
}

const router = useRouter()
const route = useRoute()
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
    getGoodList()
})

// 获取商品列表
const getGoodList = () => {
    if(state.currentPage == undefined) {
        state.currentPage = 1
    }
  state.loading = true;
  axios
    .get("/goods/list", {
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

// 新增商品
const handleAdd = () => {
    router.push({ path: '/add' })
}

// 修改商品
const handleEdit = (id) => {
    router.push({ path: '/add', query: { id } })
}

// 上架状态
const handleStatus = (id, status) => {
    axios.put(`/goods/status/${status}`, {
        ids: id ? [id] : []
    }).then(() => {
        ElMessage.success('修改成功')
        getGoodList()
    })
}

const handleSelectionChange = (val) => {
    state.multipleSelection = val
}

const changePage = (val) => {
    state.currentPage = val
    getGoodList()
}


onUnmounted(() => {
})

</script>
<style lang='scss' scoped>
.good-container {
  min-height: 100%;
}
.el-card .is-always-shadow {
  min-height: 100% !important;
}
.el-pagination {
  margin: 20px 0;
}
</style>