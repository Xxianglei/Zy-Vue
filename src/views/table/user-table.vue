// 用户信息
<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <template slot-scope="scope"> -->
      <template>
        <el-select v-model="isSexy" placeholder="按性别筛选" @change="findUserByCondition1(isSexy)">
          <el-option
            v-for="item in issexy"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>

      <template>
        <el-select v-model="isVip" placeholder="按是否会员筛选" @change="findUserByCondition2(isVip)">
          <el-option
            v-for="item in isvips"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template>
        <el-select v-model="isOnline" placeholder="按是否在线筛选" @change="findUserByCondition3(isOnline)">
          <el-option
            v-for="item in onlines"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>

      <el-input v-model="nameSearch" clearable placeholder="用户名" style="height: 28px;width: 200px;"
                class="filter-item"/>
      <el-button class="filter-item" type="primary" style="margin-left: 10px;margin-top: 7px" icon="el-icon-search"
                 @click="nameSearchUser(nameSearch)">
        查询
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;margin-top:7px"
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="dialogFormVisible = true"
      >
        新增用户
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;margin-top: 7px"
        type="primary"
        icon="el-icon-delete"
        @click="batchDelete"
      >
        批量删除
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;margin-top: 7px"
        type="primary"
        icon="el-icon-search"
        @click="findOnlyRoot()"
      >
        筛选管理
      </el-button>
      <!-- </template> -->
    </div>

    <el-table
      :data="list"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      @selection-change="handleSelectionChange"
    >

      <el-table-column
        type="selection"
        width="50px"
      />

      <el-table-column
        prop="name"
        label="姓名"
        width="160px"
      />
      <el-table-column
        prop="account"
        label="账号"
        width="160px"
      />
      <el-table-column
        prop="password"
        label="密码"
        width="160px"
        :formatter="showPassword"
      />
      <el-table-column
        prop="phone"
        label="电话"
        width="160px"
      />
      <el-table-column
        prop="age"
        label="年龄"
        width="140px"
        :formatter="showAge"
      />
      <el-table-column
        prop="sexy"
        label="性别"
        width="140px"
        :formatter="showSexy"
      />
      <el-table-column
        prop="vip"
        label="会员"
        width="140px"
        :formatter="showVip"
      />
      <el-table-column
        prop="status"
        label="在线"
        width="140px"
        :formatter="showOnline"
      />
      <el-table-column
        label="操作"
        width="180px"
      >
        <template slot-scope="scope">
          <el-button
            class="icon-edit"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="handleEdit(scope.$index, scope.row)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click.native.prevent="deleteRow(scope.$index, list,scope.row.flowId)"
          />

        </template>
      </el-table-column>
    </el-table>

    <!-- 点击增加打开的表单 -->
    <el-dialog title="增加用户" :visible.sync="dialogFormVisible" width="500px" top="30px">
      <!-- 添加新的用户 -->
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="100px" class="demo-addForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name"/>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="addForm.age"/>
        </el-form-item>
        <el-form-item label="性别" prop="sexy">
          <el-radio-group v-model="addForm.sexy">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addForm.phone"/>
        </el-form-item>
        <el-form-item label="是否为会员" prop="vip">
          <el-switch
            v-model="addForm.vip"
            active-color="#13ce66"
            :active-value="0"
            :inactive-value="1"
            active-text="会员"
            inactive-text="普通"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="addForm.account"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password"/>
        </el-form-item>
        <el-form-item label="是否为管理" prop="superRoot">
          <el-switch
            v-model="addForm.superRoot"
            active-color="#13ce66"
            :active-value="1"
            :inactive-value="0"
            active-text="管理"
            inactive-text="用户"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('addForm')">立即添加</el-button>
          <el-button @click="resetForm('addForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑的表单 -->
    <el-dialog title="修改用户资料" :visible.sync="dialogTableVisible" width="500px" top="30px">
      <!-- 添加新的用户 -->
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="100px" class="demo-addForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name"/>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="editForm.age"/>
        </el-form-item>
        <el-form-item label="性别" prop="sexy">
          <el-radio-group v-model="editForm.sexy">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="editForm.phone"/>
        </el-form-item>
        <el-form-item label="是否为会员" prop="vip">
          <el-switch
            v-model="editForm.vip"
            active-color="#13ce66"
            active-value=0
            inactive-value=1
            active-text="会员"
            inactive-text="普通"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="editForm.account"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password" type="password"/>
        </el-form-item>
        <el-form-item label="是否为管理" prop="superRoot">
          <el-switch
            v-model="editForm.superRoot"
            active-color="#13ce66"
            active-value=1
            active-text="管理"
            inactive-text="用户"
            inactive-value=0
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editUser('editForm')">立即修改</el-button>
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

  var online = ''
  var sexy = ''
  var vip = ''
  import {
    findAllUser,
    findUser,
    addUser,
    deleteUser,
    batchDeleteUser,
    updateUser,
    findUserByName,
    findUserByCondition
  } from '@/api/user'
  import axios from 'axios'

  export default {
    data() {
      return {

        issexy: [
          {
            value: '',
            label: '空'
          }, {
            value: '0',
            label: '男'
          }, {
            value: '1',
            label: '女'
          }],
        isvips: [{
          value: '',
          label: '空'
        }, {
          value: '0',
          label: '会员'
        }, {
          value: '1',
          label: '普通'
        }],
        onlines: [{
          value: '',
          label: '空'
        }, {
          value: '1',
          label: '在线'
        }, {
          value: '0',
          label: '不在线'
        }],
        addForm: {
          name: '',
          age: '',
          sexy: '',
          phone: '',
          vip: 0,
          account: '',
          password: '',
          superRoot: 0
        },
        editForm: {
          flowId: '',
          name: '',
          age: '',
          sexy: '',
          phone: '',
          vip: '',
          account: '',
          password: '',
          superRoot: ''
        },
        isSexy: '',
        isVip: '',
        isOnline: '',
        nameSearch: '',
        // 表单验证规则
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          age: [
            { required: true, message: '请输入年龄' }
          ],
          sexy: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 1, max: 11, message: '请输入正确的手机格式', trigger: 'blur' }
          ]
        },
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          age: '',
          sexy: '',
          phone: '',
          vip: '',
          account: '',
          password: '',
          superRoot: ''
        },
        formLabelWidth: '80px',
        list: [],
        editList: [],
        thedata: {
          isSuperUser: ''
        },
        idSearch: '',
        batchId: '',
        value: ''
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
      // 获取数据
      getList() {
        findAllUser(this.thedata).then(resp => {
          var json = resp.data
          this.formatDate(json)
          this.list = json
        })
      }, findOnlyRoot() {
        var data=this.thedata={ isSuperUser: '1'}
        findAllUser(data).then(resp => {
          var json = resp.data
          this.formatDate(json)
          this.list = json
        })
      },
      formatDate(json) {
        /*for (let i = 0; i < json.length; i++) {
          this.showAge()
          this.showOnline()
          this.showSexy()
          this.showVip()

          json[i].age = json[i].age + '岁'
          if (json[i].sexy == '0') {
            json[i].sexy = '男'
          } else {
            json[i].sexy = '女'
          }
          if (json[i].vip == '0') {
            json[i].vip = '会员'
          } else {
            json[i].vip = '非会员'
          }
          if (json[i].status == '0') {
            json[i].status = '不在线'
          } else {
            json[i].status = '在线'
          }
        }*/
      },
      // 提交表单的验证
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addUser(
              this.addForm
            ).then(resp => {
              if (resp.data === 1) {
                this.dialogFormVisible = false,
                  this.getList(),
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  })
              } else {
                this.getList(),
                  this.$message({
                    message: '添加失败',
                    type: 'warning'
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
      // 按指定id删除人员信息
      deleteRow: function(index, rows, id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rows.splice(index, 1)
          deleteUser({ flowId: id }).then(resp => {
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
      },
      handleEdit(index, row) {
        this.dialogTableVisible = true, this.editForm = Object.assign({}, row)
      },
      // 修改用户的资料
      editUser() {
        updateUser(
          this.editForm
        ).then(resp => {
          if (resp.code === 200) {
            this.dialogTableVisible = false,
              this.getList(),
              this.$message({
                message: '修改成功',
                type: 'success'
              })
          } else {
            this.getList(),
              this.$message({
                message: '添加失败',
                type: 'warning'
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
      },
      // 根据id查询用户
      idSearchUser(flowid) {
        findUser(
          { flowId: flowid }
        ).then(resp => {
          console.log(resp)
          this.dialogTableVisible = true,
            this.editForm = Object.assign({}, resp.data)
        })
      },
      // 根据姓名模糊查找
      nameSearchUser(name) {
        findUserByName(
          { name: name }
        ).then(resp => {
          console.log(resp)
          var json = resp.data
          this.formatDate(json)
          this.list = json
        })
      }
      ,
      // 条件筛选
      findUserByCondition1(condition) {
        sexy = condition
        findUserByCondition(
          { status: online, vip: vip, sexy: sexy }
        ).then(resp => {
          console.log(resp)
          var json = resp.data
          this.formatDate(json)
          this.list = json
        })
      },
      findUserByCondition2(condition) {
        vip = condition
        findUserByCondition(
          { status: online, vip: vip, sexy: sexy }
        ).then(resp => {
          console.log(resp)
          var json = resp.data
          this.formatDate(json)
          this.list = json
        })
      },
      findUserByCondition3(condition) {
        online = condition
        findUserByCondition(
          { status: online, vip: vip, sexy: sexy }
        ).then(resp => {
          console.log(resp)
          var json = resp.data
          this.formatDate(json)
          this.list = json
        })
      },
      // 批量删除
      handleSelectionChange(val) {
        this.batchId = val.map(item => item.flowId)
      },
      batchDelete() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.batchId == null || this.batchId == '') {
            this.$message({
              message: '请勾选删除项',
              type: 'warning'
            })
          }
          batchDeleteUser(
            { list: this.batchId }
          ).then(resp => {
            if (resp.code == 200) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: resp.message,
                type: 'warning'
              })
            }
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },   // 密码脱敏
      showPassword(row, column) {
        return '************'
      }
      ,   // 性别格式化
      showSexy(row, column) {
        return row.sexy == 0 ? '男' : row.sexy == 1 ? '女' : '未知'
      }
      ,   // 年龄格式化
      showAge(row, column) {
        return row.age = row.age
      }
      ,   // vip格式化
      showVip(row, column) {
        return row.vip == 0 ? '会员' : row.vip == 1 ? '普通' : '未知'
      }
      ,   // 在线格式化
      showOnline(row, column) {
        return row.status == 1 ? '在线' : row.sexy == 0 ? '不在线' : '未知'
      }
    }
  }
</script>
