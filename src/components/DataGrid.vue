<template>
  <div class="datagridcomponent">
    <div class="select-wrapper">
    <select class="biginput" v-model="selectedType" @change="showSelectedType">
      <option v-for="type in selectionTypes" :key="type">{{ type }}</option>
    </select>
    </div>
    <div class="table-wrapper">
      <table class="table center-left">
        <thead>
          <th>{{columns[0]}}</th>
          <th>{{columns[1]}}</th>
          <th>{{columns[2]}}</th>
          <th>{{columns[3]}}</th>
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
      <!-- bug report: https://github.com/grid-js/gridjs-vue/issues/112 -->
      <!--grid :cols="columns" :rows="[]"></grid-->
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { DNCWebApiService } from "@/shared/services/dnc.service";
import { Customer } from "@/shared/models/customer.model";
// might create my own, non broken, one...
// import Grid from "gridjs-vue";

export enum SelectionTypes {
  Customer = "Customer",
  Employee = "Employee",
}

// think translations from the database...
export enum Columns {
  Name = "Name", 
  FirstName = "First Name", 
  LastName = "Last Name", 
  Address = "Address"
}

// TODO: handle selection switching via interface selections

@Options({
  name: "DataGridComponent",
  /*components: {
    Grid,
  },*/
})
export default class DataGridComponent extends Vue {
  protected selectionTypes = SelectionTypes;
  protected selectedType = SelectionTypes.Customer;
  protected customerData: Customer[] = [];
  protected columns: Columns[] = <Columns[]>[
    Columns.Name,
    Columns.FirstName,
    Columns.LastName,
    Columns.Address
  ];

  protected async getData(type: string = "Customer"): Promise<Customer[]> {
    return <Customer[]>await new DNCWebApiService(
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
    this.showSelectedType();
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

// larger select
.biginput {
  font-size: 2em;
}

/**
 * https://developer.mozilla.org/en-US/docs/Learn/Forms/Advanced_form_styling
 */
// remove default button thingy
select {
  -webkit-appearance: none;
  appearance: none;
}

// make sure that we can has z-index etc...
.select-wrapper {
  position: relative;
}

// position a new "arrow" thingy on the select
.select-wrapper::after {
  content: "▼";
  font-size: 1rem;
  top: 20px;
  right: 10px;
  position: absolute;
}

// lol
button, label, input, select, progress, meter {
  display: block;
  font-family: inherit;
  font-size: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 5px;
  height: 60px;
}

input[type="text"], input[type="datetime-local"], input[type="color"], select {
  box-shadow: inset 1px 1px 3px #ccc;
  border-radius: 5px;
}

label {
  margin-bottom: 5px;
}

button {
  width: 60%;
  margin: 0 auto;
}
</style>