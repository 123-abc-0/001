import * as Vue from 'vue'
import { createRouter,createWebHistory } from "vue-router";
import home from '../components/home.vue'
import first from '../components/first.vue'
// import form from '../components/form.vue'


const routes = [
    {
        path:'/',
        name:'home',
        component:home 
    },
    {
        path:'/first',
        name:'first',
        // component:() => import('../components/first.vue')
        component:first
    },
    // {
    //     path:'/form',
    //     name:'form',
    //     component:form
    // },
]

const router = createRouter({
    history: createWebHistory('/'),
     routes
})

export default router;