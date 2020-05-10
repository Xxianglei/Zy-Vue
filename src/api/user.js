import request from '@/utils/request'

// 登陆
export function login(data) {
  return request({
    url: 'http://106.54.75.24:8080/user/login.json',
    method: 'post',
    data
  })
}

// 退出
export function logout() {
  return request({
    url: 'http://106.54.75.24:8080/user/logout.json',
    method: 'post'
  })
}

// 获取用户信息
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

// 查询所有用户
export function findAllUser(data) {
  return request({
    url: '/apigateway/common/manager/findAllUser.json',
    method: 'post',
    data
  })
}

// 查询flowid对应的用户信息
export function findUser(data) {
  return request({
    url: '/apigateway/common/manager/findUser.json',
    method: 'post',
    data
  })
}

// 查询flowid对应的用户信息
export function findUserByName(data) {
  return request({
    url: '/apigateway/common/manager/findUserByName.json',
    method: 'post',
    data
  })
}

export function findUserByCondition(data) {
  return request({
    url: '/apigateway/common/manager/findUserByCondition.json',
    method: 'post',
    data
  })
}

// 添加人员
export function addUser(data) {
  return request({
    url: '/apigateway/common/manager/addUser.json',
    method: 'post',
    data
  })
}

// 按flowid删除人员信息
export function deleteUser(data) {
  return request({
    url: '/apigateway/common/manager/deleteUser.json',
    method: 'post',
    data
  })
}

// 批量删除
export function batchDeleteUser(data) {
  return request({
    url: '/apigateway/common/manager/batchDeleteUser.json',
    method: 'post',
    data
  })
}

// 修改用户信息
export function updateUser(data) {
  return request({
    url: '/apigateway/common/manager/updateUser.json',
    method: 'post',
    data
  })
}

// 查询订单
export function findOrder(data) {
	console.log(data)
  return request({
    url: '/apigateway/reserve/back/viewOrder.json?parkName=' + data,
    method: 'get'
  })
}

// 查询停车场
export function findPark() {
  return request({
    url: '/apigateway/parking/back/parkList.json',
    method: 'get'
  })
}

//新增停车场
export function addPark(data) {
  return request({
    url: '/apigateway/parking/back/addPark.json',
    method: 'post',
    data
  })
}

//删除停车场
export function deletePark(data) {
  console.log(data)
  return request({
    url: '/apigateway/parking/back/deletePark.json?flowId=' + data,
    method: 'get'
  })
}

//修改停车场
export function updatePark(data) {
  console.log(data)
  return request({
    url: '/apigateway/parking/back/updatePark.json',
    method: 'post',
    data
  })
}
export function findParksByName(data) {
  console.log(data)
  return request({
    url: '/apigateway/parking/back/getParksByName.json?parkName='+data,
    method: 'get'
  })
}

//停车位信息
export function getParkInfoList(data) {
  return request({
    url: '/apigateway/parking/back/getParkInfoList.json?flowId=' + data,
    method: 'get'
  })
}

//根据停车场id新增车位
export function addParkInfo(data) {
  return request({
    url: '/apigateway/parking/back/addParkInfo.json',
    method: 'post',
    data
  })
}

//根据车位id删除车位
export function deleteParkInfo(data) {
	console.log(data)
  return request({
    url: '/apigateway/parking/back/deleteParkInfo.json?parkInfoFlowId=' + data,
    method: 'get'
  })
}

//根据车位id修改车位大小
export function updateParkInfo(data) {
  return request({
    url: '/apigateway/parking/back/updateParkInfo.json',
    method: 'post',
    data
  })
}
