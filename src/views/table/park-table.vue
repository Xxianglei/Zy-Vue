// 停车场
<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <template slot-scope="scope"> -->
        <el-input clearable v-model="idSearch" placeholder="Id" style="width: 300px;" class="filter-item"/>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="idSearchUser(idSearch)">
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
      <!-- </template> -->
    </div>

  <el-table
    :data="list"
    style="width: 100%"
    :default-sort = "{prop: 'flowId', order: 'ascending'}"
    :row-class-name="tableRowClassName"
    @selection-change="handleSelectionChange"
    @row-click="getParkinfo">
    <el-table-column
      prop="flowId"
      label="ID"
      width="100px">
    </el-table-column>
    <el-table-column
      prop="bPrice"
      label="Price"
      width="90px">
    </el-table-column>
    <el-table-column
      prop="inUsed"
      label="inUsed"
      width="90px">
    </el-table-column>
    <el-table-column
      prop="jd"
      label="jd"
      width="90px">
    </el-table-column>
    <el-table-column
      prop="wd"
      label="wd"
      width="90px">
    </el-table-column>
    <el-table-column
      prop="location"
      label="位置"
      width="170px">
    </el-table-column>
    <el-table-column
      prop="parkName"
      label="parkName"
      width="120px">
    </el-table-column>
    <el-table-column
      prop="vPrice"
      label="vPrice"
      width="95px">
    </el-table-column>
    <el-table-column
      prop="stratage"
      label="stratage"
      width="90px">
    </el-table-column>
    <el-table-column
      prop="volume"
      label="volume"
      width="90px">
    </el-table-column>
    <el-table-column
      prop="yPrice"
      label="yPrice"
      width="90px">
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
        <el-form-item label="parkName" prop="parkName">
          <el-input v-model="addForm.parkName"></el-input>
        </el-form-item>
        <el-form-item label="bPrice" prop="bPrice">
          <el-input v-model="addForm.bPrice"></el-input>
        </el-form-item>
        <el-form-item label="yPrice" prop="yPrice">
          <el-input v-model="addForm.yPrice"></el-input>
        </el-form-item>
        <el-form-item label="vPrice" prop="vPrice">
          <el-input v-model="addForm.vPrice"></el-input>
        </el-form-item>
        <el-form-item label="volume" prop="volume">
          <el-input v-model="addForm.volume"></el-input>
        </el-form-item>
        <el-form-item label="location" prop="location">
          <el-input v-model="addForm.location"></el-input>
        </el-form-item>
        <el-form-item label="jd" prop="jd">
          <el-input v-model="addForm.jd"></el-input>
        </el-form-item>
        <el-form-item label="wd" prop="wd">
          <el-input v-model="addForm.wd"></el-input>
        </el-form-item>
        <el-form-item label="id" prop="id">
          <el-input v-model="addForm.flowId"></el-input>
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
        <el-form-item label="parkName" prop="parkName">
          <el-input v-model="editForm.parkName"></el-input>
        </el-form-item>
        <el-form-item label="bPrice" prop="bPrice">
          <el-input v-model="editForm.bPrice"></el-input>
        </el-form-item>
        <el-form-item label="yPrice" prop="yPrice">
          <el-input v-model="editForm.yPrice"></el-input>
        </el-form-item>
        <el-form-item label="vPrice" prop="vPrice">
          <el-input v-model="editForm.vPrice"></el-input>
        </el-form-item>
        <el-form-item label="volume" prop="volume">
          <el-input v-model="editForm.volume"></el-input>
        </el-form-item>
        <el-form-item label="location" prop="location">
          <el-input v-model="editForm.location"></el-input>
        </el-form-item>
        <el-form-item label="jd" prop="jd">
          <el-input v-model="editForm.jd"></el-input>
        </el-form-item>
        <el-form-item label="wd" prop="wd">
          <el-input v-model="editForm.wd"></el-input>
        </el-form-item>
        <el-form-item label="id" prop="id">
          <el-input v-model="editForm.flowId"></el-input>
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
import { findAllUser,findUser,addUser,deleteUser,batchDeleteUser,updateUser,findPark,addPark,deletePark,updatePark} from '@/api/user'
import axios from 'axios'
  export default {
     data() {
      return {
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
        list:[],
        editList:[],
        thedata:{
          isSuperUser:0,
        },
        idSearch:'',
        batchId:''
      }
    },
    created(){
      this.getList()
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex%2 === 1) {
          return 'success-row';
        } 
        return '';
      },
      //查询停车场
      getList(){
        findPark().then(resp=>{
          console.log(resp)
          this.list=resp.data
        })
      },
      //跳转到车位的页面
      getParkinfo(row){
        console.log(row.flowId)
        this.$router.push({name:'ParkInfoTable',query:{id:row.flowId}})
      },
      // 提交表单的验证,添加停车场
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addPark(
              this.addForm
            ).then(resp=>{
              if(resp.code===200){
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
          deletePark(id).then(resp=>{
            if(resp.code===200){
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
        updatePark(
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