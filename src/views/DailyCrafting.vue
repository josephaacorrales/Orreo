<template>
  <div>
    <h3 class="v-heading text-h4 my-4">
      Daily Crafting
    </h3>
    <v-list>
      <div v-if="notCrafted.length">
        <v-subheader>Incomplete</v-subheader>
        <v-divider class="mb-2 orange" />
      </div>
      <crafting-item
        v-for="item in notCrafted"
        :key="item.id"
        :item="item"
      />
      <div
        class="mt-2"
        v-if="crafted.length"
      >
        <v-subheader>Complete</v-subheader>
        <v-divider class="mb-2 green" />
      </div>
      <crafting-item
        v-for="item in crafted"
        :key="item.id"
        :item="item"
      />
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CraftingItem from '../components/CraftingItem.vue'

export default {
  name: 'DailyCrafting',
  components: { CraftingItem },
  created () {
    this.fetchAccountDailyCrafting()
  },
  // Fetch required data on route entry
  watch: {
    $route: 'fetchAccountDailyCrafting'
  },
  computed: {
    ...mapGetters(['notCrafted', 'crafted'])
  },
  methods: {
    fetchAccountDailyCrafting () {
      this.$store.dispatch('fetchAccountDailyCrafting')
    }
  }
}
</script>
