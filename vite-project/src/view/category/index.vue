<template>
  <el-card class="swiper-container">
    <template #header>
      <div class="header">
        <el-button type="primary" :icon="Plus" @click="handleAdd">增加</el-button>
        <el-popconfirm title="确定删除吗?" @confirm="handleDelete">
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="分类名称" prop="categoryName"></el-table-column>
      <el-table-column
        prop="categoryRank"
        label="排序值"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="添加时间"
        width="200"
      ></el-table-column>
      <el-table-column label="操作" width="220">
        <template #default="scope">
          <a
            style="cursor: pointer; margin-right: 10px"
            @click="handleEdit(scope.row.categoryId)"
            >修改</a
          >
          <a
            style="cursor: pointer; margin-right: 10px"
            @click="handleNext(scope.row)"
            >下级分类</a
          >
          <el-popconfirm
            title="确定删除吗?"
            @confirm="handleDeleteOne(scope.row.categoryId)"
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
  <DialogAddGood ref="addGood" :reload="getIndexConfig" :type="state.type" :configType="configType" />
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { Plus, Delete } from "@element-plus/icons-vue";
import DialogAddGood from '@/components/DialogAddGood.vue'
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
const addGood = ref(null);
const state = reactive({
  loading: false,
  tableData: [], // 数据列表
  multipleSelection: [], // 选中项
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 10, // 分页大小
  type: 'add',
  level: 1,
  parent_id: 0
});

onMounted(() => {
    getCategory()
})

const getCategory = () => {
    if(state.currentPage == undefined) {
        state.currentPage = 1
    }
  const { level = 1, parent_id = 0 } = route.query
  state.loading = true;
  axios
    .get("/categories", {
      params: {
        pageNumber: state.currentPage,
        pageSize: state.pageSize,
        categoryLevel: level,
        parentId: parent_id
      },
    })
    .then((res) => {
      state.tableData = res.list;
      state.total = res.totalCount;
      state.currentPage = res.currentPage;
      state.loading = false;
      state.level = level
      state.parentId = parent_id
    });
};

// 新增商品
const handleAdd = () => {
    state.type = 'add'
    addGood.value.open()
}

// 修改商品
const handleEdit = (id) => {
    state.type = 'edit'
    console.log(id, '到底闹到电话');
    addGood.value.open(id)
}

// 下级分类
const handleNext = (item) => {
    const levelNumber = item.categoryLevel + 1
    if(levelNumber == 4) {
        ElMessage.error('没有下一级')
        return
    }

}

// 批量删除
const handleDelete = () => {
    console.log('批量删除');
    if(!state.multipleSelection.length) {
        ElMessage.error('请选择项')
        return
    }
    axios.delete('/categories', {
        data: {
            ids: state.multipleSelection.map(i => i.categoryId)
        }
    }).then((res) => {
        ElMessage.success(res.message)
        getCategory()
    })
}

// 单个删除
const handleDeleteOne = (id) => {
    axios.delete('/categories', {
        data: {
            ids: [id]
        }
    }).then((res) => {
        ElMessage.success(res.message)
        getCategory()
    })
}

const handleSelectionChange = (val) => {
    state.multipleSelection = val
}

const changePage = (val) => {
    state.currentPage = val
    getCategory()
}

// 监听路由变化
const unwatch = router.beforeEach((to) => {
    if (['hot', 'new', 'recommend'].includes(to.name)) {
        state.configType = configTypeMap[to.name]
        state.currentPage = 1
        getCategory()
    }
})

// 初始化
onMounted(() => {
    state.configType = configTypeMap[route.name]
    getCategory()
})

onUnmounted(() => {
    unwatch()
})

</script>
<style lang='scss' scoped>
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