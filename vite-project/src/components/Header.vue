<template>
  <div class="header">
    <div class="left">
      <el-icon v-if="state.hasBack" class="el-icon-back" @click="back"
        ><ArrowLeftBold
      /></el-icon>
      <span style="font-size: 18px">{{state.name}}</span>
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
          <p>登录名：{{state.userInfo && state.userInfo.loginUserName}}</p>
          <p>昵称：{{state.userInfo && state.userInfo.nickName || ''}}</p>
          <el-tag effect="dark" size="small" class="logout" @click="logout"
            >退出</el-tag
          >
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from '@/utils/axios'
import { localRemove, pathMap } from '@/utils'
import { ArrowLeftBold, ArrowDownBold, Avatar } from "@element-plus/icons-vue";

const router = useRouter();
const state = reactive({
  name: "home",
  userInfo: null,
  hasBack: false,
});

const back = () => {
  router.back();
};

const getUserInfo = async () => {
    const userInfo = await axios.get('/adminUser/profile')
    userInfo.nickName = 'Gorgio'
    state.userInfo = userInfo
}

const logout = () => {
  axios.delete('/logout').then(() => {
      localRemove('token')
      window.location.reload()
  })
};

onMounted(() => {
    // 判断是否登录态
    const pathname = window.location.hash.split('/')[1] || ''
    // 判断访问路径是不是login 不是则查询个人信息
    if(!['login'].includes(pathname)) {
        getUserInfo()
    }
})

// 路由守卫
router.afterEach(to => {
    console.log('to', to);
    const { id } = to.query
    state.name = pathMap[to.name]
    if(id && to.name == 'add') {
        state.name = '编辑商品'
    }
    state.hasBack = ['level2', 'level3', 'order_detail'].includes(to.name)
})

</script>

<style lang="scss" scoped>
.header {
  height: 55px;
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
