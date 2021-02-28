<template>
    <div class="anime">
        <HelloAnimeComponent />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloAnimeComponent from "@/components/HelloAnime.vue"

@Options({
    name: "AnimeView",
    components: {
        HelloAnimeComponent,
    }
})
export default class AnimeView extends Vue {}
</script>