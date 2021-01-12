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

          <el-button style="width: 10%;margin-left: 10px" type="primary" round>搜索</el-button>
        </div>


        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"/>
          <el-table-column label="日期" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120"/>
          <el-table-column prop="address" label="地址" show-overflow-tooltip/>
          <el-table-column prop="phone" label="手机号" show-overflow-tooltip/>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          phone:'18338154519',
          address: '上海市普陀区金沙江路 1518'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          phone:'18338154519',
          address: '上海市普陀区金沙江路 1518 '
        }, {
          date: '2016-05-04',
          name: '王小虎',
          phone:'18338154519',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          phone:'18338154519',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          phone:'18338154519',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          phone:'18338154519',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          phone:'18338154519',
          address: '上海市普陀区金沙江路 1518 弄'
        }],

        multipleSelection: []
      }
    },

    methods: {
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
