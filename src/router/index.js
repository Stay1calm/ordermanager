import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import {checktoken} from '../api/apis'



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
        //订单管理
        {
          path:'/main/additem',
          name:'/main/additem',
          component:()=>import('../views/main/addItem')
        },
        // 账号管理  添加账号
        {
          path:'/main/usersadd',
          name:'/main/usersadd',
          component:()=>import('../views/main/users/UserAdd')
        },
        // 账号管理  用户列表
        {
          path:'/main/userslist',
          name:'/main/userslist',
          component:()=>import('../views/main/users/UserList')
        },
        //修改用户
        {
          path:'/main/usersedit',
          name:'/main/usersedit',
          component:()=>import('../views/main/users/UserEdit')
        }
    ] 
    }
 ]
})
// 切换路由之前 导航守卫  路由拦截
router.beforeEach((to, from, next) => {
  //只要不是默认登录 都开启路由验证
  if (to.path != '/' ) {
    //验证用户是否登录 token
    checktoken(localStorage.token).then(
      res=>{
        // console.log(res)
        if(res.data.code==0){
          next()  //正常跳转
        }
        else
        next('/')
      }
    )
  }else{
    next()
  }
  // to 要跳转的路由 from 来自于哪里  next 下一步
  // 如果用户未能验证身份，则 `next` 会被调用两次
  // next() //执行下一步
  // console.log(to)
  // console.log(from)

})
// router.afterEach()  切换路由之后
export default router
