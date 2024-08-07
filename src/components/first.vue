<template>
  <div>
    <div class="anniu">
      <button @click="goBack">返回</button>
       <div class="tianjia">
        <button @click="addLine('add')">添加</button>
        <button v-if="items && items.length>0 && items.filter(i=>i.selected).length >= 2" @click="gonext">下一步</button> 
      </div>
    </div>
    <br>
    <hr>
    <br>
    <div v-if="showAlert">
      <form @submit.prevent="onSubmit">
        <span>样本名称：<input v-model="newItem" placeholder="添加样本名称" ></span>
        <span v-if="formError" style="color: red;">请填写样本名称</span>
        <div class="tianjia">
          <button @click="showAlert = false">X</button>
        </div>
        <br><br>
        <hr>
        <span>样本详情：</span>
        <br>
        <span>成本（美元/公斤）</span>
        <!-- 循环整个滑块按钮和内容 -->
        <div class="group" v-if="actionFlag === 'add'">
          <div v-for="(sj, index) in sjs" :key="index">
            <span>{{ sj.label }}</span>
            <br>
            <input v-model="sj.value" type="range" :min="0" :max="10" /> &nbsp; &nbsp;
            <button   type="button"   @click="addvalue(index)">-</button> &nbsp; 
            {{ sj.value }}   &nbsp;
            <button  type="button" @click="subtractionvalue(index)">+</button>
          </div>
          <br>
          <div class="tianjia">
            
            <button @click="addItem">添加</button>
            
          </div>
        </div>
        
      </form>
    </div>
    <p class="t">我的列表</p>
    <div v-if="items && items.length>0 && items.length < 2" class="error-message">注意：请至少添加并选择2项才能下一步！</div> 
    <br>
    <!-- 下面是列表的显示 -->
    <div>
      <ul>
        <!-- <li v-for="(item, idx) in items" :key="idx" @click="handleClick(idx)" :class="{'selected':selected.includes(idx)}"> -->
        <li v-for="(item, idx) in items" :key="idx" @click="handleClick(idx)" :class="{'selected':item.selected}">
          {{ item.name }}
          <div class="list">
            <button @click="editItem(idx,'edit')">编辑</button>
            <!-- <button @click="deleteItem(index)" v-if="selected.includes(idx)"   @click.stop="remove(idx)">删除</button> -->
            <button @click.stop="remove(idx)" >删除</button>
           
          </div>
        </li>
      </ul>
    </div>

    <!-- <div class="group" v-if="actionFlag === 'edit'">
      <div v-for="(sj, index) in items[0].arr" :key="index">
        <span>{{ sj.label }}</span>
        <br>
        <input v-model="sj.value" type="range" :min="0" :max="10" /> &nbsp; &nbsp;
        <button   type="button"   @click="addvalue(index)">-</button> &nbsp; 
        {{ sj.value }}   &nbsp;
        <button  type="button" @click="subtractionvalue(index)">+</button>
      </div>
      <br>
      <div class="tianjia">
        
        <button @click="addItem">添加</button>
        
      </div>
    </div> -->
    <div v-if="items && items.length > 0" class="selected-count">
      您选择了 {{ items.filter(i=>i.selected).length }} 项
    </div>
  </div>
</template>

