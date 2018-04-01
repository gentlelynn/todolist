<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <router-view/> -->
    <h1>计划列表</h1>
    <p>
      <router-link to="/tdwhat" class="btn">创建</router-link>
      <router-link to="/todolist" class="btn">列表</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
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
