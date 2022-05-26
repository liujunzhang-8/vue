<template>
  <el-card class="swiper-container">
    <template #header>
      <div class="header">
        <el-button type="primary" :icon="Plus">增加</el-button>
        <el-popconfirm title="确定删除吗?">
          <template #reference>
            <el-button type="danger" :icon="Delete">批量删除</el-button>
          </template>
        </el-popconfirm>
      </div>
    </template>
    <el-table
      v-loading="state.loading"
      ref="multipleTable"
      :data="state.tableData"
      border
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="轮播图" width="400">
        <template #default="scope">
          <img
            style="width: 200px; height: 200px"
            :src="scope.row.carouselUrl"
            alt="轮播图"
          />
        </template>
      </el-table-column>
      <el-table-column label="跳转链接">
        <template #default="scope">
          <a target="_blank" :href="scope.row.redirectUrl" alt="轮播图">{{
            scope.row.redirectUrl
          }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="carouselRank" label="排序值" width="120">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="添加时间"
        width="200"
      ></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <a
            style="cursor: pointer; margin-right: 10px"
            @click="handleEdit(scope.row.carouselId)"
            >修改</a
          >
          <el-popconfirm
            title="确定删除吗?"
            @confirm="handleDeleteOne(scope.row.carouselId)"
          >
            <template #reference>
              <a style="cursor: pointer">删除</a>
            </template>
          </el-popconfirm>
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
import { reactive, onMounted, ref } from "vue";
import { Plus, Delete } from "@element-plus/icons-vue";
import axios from "@/utils/axios";
import { ElMessage } from "element-plus";

const multipleTable = ref(null);
const addGood = ref(null);
const state = reactive({
  loading: false,
  tableData: [], // 数据列表
  multipleSelection: [], // 选中项
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 10, // 分页大小
  type: "add", // 操作类型
});

onMounted(() => {
  getCarousels();
});

// 获取轮播图列表
const getCarousels = () => {
  state.loading = true;
  axios
    .get("/carousels", {
      params: {
        pageNumber: state.currentPage,
        pageSize: state.pageSize,
      },
    })
    .then((res) => {
      console.log(res, "获取到数据");
      state.tableData = res.list;
      state.total = res.totalCount;
      state.currentPage = res.currentPage;
      state.loading = false;
    });
};

// 修改轮播图
const handleEdit = (id) => {
  state.type = "edit";
  addGood.value.open(id);
};

// 单个删除
const handleDeleteOne = (id) => {
  axios
    .delete("/carousels", {
      data: {
        ids: [id],
      },
    })
    .then((res) => {
      console.log(res, "res");
      ElMessage.success(res.message);
      getCarousels();
    });
};

const changePage = (val) => {
  state.currentPage = val;
  getCarousels();
};
</script>
<style lang="scss" scoped>
.swiper-container {
  min-height: 100%;
}
.el-card .is-always-shadow {
  min-height: 100% !important;
}
.el-pagination {
  margin: 20px 0;
}
</style>
