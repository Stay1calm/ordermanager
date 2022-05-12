<template>
    <div>
        <div>
        <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button class="btn" type="primary" @click="clickSearch" icon="el-icon-search">查询</el-button>
        </div>
        <div id="myecharts" style="width: 100%;height: 500px;">

        </div>
    </div>
    
</template>

<script>
import * as echarts from "echarts";
import { orderechasrts } from "@/api/apis";
import {getChinaTime} from '@/utils/utils'
export default {
    data(){
        return{
           date:[] 
        }
    },
    methods:{
        clickSearch(){
            // 转换为字符串
            console.log(this.date[0])
            let timestr=JSON.stringify([getChinaTime(this.date[0]),getChinaTime(this.date[1])])
            console.log(timestr)
            this.refresh(timestr)
        },
        refresh(str){
            //发送请求 获取数据
            orderechasrts(str).then(
            res => {
                console.log(res);
                for (const obj of res.data.data) {
                    obj.orderTime=getChinaTime(obj.orderTime) 
                }
                let arr=res.data.data
            

                let option = {
                title: {
                    text: "订单统计",
                    subtext: "金额"
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: ["订单金额", "Evaporation"]
                },
                toolbox: {
                    show: true,
                    feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ["line", "bar"] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                    }
                },
                calculable: true,
                xAxis: [
                    {
                    type: "category",
                    // prettier-ignore
                    data:arr.map(obj=>obj.orderTime)
                    }
                ],
                yAxis: [
                    {
                    type: "value"
                    }
                ],
                series: [
                    {
                    name: "订单金额",
                    type: "bar",
                    data: arr.map(obj=>obj.orderAmount),
                    markPoint: {
                        data: [
                        { type: "max", name: "Max" },
                        { type: "min", name: "Min" }
                        ]
                    },
                    markLine: {
                        data: [{ type: "average", name: "Avg" }]
                    }
                    }
                ]
                };
                this.myechartss.setOption(option);
            }
            );
        }
    },
  mounted() {
       this.myechartss = echarts.init(document.getElementById("myecharts"));
   
  }
};
</script>

<style lang="less">

.btn{
    margin-left: 10px;
}
</style>