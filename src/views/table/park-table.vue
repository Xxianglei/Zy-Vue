// 停车场
<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <template slot-scope="scope"> -->
      <el-input clearable v-model="parkName" placeholder="停车场名称" style="width: 300px;" class="filter-item"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="SearchParksByName(parkName)">
        停车场查询
      </el-button>
      <el-button class="filter-item"
                 style="margin-left: 10px;"
                 type="primary"
                 icon="el-icon-circle-plus-outline"
                 @click="dialogFormVisible = true">
        新增停车场
      </el-button>
      <!-- </template> -->
    </div>

    <el-table
      :data="list"
      style="width: 100%"
      :default-sort="{prop: 'flowId', order: 'ascending'}"
      :row-class-name="tableRowClassName"
      @row-click="getParkinfo">
      <el-table-column
        prop="parkName"
        label="停车场名字"
        width="160px">
      </el-table-column>
      <el-table-column
        prop="volume"
        label="容量"
        width="140px">
      </el-table-column>
      <el-table-column
        prop="location"
        label="地址"
        width="240px">
      </el-table-column>
      <el-table-column
        prop="jd"
        label="经度"
        width="160px">
      </el-table-column>
      <el-table-column
        prop="wd"
        label="纬度"
        width="160px">
      </el-table-column>
      <el-table-column
        prop="bPrice"
        label="白天价格"
        width="140px">
      </el-table-column>
      <el-table-column
        prop="yPrice"
        label="夜间价格"
        width="140px">
      </el-table-column>
      <el-table-column
        prop="vPrice"
        label="会员折扣"
        :formatter="formatVip"
        width="140px">
      </el-table-column>
      <el-table-column
        label="操作"
        width="160px">
        <template slot-scope="scope">
          <el-button class="icon-edit" type="primary" icon="el-icon-edit" circle
                     @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle
                     @click.native.prevent="deleteRow(scope.$index, list,scope.row.flowId)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 点击增加打开的表单 -->
    <el-dialog title="新增停车场" :visible.sync="dialogFormVisible" width="500px" top="30px">
      <!-- 添加新的用户 -->
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-addForm">
        <el-form-item label="停车场名字" prop="parkName">
          <el-input v-model="addForm.parkName"></el-input>
        </el-form-item>
        <el-form-item label="容量" prop="volume">
          <el-input v-model="addForm.volume"></el-input>
        </el-form-item>
        <el-form-item label="白天价格" prop="bPrice">
          <el-input v-model="addForm.bPrice"></el-input>
        </el-form-item>
        <el-form-item label="夜间价格" prop="yPrice">
          <el-input v-model="addForm.yPrice"></el-input>
        </el-form-item>
        <el-form-item label="会员折扣" prop="vPrice">
          <el-input v-model="addForm.vPrice"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="location">
          <el-input v-model="addForm.location"></el-input>
        </el-form-item>
        <el-form-item label="经度" prop="jd">
          <el-input v-model="addForm.jd"></el-input>
        </el-form-item>
        <el-form-item label="纬度" prop="wd">
          <el-input v-model="addForm.wd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('addForm')">立即添加</el-button>
          <el-button @click="resetForm('addForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑的表单 -->
    <el-dialog title="编辑停车场信息" :visible.sync="dialogTableVisible" width="500px" top="30px">
      <!-- 添加新的停车场 -->
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-addForm">
        <el-form-item label="停车场名字" prop="parkName">
          <el-input v-model="editForm.parkName"></el-input>
        </el-form-item>
        <el-form-item label="容量" prop="volume">
          <el-input v-model="editForm.volume"></el-input>
        </el-form-item>
        <el-form-item label="白天价格" prop="bPrice">
          <el-input v-model="editForm.bPrice"></el-input>
        </el-form-item>
        <el-form-item label="夜间价格" prop="yPrice">
          <el-input v-model="editForm.yPrice"></el-input>
        </el-form-item>
        <el-form-item label="会员折扣" prop="vPrice">
          <el-input v-model="editForm.vPrice"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="location">
          <el-input v-model="editForm.location"></el-input>
        </el-form-item>
        <el-form-item label="经度" prop="jd">
          <el-input v-model="editForm.jd"></el-input>
        </el-form-item>
        <el-form-item label="纬度" prop="wd">
          <el-input v-model="editForm.wd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editPark('editForm')">立即修改</el-button>
          <el-button @click="cancelButton('editForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
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
  import { findPark, addPark, deletePark, updatePark, findParksByName } from '@/api/user'
  import axios from 'axios'

  export default {
    data() {
      return {
        addForm: {},
        editForm: {},
        // 表单验证规则
        rules: {
          parkName: [
            { required: true, message: '请输入停车场名称', trigger: 'blur' }
          ],
          bPrice: [
            { required: true, message: '请输入价格' }
          ],
          vPrice: [
            { required: true, message: '请输入会员价格', trigger: 'change' }
          ],
          yPrice: [
            { required: true, message: '请输入价格', trigger: 'blur' }
          ],
          jd: [
            { required: true, message: '请输入经度', trigger: 'blur' }
          ],
          wd: [
            { required: true, message: '请输入维度', trigger: 'blur' }
          ], location: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ], volume: [
            { required: true, message: '请输入容量', trigger: 'blur' }
          ]
        },
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '80px',
        list: [],
        parkName: ''
      }
    },
    created() {
      this.getList()
    },
    methods: {
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex % 2 === 1) {
          return 'success-row'
        }
        return ''
      },
      //查询停车场
      getList() {
        findPark().then(resp => {
          console.log(resp)
          this.list = resp.data
        })
      },
      //跳转到车位的页面
      getParkinfo(row) {
        console.log(row.flowId)
        this.$router.push({ name: 'ParkInfoTable', query: { id: row.flowId } })
      },
      // 提交表单的验证,添加停车场
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addPark(
              this.addForm
            ).then(resp => {
              if (resp.code === 200) {
                this.dialogFormVisible = false,
                  this.getList(),
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  })
              }
            })
          }
        })
      },
      // 重置表单的验证
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      //按指定id删除停车场
      deleteRow(index, rows, id) {
        event.stopPropagation()
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rows.splice(index, 1)
          deletePark(id).then(resp => {
            if (resp.code === 200) {
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
      },
      handleEdit(index, row) {
        this.dialogTableVisible = true,
          this.editForm = Object.assign({}, row)
        event.stopPropagation()
      },
      // 修改停车场的资料
      editPark() {
        updatePark(
          this.editForm
        ).then(resp => {
          if (resp.code === 200) {
            this.dialogTableVisible = false,
              this.getList(),
              this.$message({
                message: '修改成功',
                type: 'success'
              })
          }
        })
      },
      cancelButton(formName) {
        this.dialogTableVisible = false,
          this.$message({
            type: 'info',
            message: '已取消'
          })
      },formatVip(row, column) {
        var vip= row.vPrice;
        vip=vip*100;
        return vip+'折'
      }
      /*  // 根据id查询用户
        idSearchUser(flowid) {
          findUser(
            { flowId: flowid }
          ).then(resp => {

            this.dialogTableVisible = true,
              this.editForm = Object.assign({}, resp.data)
          })
        }*/, // 根据id查询用户
      SearchParksByName(parkName) {
        findParksByName(
          parkName
        ).then(resp => {
          console.log(resp)
          this.list = resp.data
        })
      }
    }
  }
</script>
