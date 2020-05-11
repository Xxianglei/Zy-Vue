/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  hidden:true,
  redirect: '/table/complex-table',
  meta: {
  },
  children: [
 {
      path: 'parkInfo-table',
      component: () => import('@/views/table/parkInfo-table'),
      name: 'ParkInfoTable',
      meta: { title: '车位信息' }
    }
  ]
}
export default tableRouter
