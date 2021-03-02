<template>
  <div class="test">
    <!-- if we dont operate on that passed in var, we dont need to have it in props -->
    <h1>{{ $attrs.msg }}</h1>
    <p>search in table</p>
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
  searchItem: "";
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
  protected store: Store<IState> = useStore(); // global store def

  // grabs data
  // TODO: playing around with apollo on actual graphql apis
  protected async getJsonData(): Promise<Weather[]> {
    let weatherData: Weather[] = [];
    if ((<string>this.$attrs.url).includes("://")) {
      const response = await fetch(`${<string>this.$attrs.url}`);
      const data = await response.json();
      weatherData = (<Weather[]>data) as IWeather[];
    } else
      weatherData = (<Weather[]>(
        require(`@/assets/${this.$attrs.url}`)
      )) as IWeather[];
    return (<Weather[]>weatherData) as IWeather[];
  }

  protected set searchItem(item: string) {
    this.store.commit("writeSearchItem", item);
  }

  // avoid a warning in devtools that searchItem has no getter
  // otherwise we dont need this here
  protected get searchItem(): string {
    return this.store.state.searchItem;
  }

  // write to store
  protected set storeHandler(data: Weather[]) {
    this.store.commit("writeResult", <Weather[]>data);
  }

  // read from store
  // only needed for the if check in mounted func below
  protected get storeHandler(): Weather[] {
    return this.store.state.result;
  }

  // dont really need it, but to avoid devtools error
  protected get setMeta(): string {
    return document.title;
  }

  // metadata stuff sceleton
  protected set setMeta(title: string) {
    document.title = <string>this.$attrs.title;
  }

  // adding metadata when needed
  // TODO: add one of the already existing vue seo component
  // https://project-awesome.org/vuejs/awesome-vue
  async beforeMount() {
    this.setMeta = <string>this.$attrs.title;
  }

  // sets stuff at loading of component
  async mounted() {
    // TODO: add logic of "createddate"
    if (!this.storeHandler.length) this.storeHandler = await this.getJsonData();
  }
}
</script>