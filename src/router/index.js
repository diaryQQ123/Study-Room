import { createRouter,createWebHashHistory } from "vue-router";

const routes=[
    {
        path:"/",
        name:"登录页",
        component:import("@/views/login.vue")
    }
]
const router=createRouter({
    history:createWebHashHistory(),
    routes
})
export default router
