<script setup>
import { reactive, onUnmounted } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { useRouter } from "vue-router";
import { pathMap, localGet } from "@/utils";
import {
  TrendCharts,
  HomeFilled,
  CirclePlusFilled,
  PictureFilled,
  StarFilled,
  SoldOut,
  Pointer,
  Menu,
  GoodsFilled,
  Avatar,
  Document,
  Lock,
} from "@element-plus/icons-vue";

components: {
  Header, Footer;
}

const noMenu = ['/login']
const router = useRouter()
const state = reactive({
  defaultOpen: ["1"],
  showMenu: true,
  currentPath: "/home",
  count: {
    number: 1,
  },
})

// 路由拦截，判断登录态
const unwatch = router.beforeEach((to, from, next) => {
    if(to.path == '/login') {
        // 如果路径是 /login 就正常执行
        next()
    } else {
        // 如果路径不是 /login，判断是否有token
        if(!localGet('token')) {
            // 如果没有token，则跳至登录页面
            next({path: '/login'})
        } else {
            // 否则继续执行
            next()
        }
    }
    state.showMenu = !noMenu.includes(to.path)
    state.currentPath = to.path
    document.title = pathMap[to.name]
})

// 监听浏览器原生回退事件
if(window.history && window.history.pushState) {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', () => {
        if(!localGet('token')) {
           state.showMenu = false 
        }
    }, false)
}

onUnmounted(() => {
    unwatch()
})


</script>

<template>
  <div class="layout">
    <el-container v-if="state.showMenu" class="container">
      <el-aside class="aside">
        <div class="header">
          <img src="./assets/logo.png" alt="" />
          <span>vue3 admin</span>
        </div>
        <el-menu
          :default-openeds="state.defaultOpen"
          background-color="#222832"
          text-color="#fff"
          :router="true"
          :default-active="state.currentPath"
        >
          <el-sub-menu index="1">
            <template #title>
              <span>Home</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                ><el-icon><TrendCharts /></el-icon>系统介绍</el-menu-item
              >
              <el-menu-item
                ><el-icon><HomeFilled /></el-icon>Home</el-menu-item
              >
              <el-menu-item
                ><el-icon><CirclePlusFilled /></el-icon>添加商品</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <span>首页配置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                ><el-icon><PictureFilled /></el-icon>轮播图配置</el-menu-item
              >
              <el-menu-item
                ><el-icon><StarFilled /></el-icon>热销商品配置</el-menu-item
              >
              <el-menu-item
                ><el-icon><SoldOut /></el-icon>新品上线配置</el-menu-item
              >
              <el-menu-item
                ><el-icon><Pointer /></el-icon>为你推荐配置</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <span>模块管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                ><el-icon><Menu /></el-icon>分类管理</el-menu-item
              >
              <el-menu-item
                ><el-icon><GoodsFilled /></el-icon>商品管理</el-menu-item
              >
              <el-menu-item
                ><el-icon><Avatar /></el-icon>会员管理</el-menu-item
              >
              <el-menu-item
                ><el-icon><Document /></el-icon>订单管理</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                ><el-icon><Lock /></el-icon>修改密码</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container class="content">
        <Header />
        <div class="main">
          <router-view></router-view>
        </div>
        <Footer />
      </el-container>
    </el-container>
    <el-container v-else class="container">
      <router-view></router-view>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.layout {
  min-height: 100vh;
  background-color: #fff;
  .container {
    height: 100vh;
    .aside {
      width: 200px;
      background-color: #222832;
      overflow: hidden;
      overflow-y: auto;
      -ms-overflow-style: none;
      overflow: -moz-scrollbars-none;
      .header {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        border-bottom: 1px solid hsla(0, 0%, 100%, 0.2);
        img {
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }
        span {
          font-size: 20px;
          color: #fff;
        }
      }
    }
    .aside::-webkit-scrollbar {
      display: none;
    }
    .content {
      display: flex;
      flex-direction: column;
      max-height: 100vh;
      overflow: hidden;
      .main {
        height: calc(100vh - 100px);
        overflow: auto;
        padding: 10px;
      }
    }
  }
}
.el-menu {
  border-right: none;
  .el-sub-menu {
    border-top: 1px solid hsla(0, 0%, 100%, 0.05);
    border-bottom: 1px solid rgba($color: #000, $alpha: 0.2);
    .el-sub-menu [class^="el-icon-"] {
      vertical-align: -1px;
    }
    a {
      color: #409eff;
      text-decoration: none;
    }
  }
}
</style>
