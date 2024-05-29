import {createRouter, createWebHistory} from 'vue-router'

import HomePage from '../components/Pages/HomePage.vue'

import FollowingPage from '../components/Pages/ChildHome/FollowingPage.vue'

import ForYouPage from '../components/Pages/ChildHome/ForYouPage.vue'

import RegisterPage from '../components/Auth/RegisterPage.vue'

import LoginPage from '../components/Auth/LoginPage.vue'

const routes = 
[

    {
        path:'/home',   
        
        component:HomePage,

        children: [

            {path:'following',   component: FollowingPage},

            {path:'for-you',   component: ForYouPage},
        
        ],

    },

    {path: '/', component: RegisterPage},

    {path: '/login', component: LoginPage},

];

const router = createRouter({

    history: createWebHistory(),

    routes,

});

export default router;