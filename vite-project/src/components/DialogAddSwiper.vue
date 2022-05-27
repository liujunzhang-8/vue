<template>
    <el-dialog v-model="state.visible" width="400px" :title="props.type == 'add' ? '添加轮播图' : '修改轮播图'" @close="handleClose">
        <el-form>

        </el-form>
        <template></template>
    </el-dialog>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';
import axios from '@/utils/axios';
import { reactive, ref } from 'vue';
import { localGet } from '@/utils';

const props = defineProps({
    type: String,
    reload: Function
})

const formRef = ref(null)
const state = reactive({
    token: localGet('token') || '',
    visible: false,
    id: ''
})

// 获取详情
const getDetail = (id) => {
    axios.get(`/carousels/${id}`).then(res => {
        state.ruleForm = {
            url: res.carouselUrl,
            link: res.redirectUrl,
            sort: res.carouselRank
        }
    })
}

const handleClose = () => {
    formRef.value.resetFields()
}

const open = (id) => {
    state.visible = true
    if(id) {
        state.id = id
        getDetail(id)
    }else {
        state.ruleForm = {
            url: '',
            link: '',
            sort: ''
        }
    }
}

onMounted(() => {
    console.log(props.type, '这是到子组件了');
})
</script>