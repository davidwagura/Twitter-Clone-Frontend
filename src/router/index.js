import {createRouter, createWebHistory} from 'vue-router'

import HomePage from '../components/Pages/HomePage.vue'

import RegisterPage from '../components/Auth/RegisterPage.vue'

import LoginPage from '../components/Auth/LoginPage.vue'

import CommentsPage from '../components/Pages/Tweet/CommentsPage.vue'

import TweetPage from '../components/Pages/Tweet/TweetPage.vue'

import NotificationsPage from '@/components/Pages/notifications/NotificationsPage'

import ProfilePage from '@/components/Pages/profile/ProfilePage.vue'

import ConversationsPage from '@/components/messages/ConversationsPage.vue'

import CommentsRedirect from '@/components/Pages/Tweet/CommentsRedirect.vue'

import DisplayConversation from '@/components/messages/DisplayConversation'

import { useTweetIdStore } from '@/stores/tweetId'


const routes = [

    { 
        path:'/home',   
        
        component:HomePage, 
        
        meta: { requiresAuth: true },

        name: 'home', 

        children: [

        

        ]
    },


    { 
        path: '/:username/status/:id', 
        
        component: TweetPage ,

    
    },

    {

        path: '/notifications',

        component: NotificationsPage

    },

    {

        path: '/profile',

        component: ProfilePage

    },

    { 

        path:'/messages',   
        
        component: ConversationsPage, 

        
    },

    {

        path: '/messages/:id',

        component: DisplayConversation,

    },


    { 
        path: '/register',
    
        component: RegisterPage, 
        
        meta: { requiresAuth: false } 
    },

    { 
        path: '/login',
    
        component: LoginPage,
    
        meta: { requiresAuth: false } 

    },


    { 
        path: '/tweet/:id/comments', 
        
        component: CommentsPage 
    
    },

    { 
        path: '/comments/:id', 
        
        component: CommentsRedirect 
    
    },
    
];

const router = createRouter({

    history: createWebHistory(),

    routes,

});

router.beforeEach((to, from, next) => {

    
    const tokenStore = useTweetIdStore();

    const isAuthenticated = !!tokenStore.token;



    if(to.meta.requiresAuth && !isAuthenticated) {

        next('/login');
        
    }else {

        next();

    }

});

export default router;