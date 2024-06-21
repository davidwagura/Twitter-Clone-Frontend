import { defineStore } from "pinia";

export const useTweetsStore  = defineStore('tweets', {

    state: () => ({

        tweets: [],

    }),

    getters: {

        getTweets: (state) => state.tweets,

    },

    actions: {

        setTweets(tweets) {

            this.tweets = tweets;

        },

        clearTweets() {

            this.tweets = [];
      
        },
      
    },

    persist: true,  

});