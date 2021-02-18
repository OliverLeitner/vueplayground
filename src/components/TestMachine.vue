<template>
  <div class="test">
    <!-- if we dont operate on that passed in var, we dont need to have it in props -->
    <h1>{{ $attrs.msg }}</h1>
    <p>
      search in table
    </p>
    <form name="search">
      <!-- search text input field -->
      <input 
        type="search" 
        v-model="searchItem" 
        placeholder="enter search term"
        name="search"/>
      <!-- search input field reset button -->
      <input type="reset" name="reset" v-on:click="searchItem = ''" value="reset"/>
    </form>
    <div class="table-wrapper">
    <table class="table center-left">
      <thead>
        <tr>
          <th>location</th>
          <th>time</th>
          <th>temp</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="data in storeHandler" 
          :key="data.id" 
          v-show="searchItem === '' || 
          data.location.toLowerCase().includes(searchItem.toLowerCase())">
          <td>{{data.location}}</td>
          <td>{{data.time}}</td>
          <td>{{data.temp}}</td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Store, useStore } from 'vuex'

// iweather interface
export interface IWeather {
  location: string,
  time: string,
  temp: number,
  abbr: string,
  id: number,
  // hasData: boolean
}

// store state interface
export interface IState {
  result: Weather[]
}

// mother of all data class
export class Data {
  constructor(
    public id: number = 0,
    // public hasData: boolean = true
  ) {
    return this
  }
}

// weather class building on data class implementing iweather interface
export class Weather extends Data implements IWeather {
  constructor(
    public location: string = "",
    public time: string = "",
    public temp: number = 0,
    public abbr: string = "",
  ) {
    super()
    return this
  }
}

// validation stuff for components...
// TODO: find out howto use with data
/*const WeatherComponent = defineComponent({
  props: {
    Weather: {
      type: Object as PropType<Weather>,
      default: () => ({
        location: '',
        time: '',
        temp: 0,
        abbr: '',
        id: 0,
        hasData: true
      }),
      validator: (weather: Weather) => !!undefined
    }
  }
});*/

@Options({
  name: 'TestMachine', // to get named components in vue browser extension
  /*props: {
    msg: String, // receive data from calling app
    url: String, // json data url
    title: String // for the page title, given from above
  },*/
  // we can use watch to console log or debug, but we dont need it either...
  /*watch: {
    searchItem: 'getRows', // calls a method
  },
  methods: { // we are local to the default class here
    /*getRows () {
      console.log(this.searchItem)
      this.rowMatch() // this seems to be enough, no event needed except the default watchers
    },
  }*/
})
export default class TestMachine extends Vue {
  // protected msg!: string // handling the component provided data
  // protected url!: string  // data url
  // protected title!: string // page title
  // protected localWeatherDataList: Weather[] = [] // the weather data json binding
  protected searchItem: string = "" // bound input element
  protected store: Store<IState> = useStore() // global store def

  // filter the table data based on input field
  // we actually dont need to loop here hence were already looping in the template...
  /*protected rowMatch() {
    for (let idx: number = 0; idx < this.weatherDataList.length; idx++)
      if (
        this.weatherDataList[idx].location.toLowerCase().includes(this.searchItem.toLowerCase())
          // this.weatherDataList[idx].time.includes(this.searchItem)
          // this.weatherDataList[idx].temp.includes(this.searchItem)
      ) this.weatherDataList[idx].hasData = true;
      else this.weatherDataList[idx].hasData = false;
  }*/

  // sets weatherdata
  /*protected set weatherDataList(data: Weather[]) {
    this.localWeatherDataList = <Weather[]>data as IWeather[]
  }*/

  // get weatherdata
  /*protected get weatherDataList(): Weather[] {
      return this.localWeatherDataList as IWeather[];
  }*/

  // grabs data
  // TODO: playing around with apollo on actual graphql apis
  protected async getJsonData(): Promise<any> {
    let weatherData: Weather[] = []
    if ((<string>this.$attrs.url).includes('://')) {
      const response = await fetch(`${<string>this.$attrs.url}`)
      const data = await response.json()
      weatherData = <Weather[]>data as IWeather[];
    } else weatherData = <Weather[]>require(`@/assets/${this.$attrs.url}`) as IWeather[]
    // this.weatherDataList.flatMap((elem: Weather) => {console.log(<Weather>elem as IWeather)})
    if (weatherData) this.storeHandler = <Weather[]>weatherData
  }

  // write to store
  protected set storeHandler(data: Weather[]) {
    this.store.commit('fetch', <Weather[]>data)
  }

  // read from store
  protected get storeHandler(): Weather[] {
    return this.store.state.result
  }

  // dont really need it, but to avoid devtools error
  protected get setMeta(): string {
    return document.title
  }

  // metadata stuff sceleton
  protected set setMeta(title: string) {
    document.title = <string>this.$attrs.title
  }

  // adding metadata when needed
  // TODO: add one of the already existing vue seo component
  // https://project-awesome.org/vuejs/awesome-vue
  async beforeMount() {
    // this.msg = <string>this.$attrs.msg
    this.setMeta = <string>this.$attrs.title
  }

  // sets stuff at loading of component
  async mounted() {
    // TODO: add logic of "createddate"
    // TODO: store data locally
    if (!this.storeHandler.length)
      await this.getJsonData()
  }
}
</script>

<style scoped lang="less">
  .table-wrapper {
    width: 100%;
    margin-top: 4vh;
  }
  .center-left {
    text-align: left;
    vertical-align: middle;
    margin: auto;
  }
</style>