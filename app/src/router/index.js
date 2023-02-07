import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home'
import Search from '../pages/Search'
import login from '../pages/login'
import Register from '../pages/Register'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import Trade from '../pages/Trade'
import Pay from '../pages/Pay'
import PaySuccess from '../pages/PaySuccess'
import Center from '../pages/Center'
import myOrder from '../pages/Center/myOrder'
import groupOrder from '../pages/Center/groupOrder'
import store from '@/store'


Vue.use(VueRouter)
// 重写push
let originPush=VueRouter.prototype.push
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}


let router= new VueRouter({
    routes:[
    {
        path:'/home',
        component:Home,
        meta:{show:true}
    },
    {
        path:'/search/:keyword?',
        component:Search,
        meta:{show:true},
        name:'search'
    },
    {
        path:'/login',
        component:login,
        meta:{show:false}
    },
    {
        path:'/register',
        component:Register,
        meta:{show:false}
    },
    {
        path:'/detail/:skuid?',
        component:Detail,
        meta:{show:true}
    },
    {
        path:'/addcartsuccess/:skuNum?',
        component:AddCartSuccess,
        meta:{show:true},
        name:'addcartsuccess'
    },
    {
        path:'/shopcart',
        component:ShopCart,
        meta:{show:true}
    },
    {
        path:'/trade',
        component:Trade,
        meta:{show:true},
        name:'trade',
        beforeEnter:(to,from,next)=>{
            if(from.path=='/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/pay',
        component:Pay,
        meta:{show:true},
        beforeEnter:(to,from,next)=>{
            if(from.path=='/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/paysuccess',
        component:PaySuccess,
        meta:{show:true},
        beforeEnter:(to,from,next)=>{
            if(from.path=='/pay'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/center',
        component:Center,
        meta:{show:true},
        children:[
            {
                path:'myOrder',
                component:myOrder,
            },
            {
                path:'groupOrder',
                component:groupOrder
            },
            {
                path:'/center',
                redirect:'/center/myOrder'
            }

        ]
    }
],
scrollBehavior(to,from,savedPosition){
    return {x:0,y:0}
}
})

// 全局守卫  前置守卫
router.beforeEach(async (to,from,next)=>{
    next()
    let token=store.state.user.token
    let name=store.state.user.userInfo.name
    if(token){
        if(to.path=='/login'){
            next('/home')
        }else{
            if(name){
                next()
            }else{
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    }else{
        let toPath=to.path
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 ||toPath.indexOf('/center')!=-1){
            next('/login')
        }else{
            next()
        }
    }
})


export default router