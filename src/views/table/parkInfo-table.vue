
// 车位信息
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input clearable v-model="searchname" placeholder="Id" style="width: 300px;" class="filter-item"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchOrder(searchname)">
        Search
      </el-button>
      <el-button class="filter-item" 
        style="margin-left: 10px;" 
        type="primary" 
        icon="el-icon-circle-plus-outline" 
        @click="dialogFormVisible = true">
        Add
      </el-button>
      <el-button class="filter-item" 
        style="margin-left: 10px;" 
        type="primary" 
        icon="el-icon-delete"
        @click="batchDelete">
        Delete
      </el-button>
    </div>

    <el-table
    :data="list"
    style="width: 100%"
    :row-class-name="tableRowClassName"
    @selection-change="handleSelectionChange">

      <el-table-column
<<<<<<< HEAD
        prop="parkId"
        label="parkId"
        width="140px">
      </el-table-column>
      <el-table-column
        prop="length"
        label="length"
        width="95px">
      </el-table-column>
      <el-table-column
        prop="width"
        label="width"
        width="95px">
      </el-table-column>
      <el-table-column
        prop="parkNum"
        label="parkNum"
        width="95px">
      </el-table-column>
      <el-table-column
        prop="tempOwner"
        label="tempOwner"
        width="150px">
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

        <!-- 点击增加打开的表单 -->
    <el-dialog title="增加用户" :visible.sync="dialogFormVisible" width="500px" top="30px">
      <!-- 添加新的用户 -->
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-addForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="addForm.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sexy">
          <el-radio-group v-model="addForm.sexy">
            <el-radio label="0"></el-radio>
            <el-radio label="1"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="Vip" prop="vip">
          <el-input v-model="addForm.vip"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="addForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="是否为管理员" prop="superRoot">
          <el-input v-model="addForm.superRoot"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('addForm')">立即添加</el-button>
          <el-button @click="resetForm('addForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑的表单 -->
    <el-dialog title="修改用户资料" :visible.sync="dialogTableVisible"  width="500px" top="30px">
      <!-- 添加新的用户 -->
      <el-form :model="editForm" :rules="rules"  ref="editForm" label-width="100px" class="demo-addForm">
        <el-form-item label="姓名" prop="name">
          <el-input  v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="editForm.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sexy">
          <el-radio-group v-model="editForm.sexy">
            <el-radio :label="0"></el-radio>
            <el-radio :label="1"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="Vip" prop="vip">
          <el-input v-model="editForm.vip"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="editForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>
        <el-form-item label="是否为管理员" prop="superRoot">
          <el-input v-model="editForm.superRoot"></el-input>
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
  .el-table{
    margin: 10px;
  }
  .icon-edit{
    border:1px solid #46aeff;
    background-color:#46aeff;
  }
</style>

<script>

  import {getParkInfoList} from '@/api/user'

  import axios from 'axios'
  export default{
    data(){
      return{
        addForm: {
          name: '',
          age: '',
          sexy: '',
          phone:'',
          vip:'',
          account:'',
          password:'',
          superRoot:''
        },
        editForm :{
          flowId:'',
          name: '',
          age: '',
          sexy: '',
          phone:'',
          vip:'',
          account:'',
          password:'',
          superRoot:''
        },
        // 表单验证规则
        rules: {  
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          age:[
            { required: true, message: '请输入年龄'},
          ],
          sexy:[
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          account:[
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          phone:[
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 1, max: 2, message: '请输入正确的手机格式', trigger: 'blur' }
          ]
        },
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          age: '',
          sexy: '',
          phone:'',
          vip:'',
          account:'',
          password:'',
          superRoot:''
        },
        formLabelWidth: '80px',
        orderList:[],
        editList:[],
        list:[],
        thedata:{
          isSuperUser:0,
        },
        batchId:'',
        searchname:''
      }

    },
    created(){
      this.getList()
    },
    methods:{
      // 按条件查询订单
      searchOrder(isname){
        findOrder(isname).then(resp=>{
          console.log(resp)
        })
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex%2 === 1) {
          return 'success-row';
        } 
        return '';
      },
      // 获取数据
      getList(){
        getParkInfoList(this.$route.query.id).then(resp=>{
        	console.log(resp)
        	this.list=resp.data
        })
      },
      // 提交表单的验证
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addUser(
              this.addForm
            ).then(resp=>{
              if(resp.data===1){
                this.dialogFormVisible=false,
                this.getList(),
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
              }
            }) 
          }
        });
      },
      // 重置表单的验证
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //按指定id删除人员信息
      deleteRow(index, rows ,id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rows.splice(index, 1);
          deleteUser({flowId:id}).then(resp=>{
            if(resp.data===1){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleEdit(index, row) {
        this.dialogTableVisible=true,
        this.editForm = Object.assign({}, row);
      },
      // 修改用户的资料
      editUser(){
        updateUser(
          this.editForm
          ).then(resp=>{
            if(resp.code===200){
              this.dialogTableVisible=false,
              this.getList(),
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            }
          })
      },
      cancelButton(formName){
        this.dialogTableVisible=false,
        this.$message({
          type: 'info',
          message: '已取消'
        });  
      },
      // 根据id查询用户
      idSearchUser(flowid){
        findUser(
          {flowId:flowid}
          ).then(resp=>{
            console.log(resp);
            this.dialogTableVisible=true,
            this.editForm = Object.assign({}, resp.data);
          })
      },
      handleSelectionChange(val) {
        this.batchId=val.map(item=>item.flowId);
      },
      batchDelete(){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          batchDeleteUser(
          {list:this.batchId}
          ).then(resp=>{
            if(resp.code===200){
              this.$message({
                message: '删除成功',
                type: 'success'
              }),
              this.getList()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }     
    }
  }
</script>