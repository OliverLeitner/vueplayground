<template>
  <div class="test">
    <h1>TEsting environment</h1>
    <TestMachine 
      msg="Welcome to Your Vue.js + Testing area" 
      url="weather.json"
      title="my special test app node master"/>
    <ShowResults />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import TestMachine from '@/components/TestMachine.vue' // @ is an alias to /src
import ShowResults from '@/components/ShowResults.vue'

@Options({
  name: 'TestMachineView',
  components: {
    TestMachine,
    ShowResults
  },
})
export default class TestMachineView extends Vue {}
</script>
