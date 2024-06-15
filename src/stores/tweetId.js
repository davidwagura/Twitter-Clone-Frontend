import { defineStore } from "pinia";

export const useTweetIdStore  = defineStore('tweetId', {

    state: () => ({

        tweetId: null,

    }),

    actions: {

        setTweetId(tweetId) {

            this.tweetId = tweetId;

        }

    }

});