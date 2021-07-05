<template>
  <v-app-bar
    dark
    app
    color="#fcb69f"
    src="..\assets\images\GW2_Official\pattern6.jpg"
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(19,84,122,.4), rgba(128,208,199,.5)"
      />
    </template>
    <v-app-bar-nav-icon
      @click.stop="$emit('toggleDrawer')"
    />
    <v-toolbar-title>Orreo</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar'
}
</script>
