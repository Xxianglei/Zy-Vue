// 订单信息
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input clearable v-model="searchname" placeholder="Id" style="width: 300px;" class="filter-item"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchOrder(searchname)">
        Search
      </el-button>
    </div>

    <el-table
    :data="list"
    style="width: 100%"
    :row-class-name="tableRowClassName">

      <el-table-column
        type="selection"
        width="50px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="140px">
      </el-table-column>
      <el-table-column
        prop="carNum"
        label="车牌号"
        width="95px">
      </el-table-column>
      <el-table-column
        prop="color"
        label="颜色"
        width="95px">
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="创建时间"
        width="95px">
      </el-table-column>
      <el-table-column
        prop="startDate"
        label="开始时间"
        width="150px">
      </el-table-column>
      <el-table-column
        prop="endDate"
        label="结束时间"
        width="95px">
      </el-table-column>
      <el-table-column
        prop="parkName"
        label="车位名称"
        width="95px">
      </el-table-column>
      <el-table-column
        prop="parkNo"
        label="车位号"
        width="95px">
      </el-table-column>
      <el-table-column
        label="操作"
        width="160px">
        <template slot-scope="scope">
          <el-button class="icon-edit"  type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click.native.prevent="deleteRow(scope.$index, list,scope.row.flowId)"></el-button>
          <el-button type="success" icon="el-icon-circle-plus-outline" circle @click="dialogFormVisible = true"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-table{
    margin: 10px;
  }
  .icon-edit{
    border:1px solid #46aeff;
    background-color:#46aeff;
  }
</style>

<script>
  import {findOrder} from '@/api/user'
  import axios from 'axios'
  export default{
    data(){
      return{
        form: {
        },
        formLabelWidth: '80px',
        orderList:[],
        list:[],
        searchname:''
      }

    },
    created(){

    },
    methods:{
      // 按条件查询订单
      searchOrder(isname){
        findOrder(isname).then(resp=>{
          console.log(resp)
          this.list=resp.data
        })
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex%2 === 1) {
          return 'success-row';
        } 
        return '';
      },
//    // 获取数据
//    getList(){
//      findAllUser(this.thedata).then(resp=>{
//        this.list=resp.data
//      })
//    },

      cancelButton(formName){
        this.dialogTableVisible=false,
        this.$message({
          type: 'info',
          message: '已取消'
        });  
      }     
    }
  }
</script>