<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-img
        v-if="itemData"
        :src="itemData.icon"
      />
    </v-list-item-avatar>
    <v-list-item-content v-if="itemData">
      <v-list-item-title>{{ itemData.name }}</v-list-item-title>
      <v-list-item-subtitle>{{ itemData.description }}</v-list-item-subtitle>
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
    itemData () {
      return this.$store.getters.dailyCraftingItems.find(item => item.id === craftingItemIds[this.item])
    }
  }
}
</script>
