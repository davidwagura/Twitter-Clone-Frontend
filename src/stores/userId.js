import { defineStore } from 'pinia';

export const useUserIdStore = defineStore('userId', {

  state: () => ({

    userId: null,

  }),

  getters: {

    getUserId: (state) => state.userId,

  },

  actions: {

    setUserId(userId) {

      this.userId = userId;

    },

  },
  
});
