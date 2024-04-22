import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/components/HomeView.vue'
import Stats from '@/components/Stats.vue'

const routes = [
    { 
        path: '/', 
        name: 'home',
        component: HomeView 
    },
    { 
        path: '/stats', 
        name: 'stats',
        component: Stats }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;