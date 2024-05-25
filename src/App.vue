<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import login from './components/login.vue';

export default {
  name: 'App',
  components: {
    login,
    RouterView
  },
  created(){
    // localStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("userMsg"))));
  },
  // watch:{

  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  color: #2c3e50;
}
</style>
