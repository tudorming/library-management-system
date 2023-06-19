<template>
  <div v-if="$root.$isLoggedIn" class="dashboard" >
    <h1 style="text-align: center;">This is the dashboard page</h1>
    <p style="text-align: center;">This is where the user is supposed to see different analytics about the library</p>
    <v-carousel style="margin-left: auto; margin-right: auto; width: 90%;" :show-arrows="false" cycle>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>
    <v-row style="margin-top: 20px">
      <v-col>
        <v-card
          color="third"
          style="color: #DAD7CD;margin-left: auto; margin-right: auto;"
          elevation="5"
          height="550px"
          width="90%"
        >
          <v-card-title>MOST ORDERED BOOK OF ALL TIME</v-card-title>
          <v-card-text style="margin-top: 10px">
            <p style="text-align: center; font-size: 20px; color: #DAD7CD">The Last Tudor</p>
            <p style="text-align: center; font-size: 16px; color: #DAD7CD">by Philippa Gregory</p>
          </v-card-text>
          <v-img
            style="margin-left: auto; margin-right: auto;"
            width="225"
            contain
            src="../textures/tudor-f.jpeg"
          ></v-img>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          color="third"
          style="color: #DAD7CD;margin-left: auto; margin-right: auto;"
          elevation="5"
          height="550px"
          width="90%"
        >
          <v-card-title>MOST ORDERED BOOK OF THIS MONTH</v-card-title>
          <v-card-text style="margin-top: 10px">
            <p style="text-align: center; font-size: 20px; color: #DAD7CD">AC Brotherhood</p>
            <p style="text-align: center; font-size: 16px; color: #DAD7CD">by Oliver Bowen</p>
          </v-card-text>
          <v-img
            style="margin-left: auto; margin-right: auto;"
            width="225"
            contain
            src="../textures/brotherhood-f.jpeg"
          ></v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-row style="margin-top: 40px">
      <v-col>
        <v-card
          color="third"
          style="color: #DAD7CD;margin-left: auto; margin-right: auto;"
          elevation="5"
          height="275px"
          width="95%"
        >
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="secondary"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :labels="labelsOrdersMade"
              :value="valueOrdersMade"
              color="background"
              line-width="2"
              padding="16"
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="text-h6 font-weight-light mb-2 background--text">
              All orders made in the last 7 days
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon
              class="mr-2"
              small
              dark
            >
              mdi-clock
            </v-icon>
            <span class="text-caption background--text font-weight-light">last updated {{ new Date() }}</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          color="third"
          style="color: #DAD7CD;margin-left: auto; margin-right: auto;"
          elevation="5"
          height="275px"
          width="95%"
        >
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="secondary"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :labels="labelsOrdersMade"
              :value="valueOrdersLent"
              color="background"
              line-width="2"
              padding="16"
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="text-h6 font-weight-light mb-2 background--text">
              All orders lent in the last 7 days
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon
              class="mr-2"
              small
              dark
            >
              mdi-clock
            </v-icon>
            <span class="text-caption background--text font-weight-light">last updated {{ new Date() }}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row style="margin-top: 40px">
      <v-col>
        <v-card
          color="third"
          style="color: #DAD7CD;margin-left: auto; margin-right: auto;"
          elevation="5"
          height="275px"
          width="95%"
        >
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="secondary"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :labels="labelsOrdersMade"
              :value="valueOrdersReturned"
              color="background"
              line-width="2"
              padding="16"
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="text-h6 font-weight-light mb-2 background--text">
              All orders returned in the last 7 days
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon
              class="mr-2"
              small
              dark
            >
              mdi-clock
            </v-icon>
            <span class="text-caption background--text font-weight-light">last updated {{ new Date() }}</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          color="third"
          style="color: #DAD7CD;margin-left: auto; margin-right: auto;"
          elevation="5"
          height="275px"
          width="95%"
        >
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="secondary"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :labels="labelsOrdersMade"
              :value="valueOrdersAll"
              color="background"
              line-width="2"
              padding="16"
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="text-h6 font-weight-light mb-2 background--text">
              All orders submitted in the last 7 days
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon
              class="mr-2"
              small
              dark
            >
              mdi-clock
            </v-icon>
            <span class="text-caption background--text font-weight-light">last updated {{ new Date() }}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
        items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
        labelsOrdersMade: [
          '7d ago',
          '6d ago',
          '5d ago',
          '4d ago',
          '3d ago',
          '2d ago',
          '1d ago',
          'today',
        ],
        valueOrdersMade: [
          75,
          100,
          85,
          125,
          75,
          65,
          95,
          30,
        ],
        valueOrdersLent: [
          80,
          110,
          50,
          70,
          40,
          100,
          60,
          20,
        ],
        valueOrdersReturned: [
          50,
          90,
          80,
          50,
          100,
          70,
          70,
          20,
        ],
        valueOrdersAll: [
          175,
          200,
          150,
          210,
          180,
          190,
          150,
          110,
        ],
      }
    },

    created() {
      // console.log("din dashboard" + this.$root.$isLoggedIn)
      // this.isLoggedIn()
    },

    methods: {
      isLoggedIn() {
        axios.post('http://localhost:3008/api/is-logged-in')
          .then(response => {
            if (response.data.results) {
              this.snackbarConfirm = true
              this.snackbarText = "Cookie found"
              console.log("Cookie found")
              // setTimeout(function() {
              //     window.location.href = "http://localhost:8080/#/dashboard"
              //     console.log(this.$cookie);
              //   }, 5000);
            } else {
              this.snackbarError = true
              this.snackbarText = "cookie not found"
              console.log("cookie not found")
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
      }
    }
  }
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>