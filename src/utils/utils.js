//工具js文件

//获取中国时区时间  传入utc字符串时间/时间对象
export let getChinaTime = (utctime) => {
    let date
    if (typeof utctime == 'string')
        date = new Date(utctime)
    else
            date=utctime
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
}