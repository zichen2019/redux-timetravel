<template>
  <div id="app">
    <router-view/>
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
  /* text-align: center; */
  color: #2c3e50;
}

.weui-toast.vux-toast-bottom {
  bottom: 80px !important;
  width: 50vw !important;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  background: #f5f5f5;
}

p {
  margin: 0;
  padding: 0;
}
</style>
