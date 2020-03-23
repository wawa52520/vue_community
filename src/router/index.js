import Vue from 'vue'
import VueRouter from 'vue-router'
import FindQuestion from '../views/FindQuestion'
import AddQuestion from '../views/AddQuestion'
import MyQuestion from '../views/MyQuestion'
import Index from "../views/Index"
import UpdateQuestion from "../views/UpdateQuestion"
import Login from "../views/Login"
import Info from "../views/info"
import ViewQuestion from "../views/ViewQuestion"
import Register from "../views/register"
import SearchQuestion from "../views/SearchQuestion"
import TeacherAnswer from "../views/TeacherAnswer"
import WatiForReply from "../views/WaitForReply"
import ReplyQuestion from "../views/ReplyQuestion"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: "主界面",
        component: Index,
        redirect: "/Login",
        show: true,
        power:['学生','教师','管理员'],
        children: [{
            path: '/FindQuestion',
            name: "查询问题",
            component: FindQuestion,
            power:['教师','管理员']
        }, {
            path:'/SearchQuestion',
            name:"搜索问题",
            component:SearchQuestion,
            power:['学生']
        },
            {
            path: '/AddQuestion',
            name: "提问",
            component: AddQuestion,
            power:['学生']
        }
        ]
    }
    ,
    {
        path: '/info',
        name: "我的信息",
        component: Index,
        show: true,
        redirect: '/info',
        power:['学生','教师','管理员'],
        children: [
            {
                path: '/MyQuestion',
                name: "我的提问",
                component: MyQuestion,
                power:['学生']
            },{
                path: '/WaitForReply',
                name: "待回复问题",
                component: WatiForReply,
                power:['教师']
            },{
                path:'/TeacherAnswer',
                name:'我的回复',
                component:TeacherAnswer,
                power:['教师']
            },

            {
                path: '/info',
                name: "修改密码",
                component: Info,
                power:['学生','教师','管理员']
            }

        ]
    }
    ,
    {
        path: '/update',
        name: "Sub",
        component: Index,
        children: [{
            path: '/updateQuestion',
            name: '更新问题',
            component: UpdateQuestion,
        }, {
            path: '/viewQuestion',
            name: '更新问题',
            component: ViewQuestion,
        },{
            path: '/ReplyQuestion',
            name: '回复问题',
            component: ReplyQuestion,
        }

        ]
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
