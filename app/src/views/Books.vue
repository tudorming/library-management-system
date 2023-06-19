<template>
  <div class="books">
    <h1 style="text-align: center;">This is the books page</h1>
    <h2 style="text-align: center;">Here you can search, select and view books.</h2>
    <v-row style="margin-left: auto; margin-right: auto; width: 90%; margin-top: 50px;">
      <v-col>
        <v-text-field
          color="third"
          label="Search by title"
          append-icon="mdi-card-search-outline"
          clearable
          outlined
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          color="third"
          label="Search by author"
          append-icon="mdi-card-search-outline"
          clearable
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row style="margin-left: auto; margin-right: auto; width: 90%;">
      <v-col>
        <v-select
          color="third"
          label="Search by degree"
          append-icon="mdi-card-search-outline"
          clearable
          outlined
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          color="third"
          label="Search by field of study"
          append-icon="mdi-card-search-outline"
          clearable
          outlined
        ></v-select>
      </v-col>
    </v-row>
    
    <v-card color="third" style="margin-left: auto; margin-right: auto; width: 90%; margin-top: 20px;" class="elevation-5">
      <v-data-table
        id="tblBooks"
        style="color: #DAD7CD"
        dense
        :headers="dessertHeaders"
        :items="desserts"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="name"
        show-expand
        class="elevation-1 third"
      >
        <template v-slot:top>
          <v-toolbar style="color: #DAD7CD" class="third" flat>
            <v-toolbar-title style="color: #DAD7CD" class="third">Expandable to visualize books</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-switch
              color="secondary"
              v-model="singleExpand"
              class="mt-2 primary--text"
            >
              <template v-slot:label>
                <span class="input__label">Single expand</span>
              </template>
            </v-switch>
          </v-toolbar>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td color="fourth" style="height: 300px" class="elevation-5" :colspan="headers.length">
            More info about {{ item.name }}
          </td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        expanded: [],
        singleExpand: false,
        dessertHeaders: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
            class: 'primary--text'
          },
          { text: 'Calories', value: 'calories', class: 'primary--text' },
          { text: 'Fat (g)', value: 'fat', class: 'primary--text' },
          { text: 'Carbs (g)', value: 'carbs', class: 'primary--text' },
          { text: 'Protein (g)', value: 'protein', class: 'primary--text' },
          { text: 'Iron (%)', value: 'iron', class: 'primary--text' },
          { text: '', value: 'data-table-expand', class: 'primary--text' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: 1,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: 1,
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: 7,
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: 8,
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: 16,
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: 0,
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: 2,
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: 45,
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: 22,
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: 6,
          },
        ],
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