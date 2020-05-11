<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'

require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { getPieChart } from '@/api/count'
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
//    manCount: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  created() {
    	this.getNumber()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['男性用户', '女性用户', '普通用户', '会员用户']
        },
        series: [
          {
            name: '使用用户比例图',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95], // 图表的大小
            center: ['50%', '45%', '30', '38'], // 图表的位置
            data: [

            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    },
    getNumber() {
  		getPieChart().then(resp => {

			 var getData = [];
				getData.push({value:resp.data.manCount,name:'男性用户'})
				getData.push({value:resp.data.noVipCount,name:'普通用户'})
				getData.push({value:resp.data.vipCount,name:'会员用户'})
				getData.push({value:resp.data.womanCount,name:'女性用户'})
			  
  			this.chart.setOption({
  				series:[{
						data:getData
  				}]
  			})
  		})
  	},
    	
    	
  }
}
</script>
