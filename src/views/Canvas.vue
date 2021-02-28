<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <h4>camera position</h4>
  x: <input type="number" v-model.number="camPosition.x" />&nbsp;
  y: <input type="number" v-model.number="camPosition.y" />&nbsp;
  z: <input type="number" v-model.number="camPosition.z" />
  <br />
  <br />
  <RenderCanvas :config="{camPosition: camPosition}" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import RenderCanvas from "@/components/RenderCanvas.vue"; // @ is an alias to /src

@Options({
  name: "RenderCanvasView",
  components: {
    RenderCanvas,
  },
  data() {
    // initial values
    return {
      camPosition: { x: 5, y: 5, z: 5 }
    }
  }
})
export default class CanvasView extends Vue {}
</script>