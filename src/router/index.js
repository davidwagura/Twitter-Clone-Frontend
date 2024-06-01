import {createRouter, createWebHistory} from 'vue-router'

import HomePage from '../components/Pages/HomePage.vue'

import RegisterPage from '../components/Auth/RegisterPage.vue'

import LoginPage from '../components/Auth/LoginPage.vue'

import CommentsPage from '../components/Pages/Tweet/CommentsPage.vue'

const routes = 
[
    { path: '/', redirect: '/home'},

    { path:'/home',   component:HomePage, meta: { requiresAuth: true } },

    { path: '/register', component: RegisterPage, meta: { requiresAuth: false } },

    { path: '/login', component: LoginPage, meta: { requiresAuth: false } },

    { path: '/comments/:id', component: CommentsPage },
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