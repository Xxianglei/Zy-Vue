// 订单信息
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="searchname" clearable placeholder="停车场名字" style="width: 300px;" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchOrder(searchname)">
        订单查询
      </el-button>
    </div>

    <el-table
      :data="list"
      style="width: 100%"
      height="510"
      :default-sort="{prop: 'parkNo', order: 'descending'}"
      :row-class-name="tableRowClassName"
    >

      <el-table-column
        type="selection"
        width="60px"
      />
      <el-table-column
        prop="parkName"
        label="停车场名称"
        width="120px"
      />
      <el-table-column
        prop="parkNo"
        label="车位号"
        sortable
        width="120px"
      />
      <el-table-column
        prop="name"
        label="下单人"
        width="120px"
      />
      <el-table-column
        prop="carNum"
        label="车牌号"
        width="120px"
      />
      <el-table-column
        prop="color"
        label="颜色"
        width="120px"
      />
      <el-table-column
        prop="createDate"
        label="创建时间"
        sortable
        :formatter="formatDate"
        width="180px"
      />
      <el-table-column
        prop="startDate"
        label="开始时间"
        sortable
        :formatter="formatDate"
        width="180px"
      />
      <el-table-column
        prop="endDate"
        label="结束时间"
        sortable
        :formatter="formatDate"
        width="180px"
      />
      <el-table-column
        prop="charge"
        label="订单状态"
        :formatter="formatCharge"
        :filters="[{text: '未支付', value: '0'},
                   {text: '已支付', value: '1'},
                   {text: '已过期', value: '2'}]"
        :filter-method="filterHandler"
        width="100px"
      />
      <el-table-column
        label="操作"
        width="120px"
      >
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click.native.prevent="deleteRow(scope.$index, list,scope.row.flowId)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
  .el-table .warning-row {
    background: #faf3f4;
  }

  .el-table .success-row {
    background: #e9ffef;
  }

  .el-table {
    margin: 10px;
  }

  .icon-edit {
    border: 1px solid #46aeff;
    background-color: #46aeff;
  }
</style>

<script>
import { deleteOrder, findOrder } from '@/api/user'
import axios from 'axios'

export default {
  data() {
    return {
      form: {},
      formLabelWidth: '80px',
      orderList: [],
      list: [],
      searchname: ''
    }
  },
  created() {
    // 默认展示
    findOrder('').then(resp => {
      console.log(resp)
      this.list = resp.data
    })
  },
  methods: {
    // 按条件查询订单
    searchOrder(isname) {
      findOrder(isname).then(resp => {
        console.log(resp)
        this.list = resp.data
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.charge == 1) {
        return 'success-row'
      }
      if (row.charge == 2) {
        return 'warning-row'
      }
      return ''
    },
    cancelButton(formName) {
      this.dialogTableVisible = false,
      this.$message({
        type: 'info',
        message: '已取消'
      })
    }, formatDate(row, column) {
      // 获取单元格数据
      const data = row[column.property]
      if (data == null) {
        return null
      }
      const dt = new Date(data)
      return dt.getFullYear() + '年' + (dt.getMonth() + 1) + '月' + dt.getDate() + '日 ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
    }, formatCharge(row, column) {
      var charge = '未知'
      if (row.charge == 0) {
        charge = '未支付'
      }
      if (row.charge == 1) {
        charge = '已支付'
      }
      if (row.charge == 2) {
        charge = '已过期'
      }
      return charge
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    }, deleteRow: function(index, rows, id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rows.splice(index, 1)
        deleteOrder(id).then(resp => {
          if (resp.data === 1) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
