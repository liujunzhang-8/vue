import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    //   css: {
    //     preprocessorOptions: {
    //         scss: {
    //             additionalData: ``
    //         }
    //     }
    //   },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '~': resolve(__dirname, './')
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://backend-api-02.newbee.ltd/manage-api/v1',
                changeOrigin: true,
                rewrite: path => resolve(/^\/api/, '')
            }
        }
    },
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ]
})
