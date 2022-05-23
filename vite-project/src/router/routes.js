const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    /** 登录 */
    {
        name: 'login',
        path: '/login',
        component: () => import('@/view/Login/index.vue')
    },
    /** 首页 */
    {
        name: 'home',
        path: '/home',
        component: () => import('@/view/Home/index.vue')
    },
    /** 数据大屏 */
    {
        name: 'introduce',
        path: '/introduce',
        component: () => import('@/view/introduce/index.vue')
    },
    /** 添加商品 */
    {
        name: 'add',
        path: '/add',
        component: () => import('@/view/add/index.vue')
    },
    /** 轮播图配置 */
    {
        name: 'swiper',
        path: '/swiper',
        component: () => import('@/view/swiper/index.vue')
    },
    /** 热销商品配置 */
    {
        name: 'hot',
        path: '/hot',
        component: () => import('@/view/hot/index.vue')
    },
    /** 新品上线配置 */
    {
        name: 'new',
        path: '/new',
        component: () => import('@/view/new/index.vue')
    },
    /** 为你推荐配置 */
    {
        name: 'recommend',
        path: '/recommend',
        component: () => import('@/view/recommend/index.vue')
    },
    /** 分类管理 */
    {
        name: 'category',
        path: '/category',
        component: () => import('@/view/category/index.vue')
    },
    /** 商品管理 */
    {
        name: 'good',
        path: '/good',
        component: () => import('@/view/good/index.vue')
    },
    /** 会员管理 */
    {
        name: 'guest',
        path: '/guest',
        component: () => import('@/view/guest/index.vue')
    },
    /** 订单管理 */
    {
        name: 'order',
        path: '/order',
        component: () => import('../view/ordermg/index.vue')
    },
    /** 修改账户 */
    {
        name: 'account',
        path: '/account',
        component: () => import('@/view/account/index.vue')
    },
    /** 
     * 
    level2: '分类二级管理',
    level3: '分类三级管理',
    order_detail: '订单详情',
     * 
     */
]

export default routes