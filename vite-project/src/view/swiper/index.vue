<template>
    <el-card class='swiper-container'>
         <template #header>
             <div class="header">
                 <el-button type="primary" size="small" :icon="Plus">增加</el-button>
                 <el-popconfirm title="确定删除吗?">
                     <template #reference>
                         <el-button type="danger" size="small" :icon="Delete">批量删除</el-button>
                     </template>
                 </el-popconfirm>
             </div>
         </template>
         <el-table></el-table>
    </el-card>
</template>

<script setup>
import { reactive } from 'vue';
import { Plus, Delete } from "@element-plus/icons-vue";

</script>
<style lang='scss' scoped>
.swiper-container {
    min-height: 100%;
}
</style>