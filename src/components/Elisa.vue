<template>
    <div class="elisacomponent">
        <textarea v-model="output" rows="30" cols="50" readonly></textarea><br/><br/>
        chat with me: <input 
            type="text" 
            name="input" 
            v-model="input" 
            v-on:keyup.enter="sendMessage()"
            />
    </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component"

@Options({
    name: "ElisaComponent",
})
export default class ElisaComponent extends Vue {
    input: string = ""
    output: string = ""
    con = new WebSocket("ws://localhost:8020")

    sendMessage() {
        if (this.input) {
            this.con.send(this.input) // send our thingy out
       }
    }

    mounted() {
        // websocket functionality be default included in vuejs
        this.con.onmessage = ((event) => {
            console.log(event) // lets catch some emotes
            if (this.input) this.input = "me: " + this.input
            this.output = this.output + "\n" + this.input + "\n\n >> " + event.data
            this.input = ""
        })
        this.con.onopen = ((event) => {
            // initial chat start
            this.con.send("init")
        })
    }
}
</script>

<style lang="less">
    .elisacomponent {
        input[type='text'] {
            width: 300px;
            height: 20px;
        }
    }
</style>