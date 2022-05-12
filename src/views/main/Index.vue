<template>
    <div>
        <!-- echarts容器 -->
        <div id="myfirstecharts" style="width: 800px;height: 500px;">

        </div>
    </div>
</template>

<script>
// import echarts from "echarts";
import * as echarts from 'echarts'
import {echartss} from '@/api/apis'
export default {
  // 页面初始化到容器里面
  mounted() {
      echartss().then(
          res=>{
              console.log(res)
            //   res.data.xData
            //   res.data.amountData
            //   res.data.orderData
          
    let myecharts = echarts.init(document.querySelector("#myfirstecharts"));
    //  配置对象
    let option = {
      title: {
        text: "数据统计"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["金额数据", "订单数据"]
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: res.data.xData
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "金额数据",
          type: "line",
          stack: "总量",
          data: res.data.amountData
        },
        {
          name: "订单数据",
          type: "line",
          stack: "订单",
          data:  res.data.orderData
        }
      ]
    };
    // 使用echarts实例对象 关联数据配置对象 创建表格
    myecharts.setOption(option)
    }
      )
  }
};
</script>

<style lang="less" scoped>
#myfirstecharts {
  width: 400px;
  height: 400px;
}
</style>