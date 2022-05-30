<template>
  <el-card class="order-container">
    <template #header>
      <div class="header">
        <el-input
          style="width: 200px; margin-right: 10px"
          placeholder="请输入订单号"
          v-model="state.orderNo"
          @change="handleOption"
          clearable
        />
        <el-select
          @change="handleOption"
          v-model="state.orderStatus"
          style="width: 200px; margin-right: 10px"
        >
          <el-option
            v-for="item in state.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button type="primary" :icon="HomeFilled" @click="handleConfig()"
          >配货完成</el-button
        >
        <el-button type="primary" :icon="Plus" @click="handleSend()"
          >出库</el-button
        >
        <el-button type="danger" :icon="Delete" @click="handleClose()"
          >关闭订单</el-button
        >
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
      <el-table-column prop="orderNo" label="订单号"></el-table-column>
      <el-table-column prop="totalPrice" label="订单总价"></el-table-column>
      <el-table-column prop="orderStatus" label="订单状态">
        <template #default="scope">
          <span>
            {{
              scope.row.orderStatus == 0
                ? "待支付"
                : scope.row.orderStatus == 1
                ? "已支付"
                : scope.row.orderStatus == 2
                ? "配货完成"
                : scope.row.orderStatus == 3
                ? "出库成功"
                : scope.row.orderStatus == 4
                ? "交易成功"
                : scope.row.orderStatus == -1
                ? "手动关闭"
                : scope.row.orderStatus == -2
                ? "超时关闭"
                : scope.row.orderStatus == -3
                ? "商家关闭" : '未知状态'
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="payType" label="支付方式">
        <template #default="scope">
          <span v-if="scope.row.payType == 1">微信支付</span>
          <span v-else-if="scope.row.payType == 2">支付宝支付</span>
          <span v-else>未支付</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-popconfirm
            v-if="scope.row.orderStatus == 1"
            title="确定配货完成吗?"
            @confirm="handleConfig(scope.row.orderId)"
          >
            <template #reference>
              <a style="cursor: pointer; margin-right: 10px">配货完成</a>
            </template>
          </el-popconfirm>
          <el-popconfirm
            v-if="scope.row.orderStatus == 2"
            title="确定出库吗?"
            @confirm="handleSend(scope.row.orderId)"
          >
            <template #reference>
              <a style="cursor: pointer; margin-right: 10px">出库</a>
            </template>
          </el-popconfirm>
          <el-popconfirm
            v-if="scope.row.orderStatus == 4 || scope.row.orderStatus < 0"
            title="确定关闭订单吗?"
            @confirm="handleClose(scope.row.orderId)"
          >
            <template #reference>
              <a style="cursor: pointer; margin-right: 10px">关闭订单</a>
            </template>
          </el-popconfirm>
          <router-link
            :to="{ path: '/order_detail', query: { id: scope.row.orderId } }"
            >订单详情</router-link
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
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { HomeFilled, Plus, Delete } from "@element-plus/icons-vue";
import axios from "@/utils/axios";

const multipleTable = ref(null);
const state = reactive({
  loading: false,
  tableData: [], // 数据列表
  multipleSelection: [], // 选中项
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 10, // 分页大小
  orderNo: "", // 订单号
  orderStatus: "", // 订单状态
  options: [
    {
      value: "",
      label: "全部",
    },
    {
      value: 0,
      label: "待支付",
    },
    {
      value: 1,
      label: "已支付",
    },
    {
      value: 2,
      label: "配货完成",
    },
    {
      value: 3,
      label: "出库成功",
    },
    {
      value: 4,
      label: "交易成功",
    },
    {
      value: -1,
      label: "手动关闭",
    },
    {
      value: -2,
      label: "超时关闭",
    },
    {
      value: -3,
      label: "商家关闭",
    },
  ],
});

// 初始化
onMounted(() => {
  getOrderList();
});

// 获取订单列表
const getOrderList = () => {
  if (state.currentPage == undefined) {
    state.currentPage = 1;
  }
  state.loading = true;
  axios
    .get("/orders", {
      params: {
        pageNumber: state.currentPage,
        pageSize: state.pageSize,
        orderNo: state.orderNo,
        orderStatus: state.orderStatus,
      },
    })
    .then((res) => {
      state.tableData = res.list;
      state.total = res.totalCount;
      state.currentPage = res.currentPage;
      state.loading = false;
    });
};

const handleOption = () => {
  state.currentPage = 1;
  getOrderList();
};

// 解除禁用
const handleSolve = () => {
  if (!state.multipleSelection.length) {
    ElMessage.error("请选择项");
    return;
  }
  axios
    .put(`/users/0`, {
      ids: state.multipleSelection.map((item) => item.userId),
    })
    .then(() => {
      ElMessage.success("解除成功");
      getOrderList();
    });
};

// 禁用账号
const handleForbid = () => {
  if (!state.multipleSelection.length) {
    ElMessage.error("请选择项");
    return;
  }
  axios
    .put(`/users/1`, {
      ids: state.multipleSelection.map((item) => item.userId),
    })
    .then(() => {
      ElMessage.success("禁用成功");
      getGuestList();
    });
};

const handleSelectionChange = (val) => {
  state.multipleSelection = val;
};

const changePage = (val) => {
  state.currentPage = val;
  getOrderList();
};

onUnmounted(() => {});
</script>
<style lang="scss" scoped>
.order-container {
  min-height: 100%;
}
.el-card .is-always-shadow {
  min-height: 100% !important;
}
.el-pagination {
  margin: 20px 0;
}
</style>
