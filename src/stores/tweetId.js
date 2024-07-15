import { defineStore } from "pinia";

export const useTweetIdStore  = defineStore('tweetId', {

    state: () => ({

        tweetId: null,

        followingTweetId: null,

        followingUsername: null,

        token: null,

        userId: null,

        username: null,

        user: {},

    }),

    getters: {

        getTweetId: (state) => state.tweetId,

        getFollowingTweetId: (state) => state.followingTweetId,

        getFollowingUsername: (state) => state.followingUsername,

        getToken: (state) => state.token,

        getUserId: (state) => state.userId,

        getUsername: (state) => state.username,

        getUser: (state) => state.user,

    },

    actions: {

        setTweetId(tweetId) {

            this.tweetId = tweetId;

        },

        clearTweetId() {

            this.tweetId = null;
      
        },

        setFollowingTweetId(followingTweetId) {

            this.followingTweetId = followingTweetId;

        },

        setFollowingUsername(followingUsername) {

            this.followingUsername = followingUsername;

        },

        setToken(token) {

            this.token = token;
      
        },
      
        setUserId(userId) {

            this.userId = userId;
      
        },
        
        setUsername(username) {

            this.username = username;
      
        },
      
        setUser(user) {

            this.user = user;
            
        }
      
    },

    persist: true,  

});