// 订单信息
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input clearable v-model="searchname" placeholder="停车场名字" style="width: 300px;" class="filter-item"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchOrder(searchname)">
        订单查询
      </el-button>
    </div>

    <el-table
    :data="list"
    style="width: 100%"
    :row-class-name="tableRowClassName">

      <el-table-column
        type="selection"
        width="80px">
      </el-table-column>
      <el-table-column
        prop="parkName"
        label="停车场名称"
        width="160px">
      </el-table-column>
      <el-table-column
        prop="parkNo"
        label="车位号"
        width="160px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="下单人"
        width="160px">
      </el-table-column>
      <el-table-column
        prop="carNum"
        label="车牌号"
        width="160px">
      </el-table-column>
      <el-table-column
        prop="color"
        label="颜色"
        width="160px">
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="创建时间"
        :formatter="formatDate"
        width="180px">
      </el-table-column>
      <el-table-column
        prop="startDate"
        label="开始时间"
        :formatter="formatDate"
        width="180px">
      </el-table-column>
      <el-table-column
        prop="endDate"
        label="结束时间"
        :formatter="formatDate"
        width="180px">
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
      // 默认展示
      findOrder("").then(resp=>{
        console.log(resp)
        this.list=resp.data
      })
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
      cancelButton(formName){
        this.dialogTableVisible=false,
        this.$message({
          type: 'info',
          message: '已取消'
        });
      },formatDate(row, column) {
        // 获取单元格数据
        let data = row[column.property]
        if(data == null) {
          return null
        }
        let dt = new Date(data)
        return dt.getFullYear() + '年' + (dt.getMonth() + 1) + '月' + dt.getDate() + '日 ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
      }
    }
  }
</script>
