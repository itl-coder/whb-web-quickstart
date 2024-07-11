import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/login"
        },
        {
            path: "/login",
            // @ts-ignore
            component: () => import("@/views/user/login/index.vue")
        },
    ]
})

export default router
