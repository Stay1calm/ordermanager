import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'



Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',  //历史模式  hash模式性能高
  base: process.env.BASE_URL,
  routes:[ {
    path:'/',
    name:'Login',
    component:Login  //两种加载方式  默认加载 懒加载(避免页面卡顿)
    },
    {
      path:'/main',
      name:'Main',
      // 当hash值匹配成功时 才会动态加载此页面  除了首页 其余都应该使用懒加载
      component:()=>import('../views/Main') ,
      //子路由  
      children:[
        //首页
        {
        path:'/main/index',
        name:'/main/index',
        component:()=>import('../views/main/Index')
      },
        //添加商品
        {
          path:'/main/additem',
          name:'/main/additem',
          component:()=>import('../views/main/addItem')
        }
    ] 
    }
 ]
})

export default router
