<template>
  <div class="login">
    <el-form
      ref="ruleFormRef"
      :model="temp"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="user">
        <el-input v-model="temp.user" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="temp.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login(ruleFormRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
const ruleFormRef = ref();
const temp = reactive({
  password: "",
  user: "",
});
const rules = reactive({
  user: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 18, message: "长度在3~18个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 18, message: "长度在3~18个字符", trigger: "blur" },
  ],
});
// 登录函数
function login() {
    console.log('点击到登录了');
}
</script>
