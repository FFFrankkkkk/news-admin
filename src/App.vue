<template>
  <div id="app">
   <head-page @go_home="gohome"></head-page>
    <router-view/>
    <tail-page></tail-page>
  </div>
</template>

<script>
  import headPage from './components/headPage.vue'
  import tailPage from './components/tailPage.vue'
export default {
  name: 'App',
  components: {
    headPage,
    tailPage
  },
  methods:{
    gohome(data){//触发子组件
      this.$router.push({ path: '/' });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
