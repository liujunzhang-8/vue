<template>
    <el-dialog :title="type == 'add' ? '添加分类' : '修改分类'" v-model="state.visible" width="400px">
        <el-form class="good-form" label-width="100px" :model="state.ruleForm" :rules="state.rules" ref="formRef">
            <el-form-item label="分类名称" prop="name">
                <el-input type="text" v-model="state.ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="排序值" prop="rank">
                <el-input type="number" v-model="state.ruleForm.rank"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="state.visible = false">取消</el-button>
                <el-button type="primary" @click="submitForm">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import {ref, reactive, onMounted} from 'vue'
import axios from '@/utils/axios';
import { useRoute } from 'vue-router'

const props = defineProps({
  type: String,
  reload: Function,
  level: Number,
  parent_id: Number
});

const formRef = ref(null)
const route = useRoute()

const state = reactive({
    visible: false,
    categoryLevel: 1,
    parentId: 0,
    ruleForm: {
        name: '',
        rank: ''
    },
    rules: {
        name: [
            {required: 'true', message: '名称不能为空', trigger: ['change']}
        ],
        rank: [
            {required: 'true', message: '排序值不能为空', trigger: ['change']}
        ]
    },
    id: '',
})

// 获取详情
const getDetail = (id) => {
    axios.get(`/categories/${id}`).then(res => {
        state.ruleForm = {
            name: res.categoryName,
            rank: res.categoryRank
        }
        state.parentId = res.parentId
        state.categoryLevel = res.categoryLevel
    })
}

// 开启弹窗
const open = (id) => {
    state.visible = true
    console.log(id, '到底有没有获取到');
    if(id) {
        state.id = id
        getDetail(id)
    } else {
        // 新增类目，从路由获取父分类id 和 分类级别
        const { level = 1, parent_id = 0 } = route.query
        state.ruleForm = {
            name: '',
            rank: ''
        }
        state.parentId = parent_id
        state.categoryLevel = level
    }
}

const submitForm = () => {
    formRef.value.validate((valid) => {
        if(valid) {
            if(state.ruleForm.name.length > 16) {
                ElMessage.error('名称不能超过16个字符')
                return
            }
            if(state.ruleForm.rank > 200) {
                ElMessage.error('排序不能超过 200')
                return
            }
            if(props.type == 'add') {
                axios.post('/categories', {
                    categoryLevel: state.categoryLevel,
                    parentId: state.parentId,
                    categoryName: state.ruleForm.name,
                    categoryRank: state.ruleForm.rank
                }).then((res) => {
                    ElMessage.success(res.message)
                    state.visible = false
                    if(props.reload) props.reload()
                })
            } else {
                axios.put('/categories', {
                    categoryId: state.id,
                    categoryLevel: state.categoryLevel,
                    parentId: state.parentId,
                    categoryName: state.ruleForm.name,
                    categoryRank: state.ruleForm.rank
                }).then((res) => {
                    ElMessage.success(res.message)
                    state.visible = false
                    if(props.reload) props.reload()
                })
            }
        }
    })
}

defineExpose({ open });

</script>