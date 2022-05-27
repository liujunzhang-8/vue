<template>
  <el-dialog
    v-model="state.visible"
    width="400px"
    :title="props.type == 'add' ? '添加轮播图' : '修改轮播图'"
    @close="handleClose"
  >
    <el-form
      :model="state.ruleForm"
      :rules="state.rules"
      ref="formRef"
      label-width="100px"
      class="good-form"
    >
      <el-form-item label="图片" prop="url">
        <el-upload
          class="avatar-uploader"
          :action="uploadImgServer"
          accept="jpg,jpeg,png"
          :headers="{
              token: state.token
          }"
          :show-file-list="false"
          :before-upload="handleBeforeUpload"
          :on-success="handleUrlSuccess"
        >
            <img style="width:200px; height: 100px; border: 1px solid #e9e9e9;" v-if="state.ruleForm.url" :src="state.ruleForm.url" class="avatar">
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="跳转链接" prop="link">
        <el-input type="text" v-model="state.ruleForm.link"></el-input>
      </el-form-item>
      <el-form-item label="排序值" prop="sort">
        <el-input type="number" v-model="state.ruleForm.sort"></el-input>
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
import { defineProps, onMounted } from "vue";
import axios from "@/utils/axios";
import { reactive, ref } from "vue";
import { localGet } from "@/utils";

const props = defineProps({
  type: String,
  reload: Function,
});

const formRef = ref(null);
const state = reactive({
  token: localGet("token") || "",
  visible: false,
  id: "",
  ruleForm: {
      url: '',
      link: '',
      sort: ''
  },
  rules: {
      url: [
          {required: 'true', message: '图片不能为空', trigger: ['change']}
      ],
      sort: [
          {required: 'true', message: '排序不能为空', trigger: ['change']}
      ]
  }
});

// 获取详情
const getDetail = (id) => {
  axios.get(`/carousels/${id}`).then((res) => {
    state.ruleForm = {
      url: res.carouselUrl,
      link: res.redirectUrl,
      sort: res.carouselRank,
    };
  });
};

const handleClose = (done) => {
  ElMessageBox.confirm("确定关闭吗?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
const open = (id) => {
  state.visible = true;
  if (id) {
    state.id = id;
    getDetail(id);
  } else {
    state.ruleForm = {
      url: "",
      link: "",
      sort: "",
    };
  }
};

onMounted(() => {
  console.log(props.type, "这是到子组件了");
});

defineExpose({ open });
</script>

<style lang="scss" scoped>
  .avatar-uploader {
      width: 100px;
      height: 100px;
      color: #ddd;
      font-size: 30px;
  }
  .avatar-uploader-icon {
      display: block;
      width: 100%;
      height: 100%;
      border: 1px solid #e9e9e9;
      padding: 32px 17px;
  }
</style>
