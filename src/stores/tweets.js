import { defineStore } from "pinia";

export const useTweetsStore  = defineStore('tweets', {

    state: () => ({

        tweets: [],

        tweet: {},

    }),

    getters: {

        getTweets: (state) => state.tweets,

        getTweet: (state) => state.tweet,

    },

    actions: {

        setTweets(tweets) {

            this.tweets = tweets;

        },

        setTweet(tweet) {

            this.tweet = tweet;

        },
        
      
    },

    persist: true,  

});