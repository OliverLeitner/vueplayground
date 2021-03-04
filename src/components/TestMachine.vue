<template>
  <div class="test">
    <!-- if we dont operate on that passed in var, we dont need to have it in props -->
    <h1>{{ $attrs.msg }}</h1>
    <form name="search">
      <!-- search text input field -->
      <input
        type="search"
        v-model="searchItem"
        placeholder="enter search term"
        name="search"
      />
      <!-- search input field reset button -->
      <input
        type="reset"
        name="reset"
        v-on:click="searchItem = ''"
        value="reset"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Store, useStore } from "vuex";

// iweather interface
export interface IWeather {
  location: string;
  time: string;
  temp: number;
  abbr: string;
  id: number;
}

// store state interface
export interface IState {
  searchItem: string;
  result: Weather[];
}

// mother of all data class
export class Data {
  constructor(public id: number = 0) {
    return this;
  }
}

// TODO: find out more about the following
/*type Reflection<T> = {
    value: T;
    resolved: true;
} | {
    error: unknown;
    rejected: true;
}*/

// weather class building on data class implementing iweather interface
export class Weather extends Data implements IWeather {
  constructor(
    public location: string = "",
    public time: string = "",
    public temp: number = 0,
    public abbr: string = ""
  ) {
    super();
    return this;
  }
}

@Options({
  name: "TestMachine", // to get named components in vue browser extension
})
export default class TestMachine extends Vue {
  public store: Store<IState> = useStore(); // global store def

  // grabs data
  // TODO: playing around with apollo on actual graphql apis
  public async getJsonData(): Promise<IWeather[]> {
    let weatherData: Promise<Weather[]> = null; // TODO: strong type this later...
    if (this.$attrs && this.$attrs.url) {
      if (this.$attrs.url.toString().includes("://")) {
        await fetch(`${this.$attrs.url.toString()}`).then((response) => {
          if (response.ok) weatherData = response.json();
        })
        // TODO: find out why require wont work with jest
      } else weatherData = require(`@/assets/weather.json`) as Promise<IWeather[]>;
      return weatherData as Promise<Weather[]>;
    }
  }

  public set searchItem(item: string) {
    if (this.store) this.store.commit("writeSearchItem", item);
  }

  // avoid a warning in devtools that searchItem has no getter
  // otherwise we dont need this here
  public get searchItem(): string {
    if (this.store && this.store.state)
      return this.store.state.searchItem;
    else return "search me!"  
  }

  // write to store
  public set storeHandler(data: Weather[]) {
    if (this.store)
      this.store.commit("writeResult", data as Weather[]);
  }

  // read from store
  // only needed for the if check in mounted func below
  public get storeHandler(): Weather[] {
    if (this.store && this.store.state)
      return this.store.state.result;
  }

  // dont really need it, but to avoid devtools error
  protected get setMeta(): string {
    if (document) return document.title;
  }

  // metadata stuff sceleton
  protected set setMeta(title: string) {
    if (this.$attrs && this.$attrs.title)
      document.title = this.$attrs.title.toString();
  }

  // adding metadata when needed
  // TODO: add one of the already existing vue seo component
  // https://project-awesome.org/vuejs/awesome-vue
  async beforeMount() {
    if (this.$attrs && this.$attrs.title)
      this.setMeta = this.$attrs.title.toString();
  }

  // sets stuff at loading of component
  async mounted() {
    // TODO: add logic of "createddate"
    if (this.storeHandler && !this.storeHandler.length)
      await this.getJsonData().then((resp) => {
        this.storeHandler = resp;
      });
  }
}
</script>