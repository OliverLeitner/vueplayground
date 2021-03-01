<template>
    <div class="datagridview">
      <DataGridComponent />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DataGridComponent from "@/components/DataGrid.vue";

@Options({
  name: "DataGridView",
  components: {
    DataGridComponent,
  },
})
export default class DataGridView extends Vue {}
</script>