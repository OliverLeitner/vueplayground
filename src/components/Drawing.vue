<template>
  <div class="drawingcomponent">
    <canvas
      ref="moveContainer"
      width="640"
      height="480"
      v-on:mousemove="onMouseOver($event)"
    ></canvas>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  name: "DrawingComponent",
})
export default class DrawingComponent extends Vue {
  // mouse position
  onMouseOver(event) {
    var rect = (<HTMLCanvasElement>(
      this.$refs.moveContainer
    )).getBoundingClientRect();

    this.drawCoordinates(event.clientX - rect.left, event.clientY - rect.top);
  }

  // draw to canvas
  // this is where three will be implemented
  drawCoordinates(x, y) {
    var pointSize = 3; // Change according to the size of the point.
    var ctx = (<HTMLCanvasElement>this.$refs.moveContainer).getContext("2d"); // document.getElementById("canvas").getContext("2d");

    ctx.fillStyle = "#ff2626"; // Red color

    ctx.beginPath(); //Start path
    ctx.arc(x, y, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
    ctx.fill(); // Close the path and fill.
  }
}
</script>
<style scoped lang="less">
.drawingcomponent {
  width: 100%;
  canvas {
    display: block;
    border: 2px solid red;
    margin: auto;
  }
}
</style>