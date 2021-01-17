<template>
  <div class="tag">
    <el-breadcrumb>
      <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
      <el-breadcrumb-item>违规视频管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <template>


        <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px">
          <el-button type="success" plain style="margin-right: 20px">新增</el-button>
          <label>标签名称</label>
          <el-input style="width: 10%" placeholder="请输入标签名称" prefix-icon="el-icon-search" v-model="searchTagName"/>
          <label>视频描述</label>
          <el-input style="width: 10%" placeholder="请输入描述信息" prefix-icon="el-icon-search" v-model="searchVideoDesc"/>
          <el-button @click="getViolationsVideos" style="width: 10%;margin-left: 10px" type="primary" round>搜索</el-button>
        </div>


        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"/>
          <el-table-column prop="id" label="id" width="120"/>
          <el-table-column prop="userId" label="上传人id" show-overflow-tooltip/>
          <el-table-column prop="tagName" label="标签名称" show-overflow-tooltip/>
          <el-table-column prop="videoDesc" label="视频描述" show-overflow-tooltip/>
          <el-table-column prop="videoPath" label="视频路径" show-overflow-tooltip/>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button @click="handleDialog(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >
          <label style="margin: auto">视频</label>
          <el-input style="margin-top: auto" v-model="dialogVideoId" :disabled="true"/>
          <label style="margin-bottom: 2px">上传人Id</label>
          <el-input style="margin-top: 20px" v-model="dialogUserId" />

          <label style="margin-bottom: 2px">视频标签</label>
          <el-input style="margin-top: 20px" v-model="dialogTagName" />
          <label style="margin-bottom: 2px">视频描述</label>
          <el-input style="margin-top: 20px" v-model="dialogVideoDesc" />
          <label style="margin-bottom: 2px">视频路径</label>
          <el-input style="margin-top: 20px" v-model="dialogVideoPath" />

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveTag">确 定</el-button>
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
          searchTagName:'',
          searchVideoDesc:'',
          dialogVideoId:"",
          dialogUserId:"",
          dialogTagName:"",
          dialogVideoDesc:"",
          dialogVideoPath:"",
        }
      },
      created() {
        this.getViolationsVideos();
      },
      methods: {
        getViolationsVideos() {
          this.$axios.post("http://localhost:8081/video/queryForBase", {
              tagName: this.searchTagName,
              videoDesc: this.searchVideoDesc,
          }).then(res => {
            this.tableData = res.data.data;
          }).catch(res => {
            alert("出错了")
          })
        },
        handleDialog(data) {
          this.dialogVisible = true;
          this.dialogVideoId = data.id;
          this.dialogUserId = data.userId;
          this.dialogTagName = data.tagName;
          this.dialogVideoDesc = data.videoDesc;
          this.dialogVideoPath = data.videoPath;
        },
        saveTag() {
          this.dialogVisible = false;
          this.$axios.put("http://localhost:8081/video/updateVideo",{
              id: this.dialogVideoId,
              userId: this.dialogUserId,
              tagId: this.dialogTagId,
              videoDesc: this.dialogVideoDesc,
              videoPath: this.dialogVideoPath
          }).then(res =>{
              this.getViolationsVideos();
          }).catch(res =>{
              alert("出错了");
          })
        }

      }
    }
</script>

<style>

</style>
