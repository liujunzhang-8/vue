<template>
    <el-dialog :title="type == 'add' ? '添加商品' : '修改商品'" v-model="state.visible" width="400px">
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="state.visible = false">取消</el-button>
                <el-button type="primary" @click="state.visible = false">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import {ref, reactive, onMounted} from 'vue'

const props = defineProps({
  type: String,
  reload: Function,
  configType: Number
});

const state = reactive({
    visible: false,
    id: '',
    ruleForm: {
        name: '',
        link: '',
        id: '',
        sort: ''
    }
})

const open = (id) => {
    state.visible = true
    if(id) {
        state.id = id
        getDetail(id)
    } else {
        state.ruleForm = {
            name: '',
            id: '',
            link: '',
            sort: ''
        }
    }
}

defineExpose({ open });

</script>