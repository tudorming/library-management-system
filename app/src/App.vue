<template>
  <v-app id="app" class="blue">
    <v-navigation-drawer
      v-model="drawer"
      app
      color="third"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6" style="color: #DAD7CD">
            Final Year Project
          </v-list-item-title>
          <v-list-item-subtitle v-if="this.$root.$userName" style="color: #DAD7CD">
            Welcome {{ this.$root.$userName }}!
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        v-if="$root.$isLoggedIn"
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon style="color: #DAD7CD">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title style="color: #DAD7CD">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="third">
      <v-app-bar-nav-icon @click="drawer = !drawer" style="color: #DAD7CD"></v-app-bar-nav-icon>

      <v-toolbar-title style="color: #DAD7CD">
        Library Management
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="$root.$isLoggedIn" color="background" @click="logout">
        logout
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-content permanent color="primary"></v-content>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: null,
        items: [
          // { title: 'Login', icon: 'mdi-login', to:'/' },
          { title: 'Dashboard', icon: 'mdi-view-dashboard', to:'/dashboard' },
          // { title: 'Books', icon: 'mdi-book-open-page-variant-outline', to:'/books' },
          { title: 'Books', icon: 'mdi-book-open-page-variant-outline', to:'/managebooks' },
          // { title: '3DBooks', icon: 'mdi-book-open-page-variant-outline', to:'/renderedBooks' },
          { title: 'Books to Lend', icon: 'mdi-book-arrow-right-outline', to:'/lendbooks' },
          { title: 'Books to be Returned', icon: 'mdi-book-arrow-left-outline', to:'/returnedbooks' },
          { title: 'Basket', icon: 'mdi-basket-outline', to:'/basket' },
          { title: 'Account', icon: 'mdi-account-box-outline', to:'/account' },
          { title: 'Logs', icon: 'mdi-list-box-outline', to:'/logs' },
          // { title: 'About', icon: 'mdi-help-box', to:'/about' },
        ],
      }
    },

    // data: () => ({ 
    //   drawer: null,
    //   items: [
    //     { title: 'Login', icon: 'mdi-login', to:'/' },
    //     { title: 'Dashboard', icon: 'mdi-view-dashboard', to:'/dashboard' },
    //     { title: 'Books', icon: 'mdi-book-open-page-variant-outline', to:'/books' },
    //     { title: 'Manage Books', icon: 'mdi-book-open-page-variant-outline', to:'/managebooks' },
    //     { title: 'Study Spaces', icon: 'mdi-chair-rolling', to:'/studySpaces' },
    //     { title: 'Basket', icon: 'mdi-basket-outline', to:'/basket' },
    //     { title: 'Account', icon: 'mdi-account-box-outline', to:'/account' },
    //     { title: 'Logs', icon: 'mdi-list-box-outline', to:'/logs' },
    //     { title: 'About', icon: 'mdi-help-box', to:'/about' },
    //   ],
    // }),

    methods: {
      logout() {
        // console.log("merge?");
        this.$root.$isLoggedIn = false
        this.$root.$basket = []
        this.$root.$userEmail = ''
        this.$root.$userName = ''
        window.location.href = "http://localhost:8080/#/"
      },
    }
  }
</script>

<style scoped>
  .v-application {
    background-color: #DAD7CD;
  }
</style>