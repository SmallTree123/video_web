<style lang="stylus" rel="stylesheet/stylus">

</style>

<template>
  <div class="user">
    <el-breadcrumb>
      <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <template>
        <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px">
          <el-button @click="addUser" type="success" plain style="margin-right: 20px">新增</el-button>
          <label style="margin: auto">用户名</label>
          <el-input style="width: 10%" placeholder="请输入用户名" prefix-icon="el-icon-search" v-model="username"/>
          <label style="margin: auto;margin-left:30px">昵称</label>
          <el-input style="width: 10%" placeholder="请输入昵称" prefix-icon="el-icon-search" v-model="nickname"/>
          <el-button @click="zhf" style="width: 10%;margin-left: 10px" type="primary" round>搜索</el-button>
        </div>


        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"/>
          <el-table-column prop="id" label="ID" width="120"/>
          <el-table-column prop="username" label="用户名" show-overflow-tooltip/>
          <el-table-column prop="faceImage" label="头像地址" show-overflow-tooltip/>
          <el-table-column prop="nickname" label="用户昵称" show-overflow-tooltip/>
          <el-table-column prop="fansCounts" label="粉丝数" show-overflow-tooltip/>
          <el-table-column prop="followCounts" label="关注的人数" show-overflow-tooltip/>
          <el-table-column prop="receiveLikeCounts" label="获赞数" show-overflow-tooltip/>

          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button @click="handleDialog(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>


        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >
          <label style="margin: auto">用户Id</label>
          <el-input style="margin-top: auto" v-model="dialogId" placeholder="" :disabled="isDisable"/>
          <label style="margin: auto">用户名</label>
          <el-input style="margin-top: 20px" v-model="dialogUserName" placeholder=""/>
          <label style="margin: auto">头像地址</label>
          <el-input style="margin-top: 20px" v-model="dialogFaceImage" placeholder=""/>
          <label style="margin: auto">昵称</label>
          <el-input style="margin-top: 20px" v-model="dialogNickname" placeholder=""/>
          <label style="margin: auto">粉丝数</label>
          <el-input style="margin-top: 20px" v-model="dialogFansCounts" placeholder=""/>
          <label style="margin: auto">关注数</label>
          <el-input style="margin-top: 20px" v-model="dialogFollowCounts" placeholder=""/>
          <label style="margin: auto">获赞数</label>
          <el-input style="margin-top: 20px"  v-model="dialogReceiveLikeCounts" placeholder=""/>
          <span slot="footer" class="dialog-footer">
          <el-button @click="cancelDialog">取 消</el-button>
          <el-button type="primary" @click="saveUser">确 定</el-button>
        </span>
        </el-dialog>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        dialogVisible: false,
        dialogId:"",
        dialogUserName:"",
        dialogFaceImage:"",
        dialogNickname:"",
        dialogFansCounts:"",
        dialogFollowCounts:"",
        dialogReceiveLikeCounts:"",
        username:'',
        nickname:'',
        isDisable: true,
      }
    },
   created() {
    this.zhf();
   },
    methods: {
      zhf(){
        this.$axios.post("http://localhost:8081/user/getAllUser", {  //params参数必写 , 如果没有参数传{}也可以
            username: this.username,
            nickname: this.nickname,
         }).then(res => {
              this.tableData = res.data.data;
         }).catch(res =>{
              alert("出错了")
        })
      },
      handleDialog(data) {
        this.dialogVisible = true;
        this.dialogId = data.id;
        this.dialogUserName = data.username;
        this.dialogFaceImage = data.faceImage;
        this.dialogNickname = data.nickname;
        this.dialogFansCounts = data.fansCounts;
        this.dialogFollowCounts = data.followCounts;
        this.dialogReceiveLikeCounts = data.receiveLikeCounts;
      },
      cancelDialog(){
        this.dialogVisible = false;
        this.dialogId = "";
        this.dialogUserName = "";
        this.dialogFaceImage = "";
        this.dialogNickname = "";
        this.dialogFansCounts = "";
        this.dialogFollowCounts = "";
        this.dialogReceiveLikeCounts = "";
      },
      addUser(){
          this.dialogVisible = true;
          this.isDisable = true;

      },
      saveUser(){
        this.dialogVisible = false;
        this.$axios.put("http://localhost:8081/user/updateUser",{
              id: this.dialogId,
              username: this.dialogUserName,
              faceImage: this.dialogFaceImage,
              nickname: this.dialogNickname,
              fansCounts: this.dialogFansCounts,
              followCounts: this.dialogFollowCounts,
              receiveLikeCounts: this.dialogReceiveLikeCounts
        }).then(res =>{
            //刷新页面
            this.zhf();
            this.dialogId = "";
            this.dialogUserName = "";
            this.dialogFaceImage = "";
            this.dialogNickname = "";
            this.dialogFansCounts = "";
            this.dialogFollowCounts = "";
            this.dialogReceiveLikeCounts = "";
        }).catch(res =>{
          alert("出错了")
        })
      },

      del(data) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          showClose: true,
        }).then(() => {
          this.$axios.delete("http://localhost:8081/user/delUser",{
            params:{
              id:data.id
            }
          }).then(res =>{
            //刷新页面
            this.zhf();
            this.$message({
              type: 'success',
              message: '删除成功!',
              showClose: true,
            });
          }).catch(res =>{
            this.$message({
              type: 'error',
              message: '出错了!',
              showClose: true,
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            showClose: true,
          });
        });

      }

    }
  }
</script>
