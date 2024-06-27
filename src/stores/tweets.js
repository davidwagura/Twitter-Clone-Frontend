import { defineStore } from "pinia";

export const useTweetsStore  = defineStore('tweets', {

    state: () => ({

        tweets: [],

        tweet: {},

        trends: [],

        notifications: [],

    }),

    getters: {

        getTweets: (state) => state.tweets,

        getTweet: (state) => state.tweet,

        getTrends: (state) => state.trends,

        getNotifications: (state) => state.notifications,

    },

    actions: {

        setTweets(tweets) {

            this.tweets = tweets;

        },

        setTweet(tweet) {

            this.tweet = tweet;

        },
        
        setTrends(trends) {

            this.trends = trends;
        },

        setNotifications(notifications) {

            this.notifications = notifications;

        },
      
    },

    persist: true,  

});