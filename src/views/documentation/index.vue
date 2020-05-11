<template>
  <div>
    <iframe src="http://106.54.75.24:9999/#/wallboard" id="mobsf" frameborder="0" scrolling="auto"></iframe>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    mounted() {
      /**
       * iframe-宽高自适应显示
       */
      function changeMobsfIframe() {
        const mobsf = document.getElementById('mobsf')
        const deviceWidth = document.body.clientWidth
        const deviceHeight = document.body.clientHeight
        mobsf.style.width = (Number(deviceWidth) - 50) + 'px' //数字是页面布局宽度差值
        mobsf.style.height = (Number(deviceHeight) - 80) + 'px' //数字是页面布局高度差
      }

      changeMobsfIframe()

      window.onresize = function() {
        changeMobsfIframe()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .documentation-container {
    margin: 50px;
    display: flex;
    flex-wrap: wrap;

    .document-btn {
      margin-left: 50px;
      display: block;
      cursor: pointer;
      background: black;
      color: white;
      height: 60px;
      width: 200px;
      margin-bottom: 16px;
      line-height: 60px;
      font-size: 20px;
      text-align: center;
    }
  }
</style>
