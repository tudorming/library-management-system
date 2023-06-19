<template>
  <div v-if="$root.$isLoggedIn" class="books">
    <h1 style="text-align: center;">This is the books to lend page</h1>
    <h2 style="text-align: center;">Here the employees/admin can set the status of the orders to 'LENT'</h2>
    <v-row style="margin-left: auto; margin-right: auto; width: 90%; margin-top: 40px;">
      <v-col>
        <v-text-field
          color="third"
          v-model="searchID"
          @keydown.enter.prevent="initialize"
          label="Search by order ID"
          append-icon="mdi-card-search-outline"
          clearable
          outlined
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          color="third"
          v-model="search"
          @keydown.enter.prevent="initialize"
          label="Search by email"
          append-icon="mdi-card-search-outline"
          clearable
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-card color="third" style="margin-left: auto; margin-right: auto; width: 90%; margin-top: 20px;" class="elevation-5">
      <v-data-table
        v-model="selectedOrders"
        show-select
        id="tblBooks"
        style="color: #DAD7CD"
        dense
        :headers="headersOrders"
        :items="orders"
        :items-per-page="itemsPerPage"
        :page.sync="page"
        :single-select="true"
        hide-default-footer
        item-key="id"
        class="elevation-1 third"
      >
        <template v-slot:top>
          <v-toolbar
            flat
            color="third"
          >
            <v-toolbar-title style="color: #DAD7CD" class="third">Select Order to change status to LENT</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
          </v-toolbar>
        </template>
        <template v-slot:no-data>
          <v-btn
            color="background"
            @click="initialize"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>
      <v-row class="text-center px-4 align-center" style="margin-top: 20px" wrap>
        <v-col cols="12" md="6">
          <v-pagination
            color="background"
            v-model="page"
            :total-visible="7"
            :length="pageCount">
          </v-pagination>
        </v-col>
        <v-col cols="6" md="3">
          <v-select
            dark
            color="background"
            dense
            outlined
            hide-details
            :value="itemsPerPage"
            label="Items per page"
            @change="itemsPerPage = parseInt($event, 10)"
            :items="perPageChoices">
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
        <v-col></v-col>
        <v-col></v-col>
        <v-col></v-col>
        <v-col>
          <v-btn
            color="secondary"
            dark
            class="mb-2"
            @click="lendBooks"
          >
            Lend Books
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <v-snackbar
      color="attention"
      right
      dark
      v-model="snackbarError"
      :timeout="timeout"
    >
      <p style="text-align: center;">{{ snackbarText }}</p>
    </v-snackbar>
    <v-snackbar
      right
      color="info"
      dark
      v-model="snackbarConfirm"
      :timeout="timeout"
    >
      <p style="text-align: center;">{{ snackbarText }}</p>
    </v-snackbar>
  </div>
  <div v-else class="dashboard" >
    <v-card
      color="third"
      style="color: #DAD7CD; margin: auto auto auto auto; margin-top: 10%"
      elevation="5"
      height="220px"
      width="50%"
    >
      <v-card-title></v-card-title>
      <v-card-text style="margin-top: 30px">
        <p style="text-align: center; font-size: 30px; color: #DAD7CD">You need to be logged in to see this page</p>
      </v-card-text>
      <v-card-actions>
        <v-btn
          style="margin-left: auto; margin-right: auto; min-width: 30%; margin-top: 20px"
          color="secondary"
          @click="goToLogin"
        >
          LOGIN
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        singleSelect: false,
        selectedOrders: [],

        search: '',
        searchID: '',

        snackbarError: false,
        snackbarConfirm: false,
        timeout: 4000,
        snackbarText: "",
        page: 1,
        itemsPerPage: 5,
        perPageChoices: [
            {text:'1 record/page' , value: 1, class: 'background--text'},
            {text:'5 records/page' , value: 5, class: 'background--text'},
            {text:'10 records/page' , value: 10, class: 'background--text'},
            {text:'20 records/page' , value: 20, class: 'background--text'},
        ],
        headersOrders: [
          { text: 'Order ID', value: 'id', class: 'primary--text', sortable: false },
          {
            text: 'User Email',
            align: 'start',
            sortable: false,
            value: 'uemail',
            class: 'primary--text'
          },
          { text: 'Order Status', value: 'description', class: 'primary--text', sortable: false },
          { text: 'Date', value: 'timestamp', class: 'primary--text', sortable: false },
          { text: 'Books Ordered', value: 'orderedbooks', class: 'primary--text', sortable: false },
        ],
        orders: [],
      }
    },
    created () {
      this.initialize()
    },

    computed: {
      totalRecords() {
        return this.orders.length
      },
      pageCount() {
        let counting = this.totalRecords / this.itemsPerPage
        if (Number.isInteger(counting)) {
          return counting
        } else {
          return Math.ceil(counting)
        }
      },
    },

    methods: {
      initialize () {
        let urlSearch = ""
        if (this.search != "" && this.search != null) {
            if (urlSearch == "") {
                urlSearch = '?search='+this.search
            } else {
                urlSearch = urlSearch + '&search='+this.search
            }
        }
        if (this.searchID != "" && this.searchID != null) {
            if (urlSearch == "") {
                urlSearch = '?searchID='+this.searchID
            } else {
                urlSearch = urlSearch + '&searchID='+this.searchID
            }
        }
        axios.get('http://localhost:3008/api/get-orders-pick-up'+urlSearch)
          .then(response => {
            if (response.data.results) {
              this.orders = response.data.results
              for (let book = 0; book < this.orders.length; book++) {
                // console.log(this.orders[book].timestamp);
                let datestring =new Date(this.orders[book].timestamp).toLocaleString()
                this.orders[book].timestamp = datestring.substring(0,24)
              }
              // console.log(this.books[0].front);
              // console.log("books gathered")
            } else if (response.data.results == []){
              this.snackbarError = true
              this.orders = []
              this.snackbarText = "No orders found"
              console.log("No orders found")
            } else {
              this.snackbarError = true
              this.snackbarText = response.data.error
              console.log(response.data.error)
            }
          })
          .catch(error => {
            console.log(error)
            this.snackbarError = true
            this.snackbarText = error
          })
      },

      goToLogin() {
        window.location.href = "http://localhost:8080/#/"
      },

      lendBooks() {
        if (this.selectedOrders[0] == [] || this.selectedOrders[0] == undefined) {
          this.snackbarError = true
          this.snackbarText = 'Please select an order'
          return
        }
        let id = this.selectedOrders[0].id
        axios.get('http://localhost:3008/api/lend-books?id=' + id)
          .then(response => {
            if (response.data.results) {
              this.initialize()
              this.snackbarConfirm = true
              this.snackbarText = "Changed the status of the order to LENT"
              // console.log(this.books[0].front);
              // console.log("books gathered")
            } else if (response.data.results == []){
              this.snackbarError = true
              this.orders = []
              this.snackbarText = "No orders found"
              console.log("No orders found")
            } else {
              this.snackbarError = true
              this.snackbarText = response.data.error
              console.log(response.data.error)
            }
          })
          .catch(error => {
            console.log(error)
            this.snackbarError = true
            this.snackbarText = error
          })
      }
    },
  }
</script>

<style>
#tblBooks tbody tr:hover {
  background-color: #578560;
}
#tblBooks thead {
  color: #578560;
}
#tblBooks thead:hover {
  background-color: #578560;
}
.input__label {
  color: #DAD7CD;
}
</style>