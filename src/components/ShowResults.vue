<template>
  <div class="showresults">
    <h1>{{ msg }}</h1>
    <h3>show table with results</h3>
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
import { Weather, Data, IWeather, IState } from './TestMachine.vue'


@Options({
  name: 'ShowResults',
  props: {
    msg: String,
  }
})
export default class ShowResults extends Vue {
  msg!: string
  protected store: Store<IState> = useStore()

  // write to store
  // not in use here
  protected set storeHandler(data: Weather[]) {
    this.store.commit('fetch', <Weather[]>data)
  }

  // read from store
  protected get storeHandler(): Weather[] {
    return this.store.state.result
  }

  protected get searchItem(): String {
    return this.store.state.searchItem
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
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
