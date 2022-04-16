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
      >
      <el-menu-item index="/main/index">
        <i class="el-icon-message-solid"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>
      <el-menu-item index="/main/additem">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
          <el-menu-item index="1-1">商品列表</el-menu-item>
          <el-menu-item index="1-2">添加商品</el-menu-item>
          <el-menu-item index="1-3">商品分类</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header>
        <div>左侧面包屑</div>
        <div>名字加头像</div>
    </el-header>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {};
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