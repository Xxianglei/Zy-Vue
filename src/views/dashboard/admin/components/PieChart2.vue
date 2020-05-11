<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import resize from './mixins/resize'
  import { getParkUseCount } from '@/api/count'

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
        chart: null
      }
    },
    created(){
    	this.getNumber()
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      })
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
            data: ['剩余量', '使用量']
          },
          series: [
            {
              name: '当天停车位使用情况',
              type: 'pie',
              roseType: 'radius',
              radius: [15, 95],
              center: ['50%', '45%'],
              data: [
              ],
              animationEasing: 'cubicInOut',
              animationDuration: 2600
            }
          ]
        })
      },
      getNumber(){
      	getParkUseCount().then(resp=>{
      		console.log(resp)
      		var getData=[];
      		getData.push({value:resp.data.noInUseCount,name:'剩余量'})
      		getData.push({value:resp.data.inUseCount,name:'使用量'})
      		
	        this.chart.setOption({
	  				series:[{
							data:getData
	  				}]
	  			})
	      		
      		
      	})
      }
    }
  }
</script>
