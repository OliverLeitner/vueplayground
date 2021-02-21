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