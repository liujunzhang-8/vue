<script setup>
import { reactive } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
components: {
    Header,
    Footer
}
const state = reactive({
    defaultOpen: ['1', '2', '3', '4'],
    showMenu: true,
    currentPath: '/dashboard',
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
              <div class="line"></div>
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
                .line {
                    border-top: 1px solid hsla(0, 0%, 100%, .5);
                    border-bottom: 1px solid rgba(0,0,0,.2);
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
</style>
