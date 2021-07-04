<template>
  <div>
    <h3
      class="v-heading text-h4 my-4"
    >
      Daily Crafting
    </h3>
    <v-list>
      <v-subheader>Incomplete</v-subheader>
      <v-divider class="mb-2 orange" />
      <crafting-item
        v-for="item in notCrafted"
        :key="item.id"
        :item="item"
      />
      <v-subheader class="mt-2">Complete</v-subheader>
      <v-divider class="mb-2 green" />
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
import CraftingItem from '../components/CraftingItem'
export default {
  name: 'DailyCrafting',
  components: { CraftingItem },
  data: () => ({
    loading: false,
    error: null,
    dialog: false
  }),
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
