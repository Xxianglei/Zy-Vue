<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { getParkTop10 } from '@/api/count'

const animationDuration = 6000

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
  	getNumber(){
  		getParkTop10().then(resp=>{
				console.log(resp)
				var getData=[];
				var getNums=[];
				for (var i = 0; i < resp.data.length; i++) {
			    getData.push(resp.data[i].parkName)
			    getNums.push(resp.data[i].nums)
				}
			 this.chart.setOption({
  				xAxis:[{
						data:getData
  				}],
  				series:[{
  					data:getNums
  				}]
  				
  			})
  			
  		})
  	},
    initChart() {
  		this.chart = echarts.init(this.$el, 'macarons')
  		 this.chart.setOption({
  		 	 color: ['#3398DB'],
			    tooltip: {
			        trigger: 'axis',
			        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
			            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        }
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis: [
			        {
			            type: 'category',
			            data: [],
			            axisTick: {
			                alignWithLabel: true
			            }
			        }
			    ],
			    yAxis: [
			        {
			            type: 'value'
			        }
			    ],
			    series: [
			        {
			            name: '销量',
			            type: 'bar',
			            barWidth: '60%',
			            data: []
			        }
			    ]
  		 })
    	
      
	      
    }
  }
}
</script>
