import request from '@/utils/request'

// 最上面的一行统计数据
export function dashboard() {
  return request({
    url: '/apigateway/statistics/back/dashboard.json',
    method: 'get'
  })
}
// 男女会员非会员斌饼状图
export function getPieChart() {
  return request({
    url: '/apigateway/statistics/back/getPieChart.json',
    method: 'get'
  })
}

//销量前世的饿停车场柱状图
export function getParkTop10() {
  return request({
    url: '/apigateway/statistics/back/getParkTop10.json',
    method: 'get'
  })
}

//当天使用中/总量饼状图
export function getParkUseCount() {
  return request({
    url: '/apigateway/statistics/back/getParkUseCount.json',
    method: 'get'
  })
}

//各时段下单量，折线图
export function getOrderNumsEveryHour() {
  return request({
    url: '/apigateway/statistics/back/getOrderNumsEveryHour.json',
    method: 'get'
  })
}

//最近十天男女/总量折线/柱状图
export function getLast10DayOrderNums() {
  return request({
    url: '/apigateway/statistics/back/getLast10DayOrderNums.json',
    method: 'get'
  })
}
