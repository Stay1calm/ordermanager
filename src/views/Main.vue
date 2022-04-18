<template>
<el-container>
  <el-aside width="200px">
      <el-menu
      default-active="/main/index"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      unique-opened
      >
      <div v-for="item in powerarr" :key="item.url"> 
      <el-menu-item :index="item.url" v-if="!item.children">
        <i :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
      <el-submenu :index="item.url" v-else>
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
          <el-menu-item v-for="item1 in item.children" 
          :key="item1.url" :index="item1.url">{{item1.name}}</el-menu-item>
          
      </el-submenu>
      </div>
      
    </el-menu>
  </el-aside>
  <el-container>
    <el-header>
        <div>左侧面包屑</div>
        <div>{{username}}</div>
    </el-header>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
  import { checktoken } from "@/api/apis"
export default {
  data(){
    return{
      username:'',//用户名
      //动态菜单
      list:[{url:'/main/index',icon:'el-icon-message-solid',name:'后台首页',roles:["super","normal"]},
      {url:'/main/additem',icon:'el-icon-s-promotion',name:'订单管理',roles:["super","normal"]},
      {url:'/main/items',icon:'el-icon-shopping-bag-1',name:'商品管理',children:[
        {url:'/main/itemslist',name:'商品列表'},
        {url:'/main/itemadd',name:'添加商品'},
        {url:'/main/itemsort',name:'商品分类'}
      ],roles:["super","normal"]},
      {url:'/main/shops',icon:'el-icon-s-shop',name:'店铺管理',roles:["super"]},
      {url:'/main/users',icon:'el-icon-user',name:'账号管理',children:[
        {url:'/main/userslist',name:'用户列表'},
        {url:'/main/usersadd',name:'添加用户'},
        {url:'/main/userssort',name:'修改用户'}
      ],roles:["super"]},
      {url:'/main/total',icon:'el-icon-s-data',name:'销售统计',children:[
        {url:'/main/saletotal',name:'销售统计'},
        {url:'/main/ordertotal',name:'订单统计'}
      ],roles:["super"]}]

    }
  },
  computed:{
    powerarr(){
      //根据权限返回运算完毕的数组
      //filter()  过滤函数
      let newarr=this.list.filter(
        (item)=>{
          //返回包含此用户权限的数据
        return  item.roles.includes(localStorage.role)
        }
      )
      return newarr
    }
  },

  created(){
    //发送请求验证用户token是否失效

    //super 超级用户 6大板块
    // normal 前3大板块
    console.log(localStorage)
    checktoken(localStorage.token).then(
      res=>{
        console.log(res.data)
        if(res.data.code==0){
          //还在有效期
          this.username=localStorage.acc

        }else{
          //无效
           this.username="请登录"
        }
      }
    )
  }
};
</script>

<style lang="less" scoped>
@base: #545c64;
@graybase: #f0f2f5;
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}

.el-aside {
  background-color: @base;
}

.el-main {
  background-color: @graybase;
}
.el-menu{
    border: 0
}
</style>