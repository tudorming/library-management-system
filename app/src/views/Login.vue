<template>
  <!-- <div v-if="$root.$isLoggedIn">
    <v-card
      color="third"
      style="color: #DAD7CD; margin: auto auto auto auto; margin-top: 10%"
      elevation="5"
      height="220px"
      width="50%"
    >
      <v-card-title></v-card-title>
      <v-card-text style="margin-top: 30px">
        <p style="text-align: center; font-size: 30px; color: #DAD7CD">You are already logged in.</p>
        <p style="text-align: center; font-size: 30px; color: #DAD7CD">Please log out first from top right button.</p>
      </v-card-text>
    </v-card>
  </div> -->
  <div class="dashboard">
    <!-- <v-card color="third" style="margin-left: auto; margin-right: auto; width: 65%; margin-top: 20px;" class="elevation-5">
      <h1 style="text-align: center; color: #DAD7CD">Welcome to our library's site</h1>
    </v-card> -->
    <v-carousel cycle hide-delimiters height="300px" style="margin-left: auto; margin-right: auto; width: 50%; margin-top: 20px;">
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>
    <v-card color="third" style="margin-left: auto; margin-right: auto; width: 30%; height: 350px; margin-top: 40px;" class="elevation-5">
      <v-card-text>
        <h2 style="text-align: center; color: #DAD7CD">Please login or create an account</h2>
        <v-text-field
          v-model="email"
          dark
          style="margin-left: auto; margin-right: auto; width: 70%; margin-top: 50px;"
          color="primary"
          label="Enter email"
          append-icon="mdi-email-outline"
          clearable
          outlined
        ></v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          dark
          hint="Minimum 6 characters"
          style="margin-left: auto; margin-right: auto; width: 70%;"
          color="primary"
          label="Enter password"
          append-icon="mdi-card-search-outline"
          clearable
          outlined
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn style="margin-left: auto; margin-right: auto; width: 35%;" color="secondary" @click="login">
          Login
          <v-icon>mdi-login</v-icon>
        </v-btn>
        <v-btn style="margin-left: auto; margin-right: auto; min-width: 40%;" color="secondary" @click="overlay = !overlay">
          Create account
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-overlay
          :z-index="zIndex"
          :value="overlay"
        >
          <v-card color="third" style="margin-left: auto; margin-right: auto; width: 650px; height: 400px; margin-top: 50px;" class="elevation-5">
            <v-card-text>
              <h2 style="text-align: center; color: #DAD7CD">Please enter the details of your new account</h2>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="newEmail"
                    style="margin-left: auto; margin-right: auto; width: 100%; margin-top: 50px;"
                    color="primary"
                    label="Enter email"
                    append-icon="mdi-email-outline"
                    clearable
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="newName"
                    style="margin-left: auto; margin-right: auto; width: 100%; margin-top: 50px;"
                    color="primary"
                    label="Enter full name"
                    append-icon="mdi-email-outline"
                    clearable
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="newPass"
                    type="password"
                    style="margin-left: auto; margin-right: auto; width: 100%;"
                    color="primary"
                    label="Enter password"
                    append-icon="mdi-form-textbox-password"
                    clearable
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="newRepPass"
                    type="password"
                    style="margin-left: auto; margin-right: auto; width: 100%;"
                    color="primary"
                    label="Enter again the password"
                    append-icon="mdi-form-textbox-password"
                    clearable
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn style="margin-left: auto; margin-right: auto; min-width: 45%;" color="secondary" @click="createAcc">
                Create account
                <v-icon>mdi-login</v-icon>
              </v-btn>
              <v-btn
                style="margin-left: auto; margin-right: auto; min-width: 45%;"
                color="secondary"
                @click="cancelCreateAcc"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-overlay>
      </v-card-actions>
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
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        snackbarError: false,
        snackbarConfirm: false,
        timeout: 4000,
        snackbarText: "",
        items: [
          {
            src: require('../textures/backgroundgood.jpg'),
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
        overlay: false,
        zIndex: 0,
        email:"",
        password:"",
        newName:"",
        newEmail:"",
        newPass:"",
        newRepPass: "",
      }
    },

    created() {
      // console.log(this.$root.$isLoggedIn);
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

      login() {
        if (this.email == "" || this.password == "") {
          console.log("Please do not leave the fields empty")
          this.snackbarError = true
          this.snackbarText = "Please do not leave the fields empty"
          return
        }
        if (this.password.length < 6) {
          console.log("Password too short")
          this.snackbarError = true
          this.snackbarText = "Password too short"
          return
        }
        axios.post('http://localhost:3008/api/user-login?email='+ this.email +'&password='+ this.password)
          .then(response => {
            if (response.data.results != "") {
              this.snackbarConfirm = true
              this.snackbarText = "Succesfully logged in!"
              // console.log("Succesfully logged in!")
              this.$root.$isLoggedIn = true
              this.$root.$userName = response.data.results.name
              this.$root.$userEmail = response.data.results.email
              // console.log(this.$root.$userEmail);
              // console.log(this.$root.$userName);
              // console.log("din login" + this.$root.$isLoggedIn);
              setTimeout(function() {
                  window.location.href = "http://localhost:8080/#/dashboard"
                  // console.log(this.$cookie);
                }, 3500);
            } else {
              this.snackbarError = true
              this.snackbarText = response.data.error
              this.$root.$isLoggedIn = false
              console.log(response.data.error)
            }
          })
          .catch(error => {
            console.log(error)
            this.$root.$isLoggedIn = false
            this.snackbarError = true
            this.snackbarText = error
          })
          // .finally(() => this.loading = false)
      },

      createAcc() {
        if (this.newName == "" || this.newName == null || this.newPass == "" || this.createRepPass == "" || this.newEmail == "") {
          console.log("Please do not leave the fields empty")
          this.snackbarError = true
          this.snackbarText = "Please do not leave the fields empty"
          return
        }
        if (this.newPass.length < 6) {
          console.log("Password too short")
          this.snackbarError = true
          this.snackbarText = "Password too short"
          return
        }
        if (this.newPass != this.newRepPass) {
          console.log("Passwords do not match")
          this.snackbarError = true
          this.snackbarText = "Passwords do not match"
          return
        }

        // console.log(this.newPass)

        axios.get('http://localhost:3008/api/create-user?newname='+this.newName+"&newpass="+this.newPass+"&newrepeatpass="+this.newRepPass+"&newemail="+this.newEmail)
          .then(response => {
            if (response.data.results != "") {
              this.snackbarConfirm = true
              this.snackbarText = "Account succesfully created"
              console.log("Account succesfully created")
              // this.cancelCreateAcc();
              this.newName="",
              this.newEmail="",
              this.newPass="",
              this.newRepPass= "",
              this.overlay = false
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
          // .finally(() => this.loading = false)
      },

      cancelCreateAcc() {
        this.newName="",
        this.newEmail="",
        this.newPass="",
        this.newRepPass= "",
        this.overlay = false
      }
    }
  }
</script>