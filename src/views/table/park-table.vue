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
                 @click="dialogFormVisible= true">
        新增停车场
      </el-button>
      <!-- </template> -->
    </div>

    <el-table
      :data="list"
      style="width: 100%"
      height="510"
      :default-sort="{prop: 'parkNo', order: 'descending'}"
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
        sortable
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
        sortable
        width="140px">
      </el-table-column>
      <el-table-column
        prop="yPrice"
        label="夜间价格"
        sortable
        width="140px">
      </el-table-column>
      <el-table-column
        prop="vPrice"
        label="会员折扣"
        sortable
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
          <el-button type="primary" @click="dialogMapVisible= true,dialogFormVisible=false">打开地图</el-button>
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
          <el-input v-model="editForm.location" id="location"></el-input>
        </el-form-item>
        <el-form-item label="经度" prop="jd">
          <el-input v-model="editForm.jd" id="jd"></el-input>
        </el-form-item>
        <el-form-item label="纬度" prop="wd">
          <el-input v-model="editForm.wd" id="wd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogMapVisible= true,dialogTableVisible=false">打开地图</el-button>
          <el-button type="primary" @click="editPark('editForm')">立即修改</el-button>
          <el-button @click="cancelButton('editForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑的表单 -->
    <el-dialog title="停车场地址设置" :visible.sync="dialogMapVisible" width="800px" top="0px" id="mapDialog"
               :close-on-click-modal="false">
      <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler"
                 :scroll-wheel-zoom="true"
                 @click="clickEvent"
                 ak="tZBFWj3pOiWw4FcSjjsNSKAsPcpfh19V">
        <!--  //地图控件位置-->
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        <!--  //城市列表-->
        <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
        <!--  //定位当前位置-->
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"
                        @locationSuccess="getLoctionSuccess"></bm-geolocation>
        <!--   //地图容器-->
        <bm-view :style="{width:'100%',height: '575px',flex: 1,marginBottom:'-30px'}"></bm-view>
      </baidu-map>
      <div class="demo-input-suffix">
        <el-input class="lineinput" style="width:200px" size="mini" placeholder="经度"
                  v-model.number="locData.longitude"></el-input>
        <el-input class="lineinput" style="width:200px" size="mini" placeholder="纬度"
                  v-model.number="locData.latitude"></el-input>
        <el-input class="lineinput" style="width:200px" size="mini" placeholder="详细地址" name="address_detail"
                  v-model="locData.address" @input="findAddress(locData.address)"></el-input>
      </div>
      <div slot="footer" class="dialog-footer" style="margin-top: -25px">
        <el-button type="warning" size="small" icon="el-icon-close" @click="cancelMap">取消</el-button>
        <el-button type="primary" size="small" icon="el-icon-check" @click="setFormValue(locData.longitude,locData.latitude,locData.address)">保存</el-button>
      </div>
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
  import { BaiduMap, BmNavigation, BmView, BmGeolocation, BmCityList } from 'vue-baidu-map'
  import axios from 'axios'

  export default {
    name: 'mapDialog',
    components: {
      BaiduMap,
      BmNavigation,
      BmView,
      BmGeolocation,
      BmCityList
    },
    data() {
      return {
        myValue: '',
        address_detail: null, //详细地址
        userlocation: { lng: '', lat: '' },
        center: { lng: 104.06792346, lat: 30.67994285 },
        zoom: 12,
        mapVisible: false,
        locData: {
          longitude: '',
          latitude: '',
          address: ''
        },
        clientHeight: document.documentElement.clientHeight - 90, // 屏幕高度
        iconUrl: '../../../../public/local.png',
        addForm: {},
        editForm: {},
        mapForm: {},
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
        dialogMapVisible: false,
        formLabelWidth: '100px',
        list: [],
        parkName: ''
      }
    },
    created() {
      this.getList()
    },
    methods: {
      handler({ BMap, map }) {

        let _this = this	// 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
        var geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition(function(r) {
          console.log(r)
          _this.center = { lng: r.longitude, lat: r.latitude }		// 设置center属性值
          _this.autoLocationPoint = { lng: r.longitude, lat: r.latitude }		// 自定义覆盖物
          _this.initLocation = true
        }, { enableHighAccuracy: true })

        window.map = map
      },
      //点击地图监听
      clickEvent(e) {
        map.clearOverlays()
        var myMarker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat))
        map.addOverlay(myMarker)
        //用所定位的经纬度查找所在地省市街道等信息
        var point = new BMap.Point(e.point.lng, e.point.lat)
        var gc = new BMap.Geocoder()
        let _this = this
        gc.getLocation(point, function(rs) {
          var addComp = rs.addressComponents
          //console.log(rs.address);//地址信息
          _this.locData.address = rs.address
        })
        this.locData.longitude = e.point.lng
        this.locData.latitude = e.point.lat
      },
      //定位成功回调
      getLoctionSuccess(point, AddressComponent, marker) {
        map.clearOverlays()
        var myMarker = new BMap.Marker(new BMap.Point(point.point.lng, point.point.lat))
        map.addOverlay(myMarker)
        this.locData.longitude = point.point.lng
        this.locData.latitude = point.point.lat
      },
      setFormValue(lng,lat,addr) {
        this.$emit('findlocdata', this.locData)
        this.editForm.wd=lat;
        this.editForm.jd=lng;
        this.editForm.location=addr;
        this.mapNoShow()
      },
      mapNoShow() {
        this.mapVisible = false
        this.dialogMapVisible=false
        this.dialogTableVisible=true;
      },
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex % 2 === 1) {
          return 'success-row'
        }
        return ''
      },
      // 键盘点击事件
      findAddress(data) {
        this.address_detail = data
        var th = this
        map.clearOverlays()    //清除地图上所有覆盖物
        var local = new BMap.LocalSearch(map, { //智能搜索
          onSearchComplete: myFun
        })

        function myFun() {
          th.userlocation = local.getResults().getPoi(0).point    //获取第一个智能搜索的结果
          map.centerAndZoom(th.userlocation, 18)
          map.addOverlay(new BMap.Marker(th.userlocation))    //添加标注
        }

        local.search(data)
        //测试输出坐标（指的是输入框最后确定地点的经纬度）
        map.addEventListener('click', function(e) {
          this.locData.longitude = th.userlocation.lng
          this.locData.latitude = th.userlocation.lat
          //经度
          console.log(th.userlocation.lng)
          //维度
          console.log(th.userlocation.lat)
        })
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
            if (resp.code == 200) {
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
      },
      cancelMap() {
        this.dialogMapVisible=false,
        this.mapVisible = false,
          this.$message({
            type: 'info',
            message: '已取消'
          })
      }, formatVip(row, column) {
        var vip = row.vPrice
        vip = vip * 100
        return vip + '折'
      },
      SearchParksByName(parkName) {
        findParksByName(
          parkName
        ).then(resp => {
          console.log(resp)
          this.list = resp.data
        })
      }
    }, mounted() {
    }

  }

</script>
<style scoped>
  #allmap {
    width: 400px;
    height: 400px;
    font-family: "微软雅黑";
    border: 1px solid green;
  }
</style>
