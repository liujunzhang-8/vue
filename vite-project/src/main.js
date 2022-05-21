import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
// 线上监控
import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 全局过滤器
app.config.globalProperties.$filters = {
    orderMap(status) {
        return orderStatus[status] || '未知状态'
    },
    prefix(url) {
        if(url && url.startsWith('http')) {
            return url
        } else {
            url = `http://backend-api-02.newbee.ltd${url}`
            return url
        }
    },
    resetImgUrl(imgObj, imgSrc, maxErrorNum) {
        if(maxErrorNum > 0) {
            imgObj.onerror = function() {
                resetImgUrl(imgObj, imgSrc, maxErrorNum - 1)
            }
            setTimeout(function() {
                imgObj.src = imgSrc
            }, 500)
        } else {
            imgObj.onerror = null
            imgObj.src = imgSrc
        }
    }
}

Sentry.init({
    dns: '',
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0
})

createApp(App).use(router).mount('#app')
