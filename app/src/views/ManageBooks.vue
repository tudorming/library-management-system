<template>
  <div v-if="$root.$isLoggedIn" class="books">
    <h1 style="text-align: center;">This is the manage books page</h1>
    <h2 style="text-align: center;">Here you can search, select, view, edit, add and delete.</h2>
    <v-row style="margin-left: auto; margin-right: auto; width: 90%; margin-top: 40px;">
      <v-col>
        <v-text-field
          color="third"
          v-model="search"
          @keydown.enter.prevent="initialize"
          label="Search by title"
          append-icon="mdi-card-search-outline"
          clearable
          outlined
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          color="third"
          v-model="searchauthor"
          @keydown.enter.prevent="initialize"
          label="Search by author"
          append-icon="mdi-card-search-outline"
          clearable
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row style="margin-left: auto; margin-right: auto; width: 90%;margin-top: -20px">
      <v-col>
        <v-text-field
          color="third"
          v-model="searchpublisher"
          @keydown.enter.prevent="initialize"
          label="Search by publisher"
          append-icon="mdi-card-search-outline"
          clearable
          outlined
        ></v-text-field>
      </v-col>
      <v-col>
        <v-select
          color="third"
          label="Search by category"
          v-model="category"
          :items="categoryItems"
          @input="initialize"
          append-icon="mdi-card-search-outline"
          clearable
          outlined
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          color="third"
          label="Search by degree"
          v-model="studyfield"
          :items="degreeItems"
          @input="initialize"
          append-icon="mdi-card-search-outline"
          clearable
          outlined
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          color="third"
          v-model="studyyear"
          :items="yearItems"
          @input="initialize"
          label="Search by year of study"
          append-icon="mdi-card-search-outline"
          clearable
          outlined
        ></v-select>
      </v-col>
    </v-row>
    
    <v-card color="third" style="margin-left: auto; margin-right: auto; width: 90%; margin-top: 20px;" class="elevation-5">
      <v-data-table
        v-model="selectedBooks"
        show-select
        id="tblBooks"
        style="color: #DAD7CD"
        dense
        :headers="headersBooks"
        :items="books"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        :items-per-page="itemsPerPage"
        :page.sync="page"
        :single-select="singleSelect"
        hide-default-footer
        item-key="title"
        show-expand
        class="elevation-1 third"
      >
        <template v-slot:top>
          <v-toolbar
            flat
            color="third"
          >
            <v-toolbar-title style="color: #DAD7CD" class="third">CRUD Books Table</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-toolbar-title v-if="stringSelectedBooks" style="color: #DAD7CD; font-size: 14px" class="third">Selected books: {{stringSelectedBooks}}</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="secondary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Book
                </v-btn>
              </template>
              <v-card color="third">
                <v-card-title>
                  <span style="color:#DAD7CD" class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.title"
                          label="Book Title*"
                          color="primary"
                          dark
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.author"
                          label="Author*"
                          color="primary"
                          dark
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.publisher"
                          label="Publisher*"
                          color="primary"
                          dark
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-select
                          color="primary"
                          dark
                          label="Category*"
                          v-model="editedItem.category"
                          :items="categoryItems"
                          append-icon="mdi-card-search-outline"
                          clearable
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-select
                          color="primary"
                          dark
                          label="Study Field"
                          v-model="editedItem.studyfield"
                          :items="degreeItems"
                          append-icon="mdi-card-search-outline"
                          clearable
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-select
                          color="primary"
                          dark
                          v-model="editedItem.studyyear"
                          :items="yearItems"
                          label="Study Year"
                          append-icon="mdi-card-search-outline"
                          clearable
                          outlined
                        ></v-select>
                      </v-col>
                      <!-- <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-file-input
                          value="undefined"
                          accept="image/*"
                          dark
                          color="primary"
                          label="Front Image"
                          v-model="front"
                        ></v-file-input>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-file-input
                          value="undefined"
                          accept="image/*"
                          dark
                          color="primary"
                          label="Back Image"
                          v-model="back"
                        ></v-file-input>
                      </v-col><v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-file-input
                          value="undefined"
                          accept="image/*"
                          dark
                          color="primary"
                          label="Side Image"
                          v-model="side"
                        ></v-file-input>
                      </v-col><v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-file-input
                          value="undefined"
                          color="primary"
                          dark
                          accept="image/*"
                          label="Page Image"
                          v-model="page"
                        ></v-file-input>
                      </v-col> -->
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="background"
                    text
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="background"
                    text
                    @click="save"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="510px">
              <v-card color="third">
                <v-card-title style="color:#DAD7CD" class="text-h5">Are you sure you want to delete this book?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="background" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="background" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td v-if="item.page == null" color="fourth" style="height: 100px" class="elevation-5" :colspan="headers.length">
            No images available for {{ item.title }} by {{ item.author }}
          </td>
          <td v-else color="fourth" style="height: 600px; overflow: hidden" class="elevation-5" :colspan="headers.length">
            <ThreeJSBook ref="book" style="margin-left: 50px"
              :frontTexture="item.front"
              :backTexture="item.back"
              :sideTexture="item.side"
              :pageTexture="item.page"
            />
          </td>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            dark
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            dark
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
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
            @click="addToBasket"
          >
            Add to basket
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            color="secondary"
            dark
            class="mb-2"
            @click="goToBasket"
          >
            Go to basket page
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <v-card
      color="third"
      elevation="5"
      style="margin-top: 50px; color: #DAD7CD;"
      max-width="600"
      class="mx-auto"
    >
      <v-card-title style="color:#DAD7CD" class="text-h5">Select a book to view recommendations</v-card-title>

      <v-list
        v-if="areRecommendations"
        color="third"
        header
        two-line
      >
        <!-- <h2 style="margin-left: 15px; color: #DAD7CD">Select a book to view recommendations</h2> -->

        <v-list-item
          
          v-for="book in recommendedBooks"
          :key="book.title"
        >
          <v-list-item-content>
            <v-list-item-title style="color: #DAD7CD" v-text="book.title"></v-list-item-title>

            <v-list-item-subtitle style="color: #DAD7CD" v-text="book.author"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1" @click="addToSelectedBooks(book)">mdi-plus-outline</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
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
  import ThreeJSBook from '@/components/ThreeJSBook.vue'
  export default {
    components: {
      ThreeJSBook
    },
    data: () => ({
      singleSelect: false,
      selectedBooks: [],
      degreeItems: ['Computer Science','Physics'],
      yearItems: ['1st','2nd','3rd','4th'],
      categoryItems: ['Education', 'Fiction', 'History'],

      front: '',
      back: '',
      side: '',
      page: '',

      search: '',
      searchauthor: '',
      studyfield: '',
      studyyear: '',
      searchpublisher:'',
      category: '',

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
      dialog: false,
      dialogDelete: false,
      expanded: [],
      singleExpand: true,
      headersBooks: [
        {
          text: 'Title',
          align: 'start',
          sortable: false,
          value: 'title',
          class: 'primary--text'
        },
        { text: 'Author', value: 'author', class: 'primary--text', sortable: false },
        { text: 'Publisher', value: 'publisher', class: 'primary--text', sortable: false },
        { text: 'Category', value: 'category', class: 'primary--text', sortable: false },
        // { text: 'No. of copies', value: 'nrcopy', class: 'primary--text', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false, class: 'primary--text' },
      ],
      books: [],
      editedIndex: -1,
      editedItem: {
        title: '',
        author: '',
        publisher: '',
        category: '',
        studyfield: '',
        studyyear: '',
        front: '',
        back: '',
        side: '',
        page: '',
      },
      defaultItem: {
        title: '',
        author: '',
        publisher: '',
        category: '',
        studyfield: '',
        studyyear: '',
        front: '',
        back: '',
        side: '',
        page: '',
      },
      recommendedBooks: [],
      areRecommendations: false,
      stringSelectedBooks: '',
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Book' : 'Edit Book'
      },
      totalRecords() {
        return this.books.length
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

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      selectedBooks (val) {
        if (val.length > 3) {
          val.pop()
        }
        this.stringSelectedBooks = ''
        for (let book = 0; book < val.length; book++) {
          if (book == val.length -1) {
            this.stringSelectedBooks = this.stringSelectedBooks + val[book].title + ' '
          } else {
            this.stringSelectedBooks = this.stringSelectedBooks + val[book].title + ', '
          }
        }
        if (val.length == 0) {
          this.areRecommendations = false
        } else if (val.length == 1) {
          this.areRecommendations = true
          let booktitle = val[0].title
          let bookauthor = val[0].author
          let bookcategory = val[0].category
          let bookpublisher = val[0].publisher
          // for jaccard similarity change api with get-recommendedBooks-jaccard
          // for content based filtering change api with get-recommendedBooks
          // for cosine similiarity change api with get-recommendedBooks-cosine
          // for nlp techniques change api with get-recommendedBooks-nlp
          axios.get('http://localhost:3008/api/get-recommendedBooks?title='+ booktitle +'&author='+ bookauthor +'&publisher='+ bookpublisher +'&category='+ bookcategory)
          .then(response => {
            if (response.data.results) {
              this.recommendedBooks = response.data.results
              // console.log(this.recommendedBooks);
              // console.log(this.books[0].front);
              // console.log("books gathered")
            } else if (response.data.results == []){
              this.snackbarError = true
              this.books = []
              this.snackbarText = "No recommended books found"
              console.log("No recommended books found")
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
        } else {
          this.areRecommendations = true
        }
      }
    },

    created () {
      this.initialize()
    },

    // mounted() {
    //   const book = this.$refs.book;
    //   book.addEventListener('wheel', this.handleWheel(), { passive: false });
    //   book.focus({
    //     preventScroll: true,
    //   });
    // },

    methods: {
      addToSelectedBooks(bookSelected) {
        const isBookInArray = this.selectedBooks.some(obj => obj.title === bookSelected.title);
        if (isBookInArray) {
          this.snackbarError = true
          this.snackbarText = "This book is already selected"
          return
        }
        if (this.selectedBooks.length < 3) {
          this.selectedBooks.push(bookSelected)
          // console.log(this.selectedBooks);
        } else {
          this.snackbarError = true
          this.snackbarText = "There are already 3 (max) books selected"
        }
        this.recommendedBooks = this.recommendedBooks.filter(book => book.title !== bookSelected.title)
      },
      goToLogin() {
        window.location.href = "http://localhost:8080/#/"
      },
      addToBasket() {
        if (this.selectedBooks.length == 0) {
          this.snackbarError = true
          this.snackbarText = "There are no books selected"
          return
        }
        let soontobasket = this.$root.$basket.concat(this.selectedBooks)
        if (soontobasket.length > 3) {
          this.snackbarError = true
          this.snackbarText = "With this selection, there are already the maximum no. of books in the basket"
          return
        }
        const duplicates = this.$root.$basket.concat(this.selectedBooks).filter((item, index, arr) => {
          return arr.indexOf(item) !== index;
        });
        if (duplicates.length > 0) {
          this.snackbarError = true
          this.snackbarText = "The selection has atleast a duplicate in the basket"
          return
        }
        this.$root.$basket = soontobasket
        this.selectedBooks = []
        this.snackbarConfirm = true
        this.snackbarText = "Book/s added to basket"
      },
      goToBasket() {
        window.location.href = "http://localhost:8080/#/basket"
      },
      // handleWheel(event) {
      //   event.preventDefault();
      //   // handle zoom logic
      // },
      initialize () {
        let urlSearch = ""
        if (this.search != "" && this.search != null) {
            if (urlSearch == "") {
                urlSearch = '?search='+this.search
            } else {
                urlSearch = urlSearch + '&search='+this.search
            }
        }
        if (this.searchauthor != "" && this.searchauthor != null) {
            if (urlSearch == "") {
                urlSearch = '?searchauthor='+this.searchauthor
            } else {
                urlSearch = urlSearch + '&searchauthor='+this.searchauthor
            }
        }
        if (this.studyfield != "" && this.studyfield != null) {
            if (urlSearch == "") {
                urlSearch = '?studyfield='+this.studyfield
            } else {
                urlSearch = urlSearch + '&studyfield='+this.studyfield
            }
        }
        if (this.studyyear != "" && this.studyyear != null) {
            if (urlSearch == "") {
                urlSearch = '?studyyear='+this.studyyear
            } else {
                urlSearch = urlSearch + '&studyyear='+this.studyyear
            }
        }
        if (this.searchpublisher != "" && this.searchpublisher != null) {
            if (urlSearch == "") {
                urlSearch = '?publisher='+this.searchpublisher
            } else {
                urlSearch = urlSearch + '&publisher='+this.searchpublisher
            }
        }
        if (this.category != "" && this.category != null) {
            if (urlSearch == "") {
                urlSearch = '?category='+this.category
            } else {
                urlSearch = urlSearch + '&category='+this.category
            }
        }

        axios.get('http://localhost:3008/api/get-books'+urlSearch)
          .then(response => {
            if (response.data.results) {
              this.books = response.data.results
              // console.log(this.books[0].front);
              // console.log("books gathered")
            } else if (response.data.results == []){
              this.snackbarError = true
              this.books = []
              this.snackbarText = "No books found"
              console.log("No books found")
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

      editItem (item) {
        this.editedIndex = item.id
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = item.id
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        //delete api
        if (this.editedIndex > -1) {
          axios.post('http://localhost:3008/api/delete-book?id='+ this.editedIndex)
            .then(response => {
              if (response.data.results) {
                this.snackbarConfirm = true
                this.snackbarText = "Book deleted"
                this.initialize()
                console.log("Book deleted")
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
          this.closeDelete()
        } else {
          this.snackbarError = true
          this.snackbarText = 'Could not delete the book'
          this.closeDelete()
        }
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          //edit api
          if (!this.editedItem.title || !this.editedItem.author || !this.editedItem.publisher || !this.editedItem.category) {
            this.snackbarError = true
            this.snackbarText = "Do not leave the title, author, publisher or category fields empty"
          }
          axios.post('http://localhost:3008/api/edit-book?title='+ this.editedItem.title +'&author='+ this.editedItem.author +'&publisher='+ this.editedItem.publisher +'&category='+ this.editedItem.category +'&studyfield='+ this.editedItem.studyfield +'&studyyear='+ this.editedItem.studyyear +'&id='+ this.editedIndex)
            .then(response => {
              if (response.data.results) {
                this.snackbarConfirm = true
                this.snackbarText = "Book edited"
                console.log("Book edited")
                this.initialize()
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
        } else {
          //add api
          if (!this.editedItem.title || !this.editedItem.author || !this.editedItem.publisher || !this.editedItem.category) {
            this.snackbarError = true
            this.snackbarText = "Do not leave the title, author, publisher or category fields empty"
          }
          axios.post('http://localhost:3008/api/add-book?title='+ this.editedItem.title +'&author='+ this.editedItem.author +'&publisher='+ this.editedItem.publisher +'&category='+ this.editedItem.category +'&studyfield='+ this.editedItem.studyfield +'&studyyear='+ this.editedItem.studyyear)
            .then(response => {
              if (response.data.results) {
                this.snackbarConfirm = true
                this.snackbarText = "Book added"
                this.initialize()
                console.log("Book added")
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
        this.close()
      },
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
.theme--light.v-data-table tbody tr.v-data-table__selected 
{
  background: #578560;
}
</style>