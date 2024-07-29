<!-- <template>
  <div>
    <el-page-header @back="goBack">
      <template #content class="header2">
        <el-button plain @click="dialogFormVisible = true" >添加</el-button>
        <span class="text-large font-600 mr-3"> 样本 </span>
      
      </template>
    </el-page-header>
  </div>
  <div v-for="(item,index) in item">{{ item }}</div>
    <el-divider /><p>没有更多了</p>

    <el-dialog v-model="dialogFormVisible" title="样本详情" width="350">

        <div class="slider-demo-block">
        <span class="demonstration">样本名称：</span>
        <el-input v-model="input" style="width: 240px" placeholder="Please input"  required: true/>  
    
  </div>
    <el-divider />
    <div class="slider-demo-block">
        <span class="demonstration">成本（美元/公斤）</span>
    </div>
    <br>
    <div class="slider-demo-block">
        <span class="demonstration">青草/植物味</span>
      <el-slider v-model="defineVars" show-input max="10" />
    </div>

    <div class="slider-demo-block">
        <span class="demonstration">水果味</span>
      <el-slider v-model="defineVars" show-input max="10"/>
    </div>

    <div class="slider-demo-block">
        <span class="demonstration">酸味</span>
      <el-slider v-model="defineVars" show-input max="10"/>
    </div>

    <div class="slider-demo-block">
        <span class="demonstration">烘焙味</span>
      <el-slider v-model="defineVars" show-input max="10"/>
    </div>

    <div class="slider-demo-block">
        <span class="demonstration">香料味</span>
      <el-slider v-model="defineVars" show-input max="10"/>
    </div>

    <div class="slider-demo-block">
        <span class="demonstration">可可味</span>
      <el-slider v-model="defineVars" show-input max="10"/>
    </div>

    <div class="slider-demo-block">
        <span class="demonstration">甜味</span>
      <el-slider v-model="defineVars" show-input max="10"/>
    </div>

    <div class="slider-demo-block">
        <span class="demonstration">余味</span>
      <el-slider v-model="defineVars" show-input max="10"/>
    </div>

    <div class="slider-demo-block">
        <span class="demonstration">香气</span>
      <el-slider v-model="defineVars" show-input max="10"/>
    </div>

    <div class="slider-demo-block">
        <span class="demonstration">纯厚度</span>
      <el-slider v-model="defineVars" show-input max="10"/>
    </div>

    <div class="slider-demo-block">
        <span class="demonstration">苦味</span>
      <el-slider v-model="defineVars" show-input max="10"/>
    </div>
      

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </template>

  <script lang="ts">
  import { reactive, ref } from 'vue'

  
    const input = ref('')
    const goBack = () => {window.history.back();}
    const dialogFormVisible = ref(false)

    const defineVars = ()=>{
      const ref=(v)=>v;
      return Array.from({length:100}).map(()=>ref(0))
    }
    const values = defineVars
</script>
  

<style>
.app{
    text-align: center;
}
</style> -->
























<template>
  <div>
    <button @click="goack">返回</button>
    <br><br>
    <button @click="showAlert = true">添加</button>
    <hr>
    <!-- <p>没有更多了~</p> -->
    <div>
      <!-- <button @click="showAlert = true">添加</button> -->
      <div v-if="showAlert">
        <div class="t">
        <form @submit.prevent="onSubmit">
          <span>样本名称：<input v-model="newItem" placeholder="添加样本名称"></span>
          <button @click="showAlert = false">X</button>
          <br><br>
          <hr>
          <span>样本详情：</span>
          <br>
          <span>成本（美元/公斤）</span>
          <div>
            <p>香气：</p>
            <input v-model="message" type="range"  min="0" max="10"  />
            <button @click="sub" >-</button>
            {{ message }}
            <button @click="add">+</button>
          </div>
          
          <div>
            <p>苦味：</p>
            <input v-model="message1" type="range"  min="0" max="10"  />
            <button @click="sub" >-</button>
            {{ message1 }}
            <button @click="add">+</button>
          </div>
        
          <button @click="addItem">添加</button>
        </form>
        </div>
      </div>
    </div>
  </div>

    <div>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          {{ item.name }}
          <button @click="editItem(index)">编辑</button>
          <button @click="deleteItem(index)">删除</button>
        </li>
      </ul>
      <!-- <input v-model="newItem" placeholder="添加新条目">
      <button @click="addItem">添加</button> -->
    </div>


    <!-- <div class="t">
      <form @submit.pervent="onSubmit">
        <span>样本名称：<input v-model="newItem" placeholder="添加样本名称"></span>
        <br> <br>
        <hr>
        <span>样本详情：</span>
        <br>
        <span>成本（美元/公斤）</span>
        <div>
          <p>香气：</p>
         
	        <input v-model="message" type="range"  min="0" max="10" value="0" />
          <button @click="sub" >-</button>
          {{ message }}
			    <button @click="add">+</button>
        </div>
        
        <div>
          <p>苦味：</p>
          <p>{{ message1 }}</p>
	        <input v-model="message1" type="range"  min="0" max="10" value="0" />
        </div>
        

       
        
        <button @click="addItem">添加</button>
    
      </form>
    </div> -->


  </template>
   
  <script>
  import { reactive, ref } from "vue";
  // const message = ref('')
  export default {
    data() {
      return {
        items: [
          // {name: '苹果'},
          // {name: '苹果2'},
          // {name: '苹果3'},
          // {name: '苹果4'},
        ],
        message:'',
        message1:'',
        message2:'',
        message3:'',
        message4:'',
        message5:'',
        message6:'',
        message7:'',
        message8:'',
        message9:'',
        message10:'',
        showAlert: false,
        newItem: ''
      }
    },
    methods: {
      addItem() {
        if (this.newItem.trim()) {
          this.items.push({name:this.newItem.trim()});
          this.newItem = '';
        }
      },
      editItem(index) {
        console.log(`Editing item at index ${index}: ${this.items[index]}`); 
        this.items[index] = {name: '香蕉'} //编辑的input
      },
      deleteItem(index) {
        this.items.splice(index, 1);
      },
      goBack(){window.history.back();},
      add(){
					if (this.message) {
						this.message++;
					} 
				},
        sub(){
					if (this.message>0) {
						this.message--;
					} 
				},
    },
    components:{
      
    }
  }

  </script>

<style>


</style>