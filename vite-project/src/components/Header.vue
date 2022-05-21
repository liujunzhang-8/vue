<template>
  <div class="header">
    <div class="left">
      <el-icon v-if="state.hasBack" class="el-icon-back" @click="back"
        ><ArrowLeftBold
      /></el-icon>
      <span style="font-size: 18px">菜单名</span>
    </div>
    <div class="right">
      <!-- 气泡卡片 -->
      <el-popover
        placement="bottom"
        :width="320"
        trigger="click"
        popper-class="popper-user-box"
      >
        <template #reference>
          <div class="author">
            <el-icon class="icon"><Avatar /></el-icon>
            <span>username</span>
            <el-icon><ArrowDownBold /></el-icon>
          </div>
        </template>
        <div class="nickname">
          <p>登录名：张三</p>
          <p>昵称：湛战马</p>
          <el-tag effect="dark" size="small" class="logout" @click="logout"
            >退出</el-tag
          >
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { ArrowLeftBold, ArrowDownBold, Avatar } from "@element-plus/icons-vue";

const router = useRouter();
const state = reactive({
  name: "dashboard",
  userInfo: null,
  hasBack: false,
});

const back = () => {
  router.back();
};

const logout = () => {
  console.log("准备推出了");
};
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
  .right {
    .author {
      display: flex;
      align-items: center;
      cursor: pointer;
      .icon {
        font-size: 18px;
        margin-right: 6px;
      }
    }
  }
}
.popper-user-box {
  .nickname {
    position: relative;
    .logout {
      position: absolute;
      right: 0;
      bottom: 0;
      cursor: pointer;
    }
  }
}
</style>
