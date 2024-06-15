import { defineStore } from 'pinia';

export const useUserIdStore = defineStore('userId', {

  state: () => ({

    userId: null,

  }),

  actions: {

    setUserId(userId) {

      this.userId = userId;

    }

  }

});