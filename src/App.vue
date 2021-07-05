<template>
  <v-app id="app">
    <!-- App Bar -->
    <app-bar @toggleDrawer="toggleDrawer" />
    <!-- Navigation Drawer -->
    <navigation-drawer :drawer="drawer" />
    <v-main>
      <v-container>
        <home />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue'
import NavigationDrawer from './components/NavigationDrawer.vue'
import Home from './views/Home.vue'

export default {
  name: 'App',
  components: { Home, AppBar, NavigationDrawer },
  data: () => ({
    drawer: false
  }),
  methods: {
    toggleDrawer () {
      this.drawer = !this.drawer
    }
  }
}
</script>

<style scoped>
#nav-drawer-header {
  background-image: url('assets/images/GW2_Official/pattern4.jpg') !important;
}
</style>
