import Vue from 'vue'
import VueRouter from 'vue-router'
import FindQuestion from '../views/FindQuestion'
import AddQuestion from '../views/AddQuestion'
import MyQuestion from '../views/MyQuestion'
import PageFour from '../views/PageFour'
import Index from  "../views/Index"
import UpdateQuestion from "../views/UpdateQuestion"
import Login from "../views/Login"
import Info from "../views/info"
import ViewQuestion from "../views/ViewQuestion"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: "学生主界面",
        component: Index,
        redirect:"/FindQuestion",
        show:true,
        children: [{
            path: '/FindQuestion',
            name: "查询问题",
            component: FindQuestion,
        }, {
            path: '/AddQuestion',
            name: "提问",
            component: AddQuestion,
        }, {
            path: '/MyQuestion',
            name: "我的提问",
            component: MyQuestion,
        }, {
            path:'/info',
            name:"我的信息",
            component:Info
        },{
            path: '/pageFour',
            name: "退出系统",
            component: PageFour,
        }
        ]
    }
    ,
    {
        path:'/update',
        name:"Sub",
        component:Index,
        children:[{
            path:'/updateQuestion',
            name:'更新问题',
            component:UpdateQuestion,
        },{
            path:'/viewQuestion',
            name:'更新问题',
            component:ViewQuestion,
        }]
    },
    {
        path:'/login',
        component:Login
    },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
