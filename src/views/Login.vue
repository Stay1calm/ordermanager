<template>
    <div class="login-box">
        <!-- <div class="order">
            点餐外卖系统
        </div> -->
        <div class="center-box">
            <el-input class="input"
                placeholder="请输入内容"
                v-model="acc" clearable>
            </el-input>
            <el-input placeholder="请输入密码" v-model="pwd" show-password class="input"></el-input>
            <el-button type="primary"  class="button" @click="clickLogin">登录</el-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            acc:'',
            pwd:''
        }
    },
    methods:{
        clickLogin(){
            console.log(this.acc,this.pwd)
            // get post 区别  post对象传参  get多params:{参数}
            axios.post("http://127.0.0.1:5000/users/checkLogin",{account:this.acc,password:this.pwd})
            .then(
                (res)=>{
                    console.log(res)
                }
            )
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
}
.center-box {
  width: 300px;
  height: 200px;
  border-radius: 15px;
  background-color: #fff;
  padding: 30px;
  padding-top: 10px;
}

.input{
    margin: 5px;
    margin-top: 20px;
}
.button{
    margin-top: 10px;
    width: 100%;
    padding-left: 10px;
    margin-left: 4px;
}
</style>