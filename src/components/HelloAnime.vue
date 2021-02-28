<template>
    <div class="helloanime">
        <img :src="picUrl"/>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
// import * as akaneko from "akaneko"
// import * as fetch from "node-fetch"
import * as animejs from "@freezegold/anime.js"

@Options({
    name: "HelloAnimeComponent"
})
export default class HelloAnimeComponent extends Vue {
    picUrl: string = ""
    timer;
    anime = new animejs.Client()

    // akaneko CORS fix
    protected async get(params) {
        return fetch(`http://vue.localnet:3000/api/${params}`)
            .then(res => res.json())
            .then(json => { return json.url });
    }

    /**
     * sfw:
     * 
     * akaneko.function() // Format
     * akaneko.foxgirl() // Awoo!~ Another example!
     * akaneko.neko() // Meow! An Example!
     * 
     * more:
     * https://www.npmjs.com/package/akaneko
     */
    protected getAkaneko(q: string = "") {
        this.get(q).then((res) => {
          // konachan is in my dpi blocklist...  
          if (!res.includes('konachan')) this.picUrl = res;
        })
    }

    /**
     * anime.js func
     * 
     * nsfw:
     * anal avatar bJ blowJob boobs classic cumArts cumsluts ero eroFeet eroKemonomimi eroKitsune eroNeko eroYuri feet feetGif femdom futanari gasm girlSolo girlSoloGif hentai holo holoEro kemonomimi keta kitsune kuni lesbian neko nekoGif pussy pussyArt pussyWankGif randomHentaiGif spank tits trap yuri
     *
     * sfw: 
     * avatar baka Ball8 catText cuddle fact feed foxGirl gecg goose holo hug kemonomimi kiss lizard meow neko nekoGif OwOify pat poke slap smug spoiler tickle waifu wallpaper why woof
     */
    protected async getAnime() {
        // calling sfw:
        await this.anime.sfw('waifu').then(res => {
            this.picUrl = res.url
        })
        // calling nsfw:
        /*this.anime.nsfw('hentai').then(res => {
            this.maidPicUrl = res.url
        })*/
        // get a list of all params possible: 
        // console.log(this.anime.nsfwAll)
        // console.log(this.anime.sfwAll)
    }

    mounted() {
        // this.timer = setInterval(this.getSchool, 30000)
        this.getAnime().then(() => {
            this.timer = setInterval(this.getAnime, 30000)
        });
    }

    beforeUnmount() {
        clearInterval(this.timer)
    }
}
</script>