<script setup>
import { reactive } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useRouter } from 'vue-router'
import {pathMap, localGet } from '@/utils'
components: {
    Header,
    Footer
}
const state = reactive({
    defaultOpen: ['1'],
    showMenu: true,
    currentPath: '/home',
    count: {
        number: 1
    }
})
</script>

<template>
  <div class="layout">
      <el-container v-if="state.showMenu" class="container">
          <el-aside class="aside">
              <div class="header">
                      <img src="./assets/logo.png" alt="">
                      <span>vue3 admin</span>
              </div>
              <el-menu :default-openeds="state.defaultOpen" background-color="#222832" text-color="#fff" :router="true" :default-active="state.currentPath">
                <el-sub-menu index="1">
                    <template #title>
                        <span>Home</span>
                    </template>
                </el-sub-menu>
                <el-sub-menu index="2">
                    <template #title>
                        <span>首页配置</span>
                    </template>
                </el-sub-menu>
                <el-sub-menu index="3">
                    <template #title>
                        <span>模块管理</span>
                    </template>
                </el-sub-menu>
                <el-sub-menu index="4">
                    <template #title>
                        <span>系统管理</span>
                    </template>
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
                    border-bottom: 1px solid hsla(0, 0%, 100%, .2);
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
        border-top: 1px solid hsla(0, 0%, 100%, .05);
        border-bottom: 1px solid rgba($color: #000, $alpha: .2);
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
