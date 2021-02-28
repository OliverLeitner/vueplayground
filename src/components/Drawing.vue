<template>
  <div class="drawingcomponent" ref="drawingContainer">
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
// lets try this without three...

@Options({
  name: "DrawingComponent",
})
export default class DrawingComponent extends Vue {
  // initial container
  container: HTMLDivElement;

  // mouse position
  protected onMouseOver(event: MouseEvent): void {
    var rect = (<HTMLCanvasElement>(
      this.$refs.moveContainer
    )).getBoundingClientRect();

    // operate on the canvas
    // paintbrush thingy
    // this.drawCoordinates(event.clientX - rect.left, event.clientY - rect.top);
    // mouse jump on rects thingy
    this.drawRects(<HTMLCanvasElement>this.$refs.moveContainer)
  }

  // draw to canvas
  // this is where three will be implemented
  // three does bad with this
  protected drawCoordinates(x: number, y: number): void {
    var pointSize = 3; // Change according to the size of the point.
    var ctx = (<HTMLCanvasElement>this.$refs.moveContainer).getContext("2d");
    ctx.fillStyle = "#ff2626"; // Red color

    ctx.beginPath(); //Start path
    ctx.arc(x, y, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
    ctx.fill(); // Close the path and fill.
  }

  // working mouseover thingy
  // without three, it works perfectly
  protected drawRects(canvas) {
    var canvas = canvas, // <HTMLCanvasElement>this.$refs.moveContainer,
      context = canvas.getContext("2d"),
      rects = [
        // rect one
        {
          x: 20,
          y: 10,
          w: 50,
          h: 50,
        },
        // rect two
        {
          x: 200,
          y: 10,
          w: 50,
          h: 50,
        },
      ],
      i = 0,
      r;

    while ((r = rects[i++])) context.rect(r.x, r.y, r.w, r.h);
    context.fillStyle = "blue";
    context.fill();

    canvas.onmousemove = function (e) {
      var rect = canvas.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top,
        i = 0,
        r;

      context.clearRect(0, 0, canvas.width, canvas.height);

      while ((r = rects[i++])) {
        context.beginPath();
        context.rect(r.x, r.y, r.w, r.h);
        context.fillStyle = context.isPointInPath(x, y) ? "blue" : "yellow";
        context.fill();
      }
    };
  }

  mounted() {
    // initial set
    this.drawRects(<HTMLCanvasElement>this.$refs.moveContainer)
  }
}
</script>

<style scoped lang="less">
.drawingcomponent {
  width: 100%;
  canvas {
    border: 2px solid red;
  }
}
</style>