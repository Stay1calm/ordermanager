import axios from 'axios'

//请求基本路径
axios.defaults.baseURL='http://127.0.0.1:5000'

//登录  account,password  账户 密码
export function login(account,password){
   return axios.post("/users/checkLogin",{account:account,password:password})         
}

//es6n 如果需要return 则不需要return语句
// export var login=(account,password)=>axios.post("/users/checkLogin",{account:account,password:password})   
//验证token
export var checktoken=(token)=>axios.get("/users/checktoken",{params:{token}})
// export login  多次暴露  接收 import {} from 'xxx
// export default xxx  只能暴露一个内容  接 import xxx from 'xxx  若要暴露多了 可以添加对象

//
