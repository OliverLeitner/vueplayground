<template>
    <div class="elisa">
        <ElisaComponent />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ElisaComponent from "@/components/Elisa.vue"

@Options({
    name: "ElisaView",
    components: {
        ElisaComponent,
    }
})
export default class ElisaView extends Vue {}
</script>