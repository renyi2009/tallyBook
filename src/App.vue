<template>
  <div id="app">
    <router-view></router-view>
  </div>

</template>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helpers.scss";
body{
  line-height: 1.5;
  font-family: $font-hei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 16px;
  background: #f5f5f5;
}

</style>
