<template>
  <div class="tag">
    <el-breadcrumb>
      <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
      <el-breadcrumb-item>标签管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <template>
        <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px">
          <label style="margin: auto">标签名</label>
          <el-input style="width: 10%" placeholder="请输入标签名" prefix-icon="el-icon-search" v-model="name"/>
          <el-button @click="zhf" style="width: 10%;margin-left: 10px" type="primary" round>搜索</el-button>
        </div>


        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"/>
          <el-table-column prop="id" label="编号" width="120"/>
          <el-table-column prop="name" label="名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tag type="success" disable-transitions>{{scope.row.name}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button @click="update(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
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
          name:'',
        }
      },
      created() {
        this.zhf();
      },
      methods: {
        zhf(){
          this.$axios.post("http://localhost:8081/tag/queryAllTag", {  //params参数必写 , 如果没有参数传{}也可以
            name:this.name
          }).then(res => {
            this.tableData = res.data.data;
          }).catch(res =>{
            alert("出错了")
          })
        },
        handleClick(e){
          console.log(e.id+"--->"+e.name);
        },
        update() {
          const h = this.$createElement;
          this.$msgbox({
            title: '消息',
            message: h('p', null, [
              h('span', null, '内容可以是 '),
              h('i', { style: 'color: teal' }, 'VNode')
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                setTimeout(() => {
                  done();
                  setTimeout(() => {
                    instance.confirmButtonLoading = false;
                  }, 300);
                }, 3000);
              } else {
                done();
              }
            }
          }).then(action => {
            this.$message({
              type: 'warn',
              message: '出问题了'
            });
          });
        },

        del(data) {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            showClose: true,
          }).then(() => {
            this.$axios.delete("http://localhost:8081/tag/delTag",{
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

<style lang="stylus" rel="stylesheet/stylus">

</style>
