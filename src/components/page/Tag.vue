<template>
  <div class="tag">
    <el-breadcrumb>
      <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
      <el-breadcrumb-item>标签管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <template>
        <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px">
          <label style="margin: auto">姓名</label>
          <el-input
            style="width: 10%"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="input2">
          </el-input>
          <label>地址</label>
          <el-input
            style="width: 10%"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="input2">
          </el-input>
          <label>日期</label>
          <el-input
            style="width: 10%"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="input2">
          </el-input>
          <label>地址</label>
          <el-input
            style="width: 10%"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="input2">
          </el-input>

          <el-button style="width: 10%;margin-left: 10px" type="primary" round>搜索</el-button>
        </div>


        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="日期"
            width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Tag"
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
