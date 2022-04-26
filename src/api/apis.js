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

// -----------------------账号管理API------------------------
export var useradd=(account,password,userGroup)=>axios.post('/users/add',{account,password,userGroup})
//  用户列表
export var userlist=(currentPage,pageSize)=>axios.get('/users/list',{params:{currentPage,pageSize}})
//  删除用户
export var userdel=(id)=>axios.get('/users/del',{params:{id}})
//  批量删除用户
export var userbatchdel=(ids)=>axios.get('/users/batchdel',{params:{ids}})
//  修改用户信息
export var useredit=(id,account,userGroup)=>axios.post('/users/edit',{id,account,userGroup})
//  获取个人信息 头像
export var accountinfo=(id)=>axios.get('/users/accountinfo',{params:{id}})
//  获取商品分类
export var catelist=(currentPage,pageSize)=>axios.get('/goods/catelist',{params:{currentPage,pageSize}})
//  修改分类
export var editcate=(params)=>axios.post('/goods/editcate',params)


// export login  多次暴露  接收 import {} from 'xxx
// export default xxx  只能暴露一个内容  接 import xxx from 'xxx  若要暴露多了 可以添加对象

//
