<template>
  <div class="test">
    <h1>{{ msg }}</h1>
    <p>
      search in table
    </p>
    <form name="search">
      <!-- search text input field -->
      <input 
        type="search" 
        v-model="searchItem" 
        v-on:keyup="rowMatch"
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
        <tr v-for="data in weatherDataList" :key="data.id" v-show="searchItem === '' || data.hasData">
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
// import { Component, defineComponent, PropType, Prop } from 'vue';

// iweather interface
export interface IWeather {
  location: string,
  time: string,
  temp: number,
  abbr: string,
  id: number,
  hasData: boolean
}

// mother of all data class
export class Data {
  constructor(
    public id: number = 0,
    public hasData: boolean = true
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
  props: {
    msg: String, // receive data from calling app
    url: String
  },
  watch: {
    searchItem: value => {
      console.log(value)
    }
  },
  /*methods: {
    rowMatchOuter() {
      const tm = new TestMachine;
      tm.rowMatch()
    }
  }*/
})
export default class TestMachine extends Vue {
  protected msg!: string // handling the component provided data
  protected url!: string // data url
  protected localWeatherDataList: Weather[] = [] // the weather data json binding
  protected searchItem: string = "" // bound input element

  // filter the table data based on input field
  protected rowMatch() {
    for (let idx: number = 0; idx < this.weatherDataList.length; idx++)
      if (
        this.weatherDataList[idx].location.toLowerCase().includes(this.searchItem.toLowerCase())
          // this.weatherDataList[idx].time.includes(this.searchItem)
          // this.weatherDataList[idx].temp.includes(this.searchItem)
      ) this.weatherDataList[idx].hasData = true;
      else this.weatherDataList[idx].hasData = false;
  }

  // sets weatherdata
  protected set weatherDataList(data: Weather[]) {
    this.localWeatherDataList = <Weather[]>data as IWeather[]
  }

  // get weatherdata
  protected get weatherDataList(): Weather[] {
      return this.localWeatherDataList as IWeather[];
  }

  // grabs data
  // TODO: playing around with apollo on actual graphql apis
  protected async getJsonData(): Promise<any> {
    if (this.url.includes('://')) {
      const response = await fetch(`${this.url}`)
      const data = await response.json()
      this.weatherDataList = <Weather[]>data as IWeather[];
    } else this.weatherDataList = <Weather[]>require(`@/assets/${this.url}`) as IWeather[]
    // this.weatherDataList.flatMap((elem: Weather) => {console.log(<Weather>elem as IWeather)})
  }

  // sets stuff at loading of component
  async mounted() {
    // TODO: add logic of "createddate"
    // TODO: store data locally
    if (this.weatherDataList.length === 0)
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