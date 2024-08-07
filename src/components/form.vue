<template>
    <div class="anniu">
        <h3>样本详情</h3>
        <button @click="goBack">返回</button>  
        <br><br>
    </div>

    <div>
        <form @submit.prevent="onSubmit">
          <span>样本名称：<input v-model="newItem" placeholder="添加样本名称"></span>
          <span v-if="formError" style="color: red;">请填写样本名称</span>
          <!-- <p>{{ $store.state.newItem }}</p> -->
          <br><br>
          <hr>
          <span>样本详情：</span>
          <br>
          <span>成本（美元/公斤）</span>
          <br>
          <!-- 循环整个滑块按钮和内容 -->
          <div class="group">
            <div v-for="(sj, index) in sjs" :key="index">
              <span>{{ sj.label }}</span>
              <br>
              <input v-model="sj.value" type="range" :min="0" :max="10" />
              <button  type="button" @click="addvalue(index)">-</button>
              {{ sj.value }}  
              <button type="button" @click="subtractionvalue(index)">+</button>
            </div>
            <br>
            <div class="tianjia">
                <br> <br> 
                <button @click="goBack">取消</button>   &nbsp; &nbsp;
                <button @click="addItem">确定</button>
            </div>
          </div>
        </form>
      </div>
      
    
  </template>
  
  <script>
  import { RouterLink } from 'vue-router';
  
  export default {
    data() {
      return {
        // items: [],
        newItem: '',
        sjs: [],
        formError:false,
        items:[],
        currentItem:{}
      };
    },
    methods: {
      //需要发送编辑后改变的数据
      addItem(){
          localStorage.removeItem('items');
          //定义一个大数组，存储全部的，保证可以找到准确的下标
          this.items.forEach((x,index)=>{
            if(x.index === this.currentItem.index){
              x.name = this.newItem
              x.arr = this.sjs
              x.index = this.currentItem.index
            }
          })
          localStorage.setItem('items',JSON.stringify(this.items));
          this.$router.push('/first');
      },
      goBack() {
        this.$router.go(-1);
      },
      onSubmit(event) {
        event.preventDefault(); // 阻止表单默认提交行为
        this.validateForm();
        if (!this.formError) {
          this.addItem(); // 提交时添加新项
        }
      },
      // 错误提示
      validateForm() {
        this.formError = !this.newItem.trim();
        if (this.formError) {
      setTimeout(() => {
        this.formError = false;
      }, 5000); // 5000毫秒 = 5秒
      }
      },
      // 加减方法
      addvalue(index) {
        const newValue = Math.max(this.sjs[index].value - 1, 0);
        this.sjs[index].value = newValue;
      },
      subtractionvalue(index) {
        const newValue = Math.min(this.sjs[index].value + 1, 10);
        this.sjs[index].value = newValue;
      }
    },
    created(){
      
    },
    // 数据列表
    mounted() {
      this.items=JSON.parse(localStorage.getItem('items')) || []
      //接收点击编辑的时候的数据
      this.currentItem = JSON.parse(localStorage.getItem('currentItem'))
      this.sjs = this.currentItem.arr
      this.newItem = this.currentItem.name
      console.log('mounted()',this.currentItem,'---',this.sjs )
    },
    components: {},
  };
  </script>
  <style scoped>
  div.tianjia{
    display: inline;
    float: right;
  }
  .group{
    background-color: #f8f9fa;
    border-radius: 10px;
  }
  li{
    list-style: none;
  }
  input{
    border: 0;   /* 去除未选中状态边框 */
    outline: none;  /* 去除选中状态边框 */
    background-color: rgba(0, 0, 0, 0);/* 透明背景 */
  }
 
  .anniu h3{
    text-align: center;
  }
  </style>