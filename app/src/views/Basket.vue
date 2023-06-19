<template>
  <div v-if="$root.$isLoggedIn">
    <div v-if="doneoredered">
      <v-card
        color="third"
        style="color: #DAD7CD; margin: auto auto auto auto; margin-top: 5%"
        elevation="5"
        height="220px"
        width="50%"
      >
        <v-card-text style="margin-top: 30px">
          <p style="text-align: center; font-size: 30px; color: #DAD7CD">An email was sent to your inbox.</p>
          <p style="text-align: center; font-size: 30px; color: #DAD7CD">Please check the order.</p>
          <p style="text-align: center; font-size: 30px; color: #DAD7CD">(Please also check the spam folder)</p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            style="margin-left: auto; margin-right: auto; min-width: 30%; margin-top: 20px"
            color="secondary"
            @click="goToBooks"
          >
            Explore the Books Page
          </v-btn>
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
    <div class="basket" v-else>
      <v-card
        color="third"
        style="color: #DAD7CD; margin: auto auto auto auto; margin-top: 5%"
        elevation="5"
        height="150px"
        width="50%"
      >
        <v-card-text style="margin-top: 30px">
          <p style="text-align: center; font-size: 30px; color: #DAD7CD">This is the basket page where the user can see the</p>
          <p style="text-align: center; font-size: 30px; color: #DAD7CD">selected books that are about to be ordered.</p>
        </v-card-text>
      </v-card>
      <v-card
        v-if="areBooks"
        color="third"
        elevation="5"
        style="margin-top: 50px; color: #DAD7CD;"
        max-width="600"
        class="mx-auto"
      >
        <v-list
          color="third"
          header
          two-line
        >
          <h2 style="margin-left: 15px; color: #DAD7CD">Books in the basket:</h2>

          <v-list-item
            v-for="book in books"
            :key="book.title"
          >
            <v-list-item-content>
              <v-list-item-title style="color: #DAD7CD" v-text="book.title"></v-list-item-title>

              <v-list-item-subtitle style="color: #DAD7CD" v-text="book.author"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1" @click="deleteBook(book.id, book.title)">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-btn v-if="this.books.length == 0" style="margin-left: auto; margin-right: auto; min-width: 45%;" color="secondary" disabled>
            Order the books
          </v-btn>
          <v-btn v-else style="margin-left: auto; margin-right: auto; min-width: 45%;" color="secondary" @click="orderBooks">
            Order the books
          </v-btn>
          <v-btn
            style="margin-left: auto; margin-right: auto; min-width: 45%;"
            color="secondary"
            @click="goToBooks"
          >
            Continue to add books
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card
        v-else
        color="third"
        style="color: #DAD7CD; margin: auto auto auto auto; margin-top: 5%"
        elevation="5"
        height="220px"
        width="50%"
      >
        <v-card-title></v-card-title>
        <v-card-text style="margin-top: 30px">
          <p style="text-align: center; font-size: 30px; color: #DAD7CD">There are no books in the basket</p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            style="margin-left: auto; margin-right: auto; min-width: 30%; margin-top: 20px"
            color="secondary"
            @click="goToBooks"
          >
            Go to the books page
          </v-btn>
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
    data: () => ({
      books: [],
      areBooks: false,
      doneoredered: false,
      snackbarError: false,
      snackbarConfirm: false,
      timeout: 4000,
      snackbarText: "",
    }),
    methods: {
      goToLogin() {
        window.location.href = "http://localhost:8080/#/"
      },
      goToBooks() {
        window.location.href = "http://localhost:8080/#/managebooks"
      },
      deleteBook(id, title) {
        this.books = this.books.filter(obj => obj.id !== id);
        this.$root.$basket = this.$root.$basket.filter(obj => obj.title !== title)
      },
      orderBooks() {
        // console.log(this.books);
        let email = this.$root.$userEmail
        let name = this.$root.$userName
        if (this.books.length == 0) {
          this.snackbarError = true
          this.snackbarText = "You need at least one book in the basket"
          return
        }
        // console.log(this.$root.$userEmail);
        // console.log(this.books);
        let bookTitles = []
        for (let book = 0; book < this.books.length; book++) {
          bookTitles.push(this.books[book].title);
        }
        // console.log(bookTitles);
        // return
        axios.post('http://localhost:3008/api/order-books?books='+ bookTitles +'&email='+ email +'&name='+ name)
          .then(response => {
            if (response.data.results) {
              this.snackbarConfirm = true
              this.snackbarText = "Book/s ordered"
              this.$root.$basket = []
              this.doneoredered = true
              console.log("Book ordered")
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
    created () {
      this.doneoredered = false
      let booklist = this.$root.$basket
      // console.log(booklist);
      if (booklist.length == 0) {
        this.areBooks = false
      } else {
        this.areBooks = true
        // console.log(booklist);
        this.books = booklist
      }
    },
  }
</script>