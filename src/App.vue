<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/canvas">Canvas</router-link> |
    <router-link to="/drawing">Drawing</router-link> |
    <router-link to="/anime">Anime</router-link> |
    <router-link to="/elisa">Eliza</router-link> |
    <router-link to="/grid">Grid</router-link> |
    <router-link to="/interact">Interactive</router-link> |
    <router-link to="/test">Testing</router-link>
  </div>
  <router-view/>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
