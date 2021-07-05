<template>
  <v-navigation-drawer
    absolute
    :value="drawer"
    temporary
  >
    <v-list subheader>
      <v-img
        src="..\assets\GW2_Asset_Kit\pattern5.jpg"
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
        :disabled="!authenticated"
        to="/daily-crafting"
      >
        <v-list-item-title>Daily Crafting</v-list-item-title>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn
          block
          v-if="authenticated"
          @click="logout"
        >
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavigationDrawer',
  props: {
    drawer: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters(['authenticated'])
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      this.$router.push('/')
    }
  }
}
</script>
