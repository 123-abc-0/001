//vue2写法
// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// const state={
//     title:{
//         newItem:''
//     }
// }
// //获取
// const getters={
//     getTitle(state){
//         return state.title
//     }
// }
// //修改state的值，同步
// const mutations={
//     updateTitle(state,title){
//         state.title=title;
//     }
// }
// //异步
// const actions={
//     asyncUpdateTitle(context,title){
//         context.commit('updateTitle',title)
//     }
// }




import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
  },
})

