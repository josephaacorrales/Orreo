<template>
  <v-list-item>
    <v-list-item-content v-if="itemObject">
      <v-list-item-title>{{ itemObject.name }}</v-list-item-title>
    </v-list-item-content>
    <v-list-item-content v-else>
      <v-list-item-title>Something is wrong with this item.</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
import { craftingItemIds } from '../store/index'
export default {
  name: 'CraftingItem',
  props: {
    item: {
      required: true,
      type: String
    }
  },
  computed: {
    itemObject () {
      return this.$store.getters.dailyCraftingItems.find(item => item.id === craftingItemIds[this.item])
    }
  }
}
</script>
