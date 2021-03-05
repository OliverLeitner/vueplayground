<template>
  <div class="dragmearound">
    <div class="dragMe" @mousemove="moveMe(position)" ref="dragItem">
      <p>drag me around</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import interact from "interactjs";
import { InteractEvent, Listeners } from "@interactjs/types";
import { Position } from "@/shared/models/position.model";

// TODO: externalize the subfuncts in listener...
/*export class Listeners implements ListenerMap {
  protected mainClass = new InterAct();
  public start(event: InteractEvent) {
    this.mainClass.startEvent(event as InteractEvent);
  }
  public move(event: InteractEvent) {
    this.mainClass.moveEvent(event as InteractEvent);
  }
}*/

@Options({
  name: "InterAct",
})
export default class InterAct extends Vue {
  position: Position = { x: 0, y: 0 };
  dragClassPrefix: string = "drag";
  dragElement: HTMLDivElement;
  dragClass: string;

  async mounted() {
    this.dragElement = <HTMLDivElement>this.$refs.dragItem;
    this.dragClass = <string>this.classByString();
  }

  // search for classname by prefix
  protected classByString(): string {
    let ret: string = "";
    // foreach ... could be slower than for... especially with stuff like tailwind...
    for (
      let idx: number = 0;
      idx < (<DOMTokenList>this.dragElement["classList"]).length;
      idx++
    ) {
      (<DOMTokenList>this.dragElement["classList"])[idx].includes(
        this.dragClassPrefix
      )
        ? (ret = (<DOMTokenList>this.dragElement["classList"])[idx])
        : "not-found";
      return ret; // lets combine leaving...
    }
  }

  // things to do when dragging starts
  public startEvent(event: InteractEvent): void {
    console.log(event.type, event.target);
  }

  // the actual process of dragging
  public moveEvent(event: InteractEvent): void {
    // get current pos
    this.position.x += event.dx;
    this.position.y += event.dy;

    // style the html element based on event pos
    event.target.style.transform = `translate(${this.position.x}px, 
      ${this.position.y}px)`;
  }

  // drag stuff...
  // TODO: simplify
  protected moveMe() {
    // local "link" to global obj
    const that = this;
    interact("." + that.dragClass).draggable({
      listeners: <Listeners>{
        start(event: InteractEvent) {
          that.startEvent(event);
        },
        move(event: InteractEvent) {
          that.moveEvent(event);
        },
      },
    });
  }
}
</script>

<style scoped lang="less">
</style>
