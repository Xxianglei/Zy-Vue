
// 车位信息
<template>
  <div class="app-container">
    <div class="filter-container">
    	<!--添加新的车位-->
      <el-button class="filter-item" 
        style="margin-left: 10px;" 
        type="primary" 
        icon="el-icon-circle-plus-outline" 
        @click="addParks">
        Add
      </el-button>
    </div>

    <el-table
    :data="list"
    style="width: 100%"
    :row-class-name="tableRowClassName">
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
        </template>
      </el-table-column>
    </el-table>

     <!-- 编辑的表单 -->
    <el-dialog title="修改用户资料" :visible.sync="dialogTableVisible"  width="500px" top="30px">
      <!-- 修改车位信息 -->
      <el-form :model="editForm" :rules="rules"  ref="editForm" label-width="100px" class="demo-addForm">
        <el-form-item label="width" prop="width">
          <el-input v-model="editForm.width"></el-input>
        </el-form-item>
        <el-form-item label="length" prop="length">
          <el-input v-model="editForm.length"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editParkInfo('editForm')">立即修改</el-button>
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

  import {getParkInfoList,addParkInfo,deleteParkInfo,updateParkInfo} from '@/api/user'

  import axios from 'axios'
  export default{
    data(){
      return{
        editForm :{
          length: '',
          width: '',
        },
        // 表单验证规则
        rules: {  
          length: [
            { required: true, message: '请输入长度', trigger: 'blur' },
          ],
          width:[
            { required: true, message: '请输入宽度'},
          ]
        },
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '80px',
        list:[],//表格的数据
      }

    },
    created(){
      this.getList()
    },
    methods:{
      tableRowClassName({row, rowIndex}) {
        if (rowIndex%2 === 1) {
          return 'success-row';
        } 
        return '';
      },
      // 获取数据
      getList(){
        getParkInfoList(this.$route.query.id).then(resp=>{
        	this.parkId=resp.data.parkId
        	this.list=resp.data
        })
      },
      //增加车位
      addParks(){
      	addParkInfo({"parkId":this.$route.query.id}).then(resp=>{
      		if(resp.code==200){
      			this.$message({
              message: '添加成功',
              type: 'success'
            });
      		}
      		this.getList()
      	})
      },
      // 提交表单的验证
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addParkInfo(
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
          deleteParkInfo(id).then(resp=>{
            if(resp.code===200){
            	this.getList()
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
      // 修改车位信息
      editParkInfo(){
        updateParkInfo(
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
     
     
    }
  }
</script>