<template>
    <div>
            <el-table :data="datalist"> 
                <el-table-column  label="分类名称">
                    <template slot-scope="scope">
                          <span v-show="!scope.row.isEdit">{{scope.row.cateName}}</span>  
                          <el-input v-model="scope.row.cateName" v-show="scope.row.isEdit"></el-input>
                    </template>
                </el-table-column>
                <el-table-column  label="是否启用" >
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.state" :disabled="!scope.row.isEdit">
                        </el-switch>
                    </template>
                </el-table-column>
                 <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope)">{{ scope.row.isEdit? '完成':'编辑'}}</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope)">删除</el-button>
                    </template>
                 </el-table-column>
            </el-table>
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 15]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
    </div>
</template>

<script>
import { catelist,editcate } from "@/api/apis";
export default {
  data() {
    return {
      datalist: [],
      total: 0,
      currentPage: 1,
      pagesize: 5 //每页显示条数
    };
  },
  created() {
    this.refresh()
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize=val
      this.refresh()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.refresh()
    },
    handleEdit(scope){
        // console.log(scope)
        if(scope.row.isEdit){
          // console.log(scope.row.isEdit)
          editcate(scope.row).then(
            res=>{
              // console.log(res)
              // console.log(res.data.code)
              if(res.data.code==0){
                  //分类修改成功
                  this.$message({
                  message: '恭喜你，分类修改成功',
                  type: 'success'
                });
                scope.row.isEdit=false
                
              }else{
                  //失败
                  this.$message.error('请您稍后再试');
              }
            }
          )
        }else{
          scope.row.isEdit=true
        }
    },
    handleDelete(scope){
         console.log(scope)
    },
    //刷新表格数据
    refresh(){
      catelist(this.currentPage, this.pagesize).then(res => {
    //   console.log(res.data);
      let datalist = res.data.data;//数据源
      for (let index = 0; index < datalist.length; index++) {
          datalist[index].state=datalist[index].state==1 
          datalist[index].isEdit=false
      }
      this.datalist=res.data.data
    //   console.log(datalist)
      this.total = res.data.total; //总条数
    });
    }
  }
};
</script>

<style scoped>
</style>