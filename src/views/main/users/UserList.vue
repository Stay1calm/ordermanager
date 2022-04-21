<template>
<div>
   <el-button type="danger" plain @click="deleteAll(ids)" class="deleteAll">批量删除</el-button>
    <el-table
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column  type="selection"></el-table-column>
    <el-table-column
      label="账号名称"   prop="account">
    </el-table-column>
    <el-table-column
      label="注册时间"    prop="ctime">
    </el-table-column>
    <el-table-column
      label="用户组"   prop="userGroup">
    </el-table-column>
    <el-table-column label="操作">
   
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页组件 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</div>
</template>

<script>
import { userlist, userdel, userbatchdel } from "@/api/apis";
import { getChinaTime } from "@/utils/utils";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1, //当前页数
      total: 0, //总数据条数
      pageSize: 5 ,//每页显示条数
      ids:''
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index) {
      // console.log(index, row);
      this.$confirm("此操作将永久删除该用户数据, 是否继续?", "温馨提示", {
        confirmButtonText: "狠心删除",
        cancelButtonText: "取消操作",
        type: "warning"
      })
        .then(() => {
          userdel(index.row.id).then(res => {
            // console.log(res)
            this.getUserList();
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getUserList() {
      userlist(this.currentPage, this.pageSize).then(res => {
        // console.log(res);
        /**
           * "id": 38,
            "ctime": "2020-05-18T22:48:16.000Z",
            "account": "aaa",
            "userGroup": "超级管理员",
            "imgUrl": "default.jpg"           * 
           */

        //先转换时间 再赋值
        let arr = res.data.data;
        for (let iterator of arr) {
          iterator.ctime = getChinaTime(iterator.ctime);
        }
        //本页数据
        this.tableData = arr;
        //  总商品条数
        this.total = res.data.total;
      });
    },
    // 点击切换条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getUserList();
    },
    // 点击页数
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      //
      this.currentPage = val;
      this.getUserList();
    },
    //  监听复选框发生改变
    handleSelectionChange(arr) {
      // this.multipleSelection = val;
      // console.log(arr)
      let ids = arr.map(item => {
        return item.id;
      });
      this.ids = JSON.stringify(ids);
      // console.log(ids)
    },
    //批量删除
    deleteAll(ids){
       this.$confirm("此操作将永久删除该用户数据, 是否继续?", "温馨提示", {
        confirmButtonText: "狠心删除",
        cancelButtonText: "取消操作",
        type: "warning"
      })
        .then(() => {
          userbatchdel(ids).then(res => {
            // console.log(res)
            if(res.data.code==0){
              this.getUserList();
            }
            
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.getUserList();
  }
};
</script>

<style scoped>
.deleteAll{
  margin-bottom: 10px;

}
</style>