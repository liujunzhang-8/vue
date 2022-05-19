const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        name: 'home',
        path: '/home',
        component: () => import('../view/Home/index.vue')
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('../view/Login/index.vue')
    },
]

export default routes