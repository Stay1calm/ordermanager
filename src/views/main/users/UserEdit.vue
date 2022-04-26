<template>
<div>
    <div style="margin-bottom:10px;"> 头像上传点击下方＋号</div> 
    <div style="border:1px dashed grey;width:80px">
        <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/users/avatar_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :data="uploaddata"
            >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            uploaddata:''
        }
    },
    created(){
        this.uploaddata={id:localStorage.id}
    },
    methods:{
        handleAvatarSuccess(res){
            // console.log(res)
            if(res.code==0){
                 this.$message({
                    message: '图片上传成功',
                    type: 'success'
                });
                //2.发出通知
         this.$bus.$emit("imguploadfinish");

            }
        }
    }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed rgb(105, 102, 107);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>