import { defineStore } from 'pinia';

export const useTokenStore = defineStore('token', {

  state: () => ({

    token: null,

  }),

  getters: {

    getToken: (state) => state.token,

  },

  actions: {

    setToken(token) {

      this.token = token;

    },

    clearToken() {

      this.token = null;

    },

  },

  persist: true,  
  
});
