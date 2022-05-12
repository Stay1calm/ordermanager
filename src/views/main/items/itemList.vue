<template>
    <div>
       <el-table :data="datalist"  style="width: 100%" v-loading="isloading">
    <el-table-column label="商品名称">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name}}</span>
      </template>
    </el-table-column>
    <el-table-column label="所属分类">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.category}}</span>
      </template>
    </el-table-column>
    <el-table-column label="商品价格">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.price}}</span>
      </template>
    </el-table-column>
    <el-table-column label="商品图片">
      <template slot-scope="scope">
        <img :src="GET_ITEMS_IMG +scope.row.imgUrl" alt="网络暂时走丢了" style="width:50px;height:50px">
      </template>
    </el-table-column>
    <el-table-column label="商品描述">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.goodsDesc}}</span>
      </template>
    </el-table-column>
    <el-table-column label="用户操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)" type="warning">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
        </el-table>
        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentpage"
      :page-sizes="[5, 10, 15]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 弹框 -->
    <el-dialog
        title="编辑商品信息"
        :visible.sync="dialogVisible"
        width="30%">
       <div>
    <el-card class="box-card">
      <!-- 商品名称  -->
      <el-row>
        <el-col :span="12">
          商品名称
          <el-input v-model="editobj.name" placeholder="商品名称"></el-input>
        </el-col>
      </el-row>
      <!-- 商品分类 -->
      <el-row>
        <el-col :span="8">
          商品分类
          <el-select v-model="editobj.category" placeholder="请选择商品分类">
            <el-option
              v-for="item in categorieslist"
              :key="item.cateName"
              :label="item.cateName"
              :value="item.cateName"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- 商品价格 -->
      <el-row>
        <el-col>
          商品价格:
          <el-input-number v-model="editobj.price"  :min="0" label="描述文字"></el-input-number>
        </el-col>
      </el-row>
      <!-- 商品图片 -->
      <el-row>
        <el-col>
          商品图片
          <div class="inner">
            <el-upload
              :action="ITEMS_IMG_UPLOAD"
              :show-file-list="false"
              :on-success="uploadfinish"
            >
            <div>
                <i v-show="!editobj.imgUrl" class="el-icon-plus"></i>
                 <img style="width: 100px" v-show="editobj.imgUrl" :src="GET_ITEMS_IMG  + editobj.imgUrl" />
            </div>
            </el-upload>
            <!-- <el-dialog :visible.sync="dialogVisible" size="tiny"> -->
            <!-- <img width="100%" :src="dialogImageUrl" alt /> -->
            <!-- </el-dialog> -->
          </div>
        </el-col>
      </el-row>

      <!-- 商品描述 -->
      <el-row>
       
        <el-col :span="12">
           商品描述
          <el-input type="textarea" :rows="1" placeholder="商品描述" v-model="editobj.goodsDesc"></el-input>
        </el-col>
      </el-row>
    </el-card>
  </div>
       <span slot="footer" class="dialog-footer">
       <el-button @click="dialogVisible = false">取 消</el-button>
       <el-button type="primary" @click="clickItem">确 定</el-button>
       </span>
    </el-dialog>
    </div>
</template>

<script>
import {
  list,
  GET_ITEMS_IMG,
  categories,
  ITEMS_IMG_UPLOAD,
  goodsdel,
  goodsedit,
  editcate
} from "@/api/apis";
export default {
  data() {
    return {
      datalist: [],
      pagesize: 5,
      total: 0,
      currentpage: 1,
      GET_ITEMS_IMG: "", //图片ip地址
      isloading: false, //是否显示加载动画
      dialogVisible: false, //是否显示弹框
      // 回填对象
      editobj: {}, //当前编辑对象
      categorieslist: [], //分类数组
      ITEMS_IMG_UPLOAD: ""
      // imgUrl:''
    };
  },
  methods: {
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.refresh();
    },
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.currentpage = val;
      this.refresh();
    },
    //编辑
    handleEdit(row) {
      // console.log(row);
      this.dialogVisible = true;
      //获取分类数据
      categories().then(res => {
        // console.log(res.data.categories)
        this.categorieslist = res.data.categories;
      });
      // this.editobj=row //浅拷贝
      this.editobj = { ...row }; //深拷贝  展开运算符

      // console.log(this.editobj)
    },
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm("即将删除商品数据，确定吗?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          goodsdel(row.id).then(res => {
            console.log(res);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.refresh();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    refresh() {
      this.isloading = true;
      list(this.currentpage, this.pagesize).then(res => {
        console.log(res.data);
        this.datalist = res.data.data;
        this.total = res.data.total;
        this.isloading = false;
      });
    },
    //发送请求修改编辑数据
    clickItem() {
      console.log(this.editobj);
      //删除多余属性参数
      delete this.editobj.rating
      delete this.editobj.ratings
      delete this.editobj.sellCount
      delete this.editobj.ctime
      goodsedit(this.editobj).then(res => {
        console.log(res.data)
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "商品数据修改成功！"
          });
          //刷新数据
          this.refresh();
          //关闭模态框
          this.dialogVisible = false;
        }
      });
    },
    //图片上传成功回调
    uploadfinish(res) {
      // console.log(res)
      if (res.code == 0) {
        this.editobj.imgUrl = res.imgUrl;
      }
    }
  },
  created() {
    this.GET_ITEMS_IMG = GET_ITEMS_IMG;
    this.ITEMS_IMG_UPLOAD = ITEMS_IMG_UPLOAD;
    this.refresh();
  }
};
</script>

<style scoped>
</style>