<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <h4>camera position</h4>
  x: <input type="number" v-model.number="camX" />&nbsp;
  y: <input type="number" v-model.number="camY" />&nbsp;
  z: <input type="number" v-model.number="camZ" />
  <br />
  <br />
  <RenderCanvas :camPosition="camPosition" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import RenderCanvas from "@/components/RenderCanvas.vue"; // @ is an alias to /src

@Options({
  name: "RenderCanvasView",
  components: {
    RenderCanvas,
  },
  watch: {
    camX: function (camX) {
      this.submitData(camX, this.camY, this.camZ)
    },
    camY: function (camY) {
      this.submitData(this.camX, camY, this.camZ)
    },
    camZ: function (camZ) {
      this.submitData(this.camX, this.camY, camZ)
    }
  },
  data() {
    // initial values
    return {
      camPosition: { x: 5, y: 5, z: 5 },
      camX: 5,
      camY: 5,
      camZ: 5
    }
  },
  methods: {
    submitData(x: number, y: number, z: number) {
      if (x && y && z) {
        this.camPosition.x = x
        this.camPosition.y = y
        this.camPosition.z = z
      }
    }
  },
})
export default class AboutView extends Vue {}
</script>