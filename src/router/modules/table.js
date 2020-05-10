/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/table/dynamic-table/index'),
      name: 'DynamicTable',
      meta: { title: '订单信息' }
    },
    {
      path: 'user-table',
      component: () => import('@/views/table/user-table'),
      name: 'UserTable',
      meta: { title: '用户信息' }
    },
    {
      path: 'park-table',
      component: () => import('@/views/table/park-table'),
      name: 'ParkTable',
      meta: { title: '停车场' }
    },
    {
      path: 'complex-table',
      component: () => import('@/views/table/complex-table'),
      name: 'ComplexTable',
      meta: { title: '停车场计费' }
    },{
      path: 'parkInfo-table',
      component: () => import('@/views/table/parkInfo-table'),
      name: 'ParkInfoTable',
      meta: { title: '停车位' }
    }
  ]
}
export default tableRouter
