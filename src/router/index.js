import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/store'
    },
    {
        path: '/ebook',
        component: () => import('../views/ebook/index.vue'),
        children: [
            {
                path: ':fileName',
                component: () => import('../components/ebook/EbookReder.vue')
            }
        ]
    },
    {
        path: '/store',
        component: () => import('../views/store/index'),
        redirect: '/store/shelf',
        children: [
            {
                path: 'shelf',
                component: () => import('../views/store/storeShelf')
            },
            {
                path: 'category',
                component: () => import('../views/store/soreShelfCategory')
            },
            {
                path: 'home',
                component: () => import('../views/store/storeHome')
            },
            {
                path: 'list',
                component: () => import('../views/store/StoreList')
            },
            {
                path: 'detail',
                component: () => import('../views/store/StoreDetail')
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
