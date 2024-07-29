<template>
   
   <div class="common-layout">
<!--    
        <div><h3>AI-Powered</h3></div>
        <div class="bold-text">BLEND</div>
        <div class="bold-text">BUDDY</div>
        <p>欢迎来到咖啡人工智能拼配</p>
            <div class="content">
              <p><img src="/public/1.jpg"></p>
            </div> -->
    
        <!-- <br><br><br><br><br><br><br><br> -->
        <!-- <router-link to="/first">Start new blend</router-link> -->
        <a href="/first">Start new blend</a>
    </div>
</template>



<script>



</script>

<!-- 样式 -->
<style scoped>
/* .bold-text {
  font-weight: bold;
  font-size: 30px
} */
p{
  font-size: 25px;
}
div.common-layout{
  text-align: center;
  background-image: url(/public/2.jpg);
  /* 一张不重复 */
  background-repeat: no-repeat;
  width: 430px;
  height: 900px;
  /* 居中 */
  background-position: center;
  /* 充满整页 */
  background-size: contain;
}
a{
  text-decoration: underline;
  line-height: 820px;
}

/* .content{
  text-align: left;
} */

</style>
