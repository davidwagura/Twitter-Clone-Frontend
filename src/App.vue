<template>

  <div id="app">
    
    <router-view />

    <nav-page/>

  </div>
  
</template>

<script>
import NavPageVue from "./components/Navigation Page/NavPage.vue";

export default {

  name: 'App',

  components: {

  NavPage: NavPageVue

  }

}
</script>