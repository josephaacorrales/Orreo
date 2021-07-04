<template>
  <v-app id="app">
    <!-- App Bar -->
    <v-app-bar
      dark
      app
      color="#fcb69f"
      src="..\src\assets\images\GW2_Official\pattern6.jpg"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.4), rgba(128,208,199,.5)"
        />
      </template>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title>Orreo</v-toolbar-title>
    </v-app-bar>
    <!-- Navigation Drawer -->
    <v-navigation-drawer
      absolute
      v-model="drawer"
      temporary
    >
      <v-list subheader>
        <v-img
          src="..\src\assets\images\GW2_Official\pattern5.jpg"
          gradient="to top right, rgba(10,84,122,.7), rgba(64,100,64,.5)"
          :height="$vuetify.breakpoint.smAndDown ? '56px' : '64px'"
        >
          <v-list-item dark>
            <v-list-item-content class="pt-2">
              <v-toolbar-title>Orreo</v-toolbar-title>
              <v-list-item-subtitle>
                Navigation
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-img>
        <v-list-item
          to="/"
          class="mt-0"
        >
          <v-list-item-title>Enter API Key</v-list-item-title>
        </v-list-item>
        <v-list-item
          :disabled="!authenticated"
          to="/daily-crafting"
        >
          <v-list-item-title>Daily Crafting</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <router-view />
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

<style scoped>
#nav-drawer-header {
  background-image: url('assets/images/GW2_Official/pattern4.jpg') !important;
}
</style>