<script>
// import useCounterStore  from './store'
// import { RouterLink } from 'vue-router';
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  data() {
    return {
      items: [],
      showAlert: false,
      newItem: '',
      sjs: [],
      formError:false,
      selected:[],
      actionFlag:'',
      labels:["青草味", "水果味", "酸味", "烘焙味", "香料味", "坚果/可可味", "甜味", "余味", "香气", "醇厚度", "苦味"]
    };
  },
  computed:{
    // ...mapState(['items','sjs']),
  },
  methods: {
    // ...mapActions(['addItem', 'updateItem', 'removeItem', 'setSjs']),
     //需要接收编辑页传回来的新数据
     loadDataFromLocalStorage(){
      const storedData = localStorage.getItem('newdata');
      if (storedData) {
        this.items = JSON.parse(storedData);
      }
    },
    // const newdata = JSON.parse(localStorage.getItem('newdata'))
    // return newdata
    addLine(flag){
      this.showAlert = true
      this.actionFlag = flag
      this.sjs = []
      // 调取数据
      for (let i = 0; i < this.labels.length; i++) {
        this.sjs.push({
          label: this.labels[i],           //渲染列表数据
          value: 5        // 默认为5
        });
      }
    console.log('addLine',this.sjs)
    },
    addItem() {
      console.log('addItem', this.newItem)
      if (this.newItem && this.newItem.trim()) {
        this.items.push({ name: this.newItem.trim(),arr:this.sjs , selected:false , });
        this.newItem = '';
        this.showAlert = false;  // 隐藏表单
        this.items.forEach((itm,idx)=>{
          itm.index = idx
        })
        localStorage.setItem('items',JSON.stringify(this.items))
      }else{
        this.formError = true;
      }
      console.log('addItem',this.items, this.actionFlag)
    //   if (this.newItem.trim()) {
    //   const newItemData = {
    //     name: this.newItem.trim(),
    //     values: this.sjs.map(sj => sj.value)
    //   };
    //   this.addItem(newItemData); // 使用 Vuex action 添加新项
    //   this.newItem = ''; // 清空输入框
    //   this.showAlert = false; // 隐藏表单
    // } else {
    //   this.formError = true;
    // }
    },
    editItem(index, flag) {
      //  this.$router.push(`/form?index=${index}`);   // '/form?index='+index
       this.$router.push(`/form`);   // '/form?index='+index
       //给编辑页面发送数据
       this.actionFlag = flag
       console.log('editItem',index, this.items, this.actionFlag, '--',this.items[index])
       localStorage.setItem('currentItem', JSON.stringify(this.items[index]))
      // this.$router.push({
      //   name: 'form',
      //   params: { index },
      // });
      
    },
    // deleteItem(index) {
    //   console.log('deleteItem', index)
    //   this.items.splice(index, 1);
    //   // this.removeItem(index);
    //   this.selected = this.selected.filter(i => i !== index);
    // },
    remove(index){
      //第一种方式
      this.items.splice(index, 1);
      //第二种方式
      // var items = [];
      // for(var j = 0; j < this.items.length; j++){
      // if(j !== index){
      // items.push(this.items[j]);
      //   }
      // }
      // this.items=items
      //第三种方式
      // var items = this.items.filter(function(item, i){
      //   console.log('item',item, index)
      // return index !== i;
      // });
      console.log('remove', this.items)
      localStorage.setItem('items', JSON.stringify(this.items))
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
    },
    //需要给图标页面发送数据
    handleClick(idx){
      this.items[idx].selected = !this.items[idx].selected;
      // console.log('11111',item.idx)
      // localStorage.setItem('newdata',JSON.stringify(this.storedData))
      localStorage.setItem('map', JSON.stringify(this.items))
    },
    gonext() {  
      this.$router.push('/next');  
    },  
    created() {
    // this.loadDataFromLocalStorage();
  },
  },
  // 数据列表
  mounted() {
    this.items=JSON.parse(localStorage.getItem('items')) || []
    console.log('mounted()',this.items)
        // 调取数据
    for (let i = 0; i < this.labels.length; i++) {
      this.sjs.push({
        label: this.labels[i],           //渲染列表数据
        value: 5,        // 默认为5
      });
    }
  },
  components: {
    
  }
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
  width: 100%;
}

li{
  list-style: none;

}
input{
  border: 0;   /* 去除未选中状态边框 */
  outline: none;  /* 去除选中状态边框 */
  background-color: rgba(0, 0, 0, 0);/* 透明背景 */
  width: 50%;
}
.list{
  text-align: right;
  
}
.t{
  text-align: center;
}
.error-message {  
  color: rgb(99, 97, 97); /* 错误消息的颜色 */  
} 
.selected{
  background-color: #f0f0f0; /* 选中背景色 */  
  color: #000; /* 选中文字色 */  
} 
.selected-count {
  color: rgb(121, 121, 168); /* 已选择项数的颜色 */
}
</style>