<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <RenderCanvas />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import RenderCanvas from '@/components/RenderCanvas.vue' // @ is an alias to /src

@Options({
  name: 'RenderCanvasView',
  components: {
    RenderCanvas
  },
})
export default class AboutView extends Vue {}
</script>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>