import axios from 'axios'

const IP='http://127.0.0.1:5000'
// const IP='http://192.168.1.122:80'
//请求基本路径
axios.defaults.baseURL=IP;

//商品图片上传接口地址
export const ITEMS_IMG_UPLOAD = IP + '/goods/goods_img_upload'
//获取商品图片地址
export const GET_ITEMS_IMG = IP + '/upload/imgs/goods_img/'

//登录  account,password  账户 密码
export function login(account,password){
   return axios.post("/users/checkLogin",{account:account,password:password})         
//    return axios.post("/user/login",{username:username,password:password})         
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
//  添加商品
export var addgoods=(params)=>axios.post('/goods/add',params)
//  获取商品所有分类
export var categories = () => axios.get('/goods/categories')
//  获取商品列表
export var list = (currentPage,pageSize) => axios.get('/goods/list',{params:{currentPage,pageSize}})
//  删除商品
export var goodsdel=(id)=>axios.get('/goods/del',{params:{id}})
//  修改商品 
export var goodsedit=(params)=>axios.post('/goods/edit',params)

//  订单管理
export var orderlist = (params) => axios.get('/order/list', { params })


//  报表api
export var echartss=()=>axios.get('/order/totaldata')

//  订单数据显示
export var orderechasrts=(date)=>axios.get('/order/ordertotal',{params:{date}})

// export login  多次暴露  接收 import {} from 'xxx
// export default xxx  只能暴露一个内容  接 import xxx from 'xxx  若要暴露多了 可以添加对象

//
