<template>
  <div v-if="$root.$isLoggedIn" class="account">
    <h1 style="text-align: center;">This is the account page</h1>
    <h2 style="text-align: center;">Here you can change and add different settings of your account.</h2>
    <v-row>
      <v-col>
        <v-card
          color="third"
          style="margin-left: auto; margin-right: auto; width: 85%; margin-top: 20px; color: #DAD7CD"
          elevation="5"
          height="300px"
        >
          <v-card-title>Change Full Name</v-card-title>
          <v-card-text style="margin-top: 30px">
            <p style="font-size: 20px; color: #DAD7CD; margin-left: auto; margin-right: auto;">The current full name: {{currentFullName}}</p>
            <v-text-field
              dark
              style="margin-left: auto; margin-right: auto; width: 55%; margin-top: 20px;" color="#DAD7CD"
              label="Enter the new full name"
              append-icon="mdi-card-search-outline"
              v-model="newFullName"
              clearable
              outlined
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn style="margin-left: auto; margin-right: auto; width: 45%;" color="secondary" @click="changeFullName">
              Change Full Name
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <!-- <v-col>
        <v-card
          color="third"
          style="margin-left: auto; margin-right: auto; width: 95%; margin-top: 20px; color: #DAD7CD"
          elevation="5"
          height="300px"
        >
          <v-card-title>Change email address</v-card-title>
          <v-card-text style="margin-top: 30px">
            <p style="font-size: 20px; color: #DAD7CD; margin-left: auto; margin-right: auto;">The current email address: {{currentEmail}}</p>
            <v-text-field
              dark
              v-model="newEmail"
              style="margin-left: auto; margin-right: auto; width: 55%; margin-top: 20px;" color="#DAD7CD"
              label="Enter the new email address"
              append-icon="mdi-email"
              clearable
              outlined
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn style="margin-left: auto; margin-right: auto; width: 45%;" color="secondary" @click="changeEmail">
              Change email address
              <v-icon>mdi-email</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col> -->
    </v-row>
    <v-row>
      <v-col>
        <v-card
          color="third"
          style="margin-left: auto; margin-right: auto; width: 85%; margin-top: 20px; color: #DAD7CD"
          elevation="5"
          height="400px"
        >
        <v-card-title>Change password</v-card-title>
          <p style="font-size: 20px; color: #DAD7CD; margin-left: auto; margin-right: auto;"></p>
          <v-card-text style="margin-top: 30px">
            <v-text-field
              dark
              style="margin-left: auto; margin-right: auto; width: 55%; margin-top: 20px;" color="#DAD7CD"
              v-model="currentPassword"
              type="password"
              label="Enter the current password"
              append-icon="mdi-form-textbox-password"
              clearable
              outlined
            ></v-text-field>
            <v-text-field
              dark
              style="margin-left: auto; margin-right: auto; width: 55%; margin-top: 20px;" color="#DAD7CD"
              v-model="newPassword"
              type="password"
              label="Enter the new password"
              append-icon="mdi-form-textbox-password"
              clearable
              outlined
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn style="margin-left: auto; margin-right: auto; width: 45%;" color="secondary" @click="changePassword">
              Change password
              <v-icon>mdi-form-textbox-password</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <!-- <v-col>
        <v-card
          color="third"
          style="margin-left: auto; margin-right: auto; width: 85%; margin-top: 20px; color: #DAD7CD"
          elevation="5"
          height="300px"
        >
          <v-card-title>Add/change shipping address</v-card-title>
          <v-card-text style="margin-top: 30px">
            <p style="font-size: 20px; color: #DAD7CD; margin-left: auto; margin-right: auto;">The current shipping address:</p>
            <v-text-field
              dark
              style="margin-left: auto; margin-right: auto; width: 55%; margin-top: 20px;" color="#DAD7CD"
              label="Enter the new shipping address address"
              append-icon="mdi-map-marker-outline"
              clearable
              outlined
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn style="margin-left: auto; margin-right: auto; width: 55%;" color="secondary">
              Change shipping address address
              <v-icon>mdi-map-marker-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col> -->
    </v-row>
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
        snackbarError: false,
        snackbarConfirm: false,
        timeout: 4000,
        snackbarText: "",
        currentFullName: "",
        newFullName:"",
        currentEmail:"",
        newEmail:"",
        newPassword: "",
        currentPassword: "",
      }
    },

    created() {
      // console.log(this.$root.$isLoggedIn);
      this.initialize()
    },

    methods: {
      initialize() {
        axios.post('http://localhost:3008/api/get-info-user?email='+ this.$root.$userEmail)
          .then(response => {
            if (response.data.results) {
              // console.log("data arrived")
              this.currentFullName = response.data.results[0].name
              this.currentEmail = response.data.results[0].email
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

      changeFullName() {
        if (this.newFullName == "" || this.newFullName == undefined) {
          this.snackbarError = true
          this.snackbarText = "Please do not leave the field empty"
          return
        }
        if (this.newFullName == this.currentFullName) {
          this.snackbarError = true
          this.snackbarText = "The name cannot be the same as the previous one"
          return
        }
        axios.post('http://localhost:3008/api/change-name?name='+ this.newFullName +"&email=" + this.$root.$userEmail)
          .then(response => {
            if (response.data.results) {
              this.snackbarConfirm = true
              this.snackbarText = "Full Name Changed Succesfully"
              this.$root.$userName = this.newFullName
              this.newFullName = ""
              this.initialize()
            } else {
              this.snackbarError = true
              this.snackbarText = "Could not change full name"
              console.log("Could not change full name")
            }
          })
          .catch(error => {
            console.log(error)
            this.snackbarError = true
            this.snackbarText = error
          })
      },

      changeEmail() {
        if (this.newEmail == "" || this.newEmail == undefined) {
          this.snackbarError = true
          this.snackbarText = "Please do not leave the field empty"
          return
        }
        if (this.newEmail == this.currentEmail) {
          this.snackbarError = true
          this.snackbarText = "The email cannot be the same as the previous one"
          return
        }
        axios.post('http://localhost:3008/api/change-email?newemail='+ this.newEmail +"&email=" + this.$root.$userEmail)
          .then(response => {
            if (response.data.results) {
              this.snackbarConfirm = true
              this.snackbarText = "Email Changed Succesfully"
              this.$root.$userEmail = this.newEmail
              this.newEmail = ""
              this.initialize()
            } else {
              this.snackbarError = true
              this.snackbarText = "Could not change email"
              console.log("Could not change email")
            }
          })
          .catch(error => {
            console.log(error)
            this.snackbarError = true
            this.snackbarText = error
          })
      },

      changePassword() {
        if (this.newPassword == "" || this.currentPassword == "") {
          this.snackbarError = true
          this.snackbarText = "Please do not leave the fields empty"
          return
        }
        axios.post('http://localhost:3008/api/change-password?newpassword='+ this.newPassword +"&email=" + this.$root.$userEmail+"&oldpassword=" + this.currentPassword)
          .then(response => {
            if (response.data.results) {
              this.snackbarConfirm = true
              this.snackbarText = "Password Changed Succesfully"
              this.newPassword = ""
              this.currentPassword = ""
              this.initialize()
            } else {
              this.snackbarError = true
              this.snackbarText = "Could not change the password"
              console.log("Could not change the password")
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
              this.$root.$userEmail = response.data.results
              // console.log(this.$root.$userEmail);
              // console.log("din login" + this.$root.$isLoggedIn);
              setTimeout(function() {
                  window.location.href = "http://localhost:8080/#/dashboard"
                  // console.log(this.$cookie);
                }, 5000);
            } else {
              this.snackbarConfirm = true
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
        if (this.newName == "" || this.newPass == "" || this.createRepPass == "" || this.newEmail == "") {
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
    }
  }
</script>
