<template>
    <div class='add'>
        <el-card class="add-container">
            <el-form label-width="100px" ref="goodRef" class="goodForm">
                <el-form-item required label="商品分类">
                    <el-cascader :placeholder="defaultCase" style="width: 300px;"></el-cascader>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input style="width: 300px;" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品简介">
                    <el-input style="width: 300px;" type="textarea" placeholder="请输入商品简介(100字)"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input style="width: 300px;" min="0" type="number" placeholder="请输入商品价格"></el-input>
                </el-form-item>
                <el-form-item label="商品售卖价">
                    <el-input style="width: 300px;" min="0" type="number" placeholder="请输入商品售价"></el-input>
                </el-form-item>
                <el-form-item label="商品库存">
                    <el-input style="width: 300px;" min="0" type="number" placeholder="请输入商品库存"></el-input>
                </el-form-item>
                <el-form-item label="商品标签">
                    <el-input style="width: 300px;" placeholder="请输入商品小标签"></el-input>
                </el-form-item>
                <el-form-item label="上架状态">
                    <el-radio-group>
                        <el-radio label="0">上架</el-radio>
                        <el-radio label="1">下架</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="商品主图">
                    <el-upload class="avatar-uploader" :action="uploadImgServer" accept="jpg,jpeg,png">

                    </el-upload>
                </el-form-item>
                <el-form-item label="详情内容">
                    <div ref="editor"></div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">{{ state.id ? '立即修改' : '立即创建' }}</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const { id } = route.query

const state = reactive({
    id: id,
    defaultCase: ''
})
</script>
<style lang='scss' scoped>
.add {
    display: flex;
    .add-container {
        flex: 1;
        height: 100%;
    }
}
</style>