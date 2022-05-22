<template>
  <div class="login">
    <div class="login-container">
      <div class="head">
          <img src="@/assets/logo.png" alt="" />
          <span>vue3 admin</span>
      </div>
      <el-form
        ref="ruleFormRef"
        label-position="top"
        :model="temp"
        :rules="rules"
        class="login-form"
      >
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model.trim="temp.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="temp.password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
            <div style="color: #333;">登录表示您已同意<a href="">《服务条款》</a></div>
          <el-button style="width: 100%;" type="primary" @click="submitForm">立即登录</el-button>
          <el-checkbox v-model="state.checked" @change="!state.checked">下次自动登录</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "@/utils/axios.js";
import { localSet } from '@/utils'
import md5 from 'js-md5'

const ruleFormRef = ref(null);
const temp = reactive({
  password: "",
  username: "",
});

const state = reactive({
    checked: true
})

const rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 18, message: "长度在3~18个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 18, message: "长度在3~18个字符", trigger: "blur" },
  ],
});
// 登录函数
const submitForm = async () => {
    ruleFormRef.value.validate(valid => {
        if(valid) {
            console.log('校验通过');
            axios.post('/adminUser/login', {
                username: temp.username || '',
                passwordMd5: md5(temp.password)
            }).then (res => {
                console.log('秦穆公求成');
            })
        } else {
            console.log('error submit!!!');
            return false
        }
    })
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #fff;
  .login-container {
    width: 420px;
    height: 500px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba($color: #000000, $alpha: 0.2);
    .head {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px 0 20px 0;
        img {
            width: 60px;
            height: 60px;
            margin-right: 20px;
        }
        span {
            font-size: 28px;
            color: #1BAEAE;
            font-weight: bold;
        }
    }
    .login-form {
        width: 70%;
        margin: 0 auto;
    }
  }
}
</style>
