<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-img :src="item.icon" />
    </v-list-item-avatar>
    <v-list-item-content v-if="item">
      <v-list-item-title>{{ item.name }}</v-list-item-title>
      <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
      <v-list-item-subtitle v-if="item.ingredients">
        <div>Ingredients: <br></div>
        <div
          v-for="(ingredient, index) in item.ingredients"
          :key="ingredient.name"
        >
          {{ `${ingredient.count} x ${ingredient.name}` }}
          <br v-if="!(index === item.ingredients.count - 1)">
        </div>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-content v-else>
      <v-list-item-title>Something is wrong with this item.</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
export default {
  name: 'CraftingItem',
  props: {
    item: {
      required: true,
      type: Object
    }
  }
}
</script>

<style scoped>
  /**
    Overwrite for Vuetify list stylings.
    Allows v-list-item-subtitle component height to stretch beyond the 3 line limit.
  */
  .v-list-item__subtitle {
    white-space: normal;
  }
</style>
