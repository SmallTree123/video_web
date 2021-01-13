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
          <label style="margin: auto">姓名</label>
          <el-input style="width: 10%" placeholder="请输入姓名" prefix-icon="el-icon-search" v-model="input1"/>
          <label>地址</label>
          <el-input style="width: 10%" placeholder="请输入地址" prefix-icon="el-icon-search" v-model="input2"/>
          <label>日期</label>
          <el-input style="width: 10%" placeholder="请输入日期" prefix-icon="el-icon-search" v-model="input3"/>
          <label>手机号</label>
          <el-input style="width: 10%" placeholder="请输入手机号" prefix-icon="el-icon-search" v-model="input4"/>

          <el-button @click="zhf" style="width: 10%;margin-left: 10px" type="primary" round>搜索</el-button>
        </div>


        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"/>
          <el-table-column prop="id" label="编号" width="120"/>
          <el-table-column prop="name" label="姓名" show-overflow-tooltip/>
        </el-table>
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
        input1:'',
        input2:'',
        input3:'',
        input4:'',
      }
    },
   created() {
    this.zhf();
   },
    methods: {
      zhf(){
        console.log(this.input1+"--"+this.input2+"--"+this.input3+"--"+this.input4);
        this.$axios.get("http://localhost:8081/tag/queryAllTag", {  //params参数必写 , 如果没有参数传{}也可以
          params: {
            id: this.input1,
            name: this.input2,
            address: this.input3,
            phone: this.input4
          }
         }).then(res => {
              this.tableData = res.data.data;
         }).catch(res =>{
              alert("出错了")
        })
      },

      toggleSelection(rows) {
        if (rows) {

          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>
