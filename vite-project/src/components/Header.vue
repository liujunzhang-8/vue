<template>
    <div class="header">
        <div class="left">
            <el-icon v-if="hasBack" class="el-icon-back" @click="back"><ArrowLeftBold /></el-icon>
            <span>菜单名</span>
        </div>
        <div class="right"></div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeftBold } from '@element-plus/icons-vue'

const router = useRouter()
const state = reactive({
    name: 'dashboard',
    userInfo: null,
    hasBack: false
})

const back = () => {
    router.back()
}

</script>

<style lang="scss" scoped>
.header {
    height: 50px;
    border-bottom: 1px solid #e9e9e9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .left {
        display: flex;
        align-items: center;
        .el-icon-back {
            margin-right: 6px;
        }
    }
}
</style>