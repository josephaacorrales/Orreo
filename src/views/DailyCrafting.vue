<template>
  <div>
    <h3
      class="v-heading text-h3 my-4"
    >
      Daily Crafting
    </h3>
    <v-list>
      <v-list-item-group>
        <v-subheader>Need to Craft</v-subheader>
        <v-divider class="mb-2" />
        <crafting-item
          v-for="item in notCrafted"
          :key="item"
          :item="item"
        />
        <v-subheader class="mt-2">Crafted</v-subheader>
        <v-divider class="mb-2" />
        <crafting-item
          v-for="item in crafted"
          :key="item"
          :item="item"
        />
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CraftingItem from '../components/CraftingItem'
export default {
  name: 'DailyCrafting',
  components: { CraftingItem },
  data: () => ({
    loading: false,
    error: null,
    active: true
  }),
  created () {
    this.fetchDailyCraftingData()
  },
  watch: {
    $route: 'fetchDailyCraftingData'
  },
  computed: {
    ...mapGetters(['dailyCrafting', 'accountDailyCrafting', 'dailyCraftingItems', 'notCrafted', 'crafted'])
  },
  methods: {
    fetchDailyCraftingData () {
      this.$store.dispatch('fetchDailyCraftingData')
    }
  }
}
</script>
