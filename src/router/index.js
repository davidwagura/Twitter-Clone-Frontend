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
        
        meta: { requiresAuth: true }

    },

    { path: '/', component: RegisterPage, meta: { requiresAuth: false } },

    { path: '/login', component: LoginPage, meta: { requiresAuth: false } },

];

const router = createRouter({

    history: createWebHistory(),

    routes,

});

router.beforeEach((to, from, next) => {

    const isAuthenticated = !!localStorage.getItem('token');

    if(to.meta.requiresAuth && !isAuthenticated) {

        next('/login');
        
    }else {

        next();

    }

});

export default router;