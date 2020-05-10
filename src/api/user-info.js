// import axios from 'axios'

// export function findAllUser(data){
//     axios.post('http://106.54.75.24:10000/apigateway/common/manager/findAllUser.json',{
//       data
//     },
//     {
//       headers:{ tokens: `${localStorage.getItem('ACCESS_TOKEN')}`}
//     })
// }

import request from  '@/utils/request'

export function findAllUser(data) {
  return request({
    url: '/apigateway/common/manager/findAllUser.json',
    method: 'post',
    data
  })
}

export function findUser(data) {
  return request({
    url: '/apigateway/common/manager/findUser.json',
    method: 'post',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/apigateway/common/manager/addUser.json',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/apigateway/common/manager/deleteUser.json',
    method: 'post',
    data
  })
}

export function batchDeleteUser(data) {
  return request({
    url: '/apigateway/common/manager/batchDeleteUser.json',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/apigateway/common/manager/updateUser.json',
    method: 'post',
    data
  })
}