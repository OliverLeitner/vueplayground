<template>
  <div class="datagridcomponent">
    <select v-model="selectedType" @change="showSelectedType">
      <option v-for="type in selectionTypes" :key="type">{{type}}</option>
    </select>
    <div class="table-wrapper">
      <table v-bind:data="customerData" class="table center-left">
        <thead>
          <th>Name</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Address</th>
        </thead>
        <tbody>
          <tr v-for="row in customerData" :key="row.customerNumber">
            <td>{{ row.customerName }}</td>
            <td>{{ row.contactFirstName }}</td>
            <td>{{ row.contactLastName }}</td>
            <td>
              {{ row.addressLine1 }},
              {{ row.city }}
              {{ row.state }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { DNCWebApiService } from "@/shared/services/dnc.service";
import { Customer } from "@/shared/models/customer.model";

export enum SelectionTypes {
  Customer = "Customer",
  Employee = "Employee",
}

// TODO: handle selection switching via interface selections

@Options({
  name: "DataGridComponent",
})
export default class DataGridComponent extends Vue {
  protected selectionTypes = SelectionTypes
  protected selectedType = SelectionTypes.Customer;
  protected customerData: Customer[] = [];

  protected async getData(type: string = "Customer") {
    return await new DNCWebApiService(
      "http://dnc.localnet",
      80,
      type
    ).DncData();
  }

  // the switcharoo
  showSelectedType() {
    this.getData(this.selectedType).then((resp) => {
      this.customerData = resp;
    });
  }

  // initial show on page load
  mounted() {
    this.getData().then((resp) => {
      this.customerData = resp;
    });
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