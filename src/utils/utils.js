//工具js文件

//获取中国时区时间  传入utc字符串时间
export let getChinaTime=(utctime)=>{
    let date=new Date(utctime)

    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "
    +date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
}