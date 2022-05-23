<template>
    <div class="dataScreen-container">
        <div class="dataScreen" ref="dataScreenRef">
            <div class="dataScreen-header">
                <div class="header-lf">
                    <span class="header-screening" @click="handleTo">首页</span>
                </div>
                <div class="header-ct">
                    <div class="header-ct-title">
                        智慧景区门票预约综合管控平台
                        <div class="header-ct-warning">平台高峰预警信息（0条）</div>
                    </div>
                </div>
                <div class="header-rg">
                    <span class="header-download">分析报告</span>
                    <span class="header-time">当前时间：</span>
                </div>
            </div>
            <div class="dataScreen-main"></div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useRouter } from 'vue-router';

const dataScreenRef = ref(null)
// 获取外层盒子
onMounted(() => {
    // 初始化时为外层盒子加上缩放属性，防止刷新界面时就已经缩放
    if(dataScreenRef.value) {
        dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
        dataScreenRef.value.style.width = `1920px`;
        dataScreenRef.value.style.height = `1080px`;
    }
    // 为浏览器绑定事件
    window.addEventListener("resize", resize)
})

onBeforeUnmount(() => {
    window.removeEventListener("resize", resize)
})

// 根据浏览器大小推断缩放比例
const getScale = (width = 1920, height = 1080) => {
    let ww = window.innerWidth / width;
    let wh = window.innerHeight / height;
    return ww < wh ? ww : wh;
}

// 浏览器监听 resize 事件
const resize = () => {
    if(dataScreenRef.value) {
        dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%))`
    }
}

// 返回首页
const router = useRouter();
const handleTo = () => {
    router.push('/home')
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
