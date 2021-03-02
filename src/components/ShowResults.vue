<template>
  <div class="showresults">
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
            v-show="
              searchItem === '' ||
              data.location.toLowerCase().includes(searchItem.toLowerCase())
            "
          >
            <td>{{ data.location }}</td>
            <td>{{ data.time }}</td>
            <td>{{ data.temp }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Store, useStore } from "vuex";
import { Weather, IState } from "./TestMachine.vue";

@Options({
  name: "ShowResults",
})
export default class ShowResults extends Vue {
  protected store: Store<IState> = useStore();

  protected get storeHandler(): Weather[] {
    return this.store.state.result;
  }

  protected get searchItem(): String {
    return this.store.state.searchItem;
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
