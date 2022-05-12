<template>
    <div class="login-box">
        <!-- <div class="order">
            点餐外卖系统
        </div> -->
        <div class="center-box">
            <el-input class="input"
                placeholder="请输入内容"
                v-model="account" clearable>
            </el-input>
            <el-input placeholder="请输入密码" v-model="password" show-password class="input"></el-input>
          <p style="color:red;font-size:5px;margin-left:6px;">{{errormsg}}</p>
            <el-button type="primary"  class="button" @click="clickLogin">登录</el-button>
            
        </div>
    </div>
</template>

<script>
import { login } from "@/api/apis"; //  @/相当于直接切换到src的根目录
export default {
  data() {
    return {
      account: "",
      password: "",
      errormsg: "" //错误提示
    };
  },
  methods: {
    clickLogin() {
      // console.log(this.acc,this.pwd)
      // console.log(login)
      // get post 区别  post对象传参  get多params:{参数}
      login(this.account, this.password).then(res => {
        console.log(res.data)
        // console.log(res.data.msg)
        // console.log(res);
        if (res.data.code == 0) {
            //写入token
            localStorage.token=res.data.token
            //写入role
            localStorage.role=res.data.role
            //存入用用户名
            localStorage.account=this.account
            //存入id
            localStorage.id=res.data.id
            // localStorage.setItem("token",res.data.token)
          //成功
          //this.$router指向main.js中注入的router对象实例
          this.$router.push("/main/index"); //改变hash地址
          this.$message({
            message: "恭喜你，登录成功",
            type: "success"
          });
        } else {
          this.errormsg = res.data.msg;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-box {
  height: 100%;
  width: 100%;
  background: #545c64;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../../public/980.jpg") no-repeat center;
  background-size: 100% 100%;
}
.center-box {
  width: 300px;
  height: 200px;
  border-radius: 15px;
  background-color: #fff;
  padding: 30px;
  padding-top: 10px;
}

.input {
  margin: 5px;
  margin-top: 20px;
}
.button {
  margin-top: 10px;
  width: 100%;
  padding-left: 10px;
  margin-left: 4px;
}
</style>