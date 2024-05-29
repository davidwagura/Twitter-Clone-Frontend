import {createRouter, createWebHistory} from 'vue-router'

import HomePage from '../components/Pages/HomePage.vue'

import FollowingPage from '../components/Pages/ChildHome/FollowingPage.vue'

import ForYouPage from '../components/Pages/ChildHome/ForYouPage.vue'

const routes = 
[

    {path:'/',   component:HomePage},

    {path:'/following',   component:FollowingPage},

    {path:'/for you',   component:ForYouPage},

]

const router = createRouter({

    history: createWebHistory(),

    routes,

});

export default router;