<template>
  <v-app id="app">
    <v-app-bar
      dark
      app
      color="#fcb69f"
      src="..\src\assets\images\GW2_Official\pattern6.jpg"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.3), rgba(128,208,199,.4)"
        />
      </template>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title>Orreo</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      absolute
      v-model="drawer"
      temporary
    >
      <v-list>
        <v-list-item to="/">
          <v-list-item-title>Enter API Key</v-list-item-title>
        </v-list-item>
        <v-list-item :disabled="!authenticated" to="/daily-crafting">
          <v-list-item-title>Daily Crafting</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data: () => ({
    drawer: false
  }),
  computed: {
    ...mapGetters(['authenticated'])
  }
}
</script>
