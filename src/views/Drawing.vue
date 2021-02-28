<template>
  <div class="drawing">
    <h1>fun stuff with three.js</h1>
    <DrawingComponent />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DrawingComponent from "@/components/Drawing.vue";

@Options({
  name: "DrawingView",
  components: {
    DrawingComponent,
  },
  /*data() {
    return {
    }
  }*/
})
export default class DrawingView extends Vue {}
</script>