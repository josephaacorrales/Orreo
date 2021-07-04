<template>
  <div>
    <div v-if="!authenticated">
      <h3 class="v-heading text-h4 my-4">Welcome</h3>
      <v-form
        ref="form"
        lazy-validation
        @submit.prevent="validateForm"
      >
        <v-text-field
          v-model="apiKey"
          :rules="apiKeyRules"
          label="Guild Wars 2 API Key"
          required
        />
        <div class="text-right">
          <v-btn
            type="submit"
            dark
            class="my-2"
            color="teal"
          >
            Use this Key
          </v-btn>
        </div>
      </v-form>
    </div>
    <router-view v-else />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    apiKeyRules: [
      v => !!v || 'API key is required'
    ]
  }),
  methods: {
    validateForm () {
      this.$refs.form.validate() && this.submitForm()
    },
    async submitForm () {
      const response = await this.$store.dispatch('fetchAccountDailyCrafting')
      if (response.status === 200 && this.$route.name === 'Home') this.$router.push('/daily-crafting')
    }
  },
  computed: {
    apiKey: {
      get () { return this.$store.getters.apiKey },
      set (apiKey) { this.$store.commit('setApiKey', apiKey) }
    },
    authenticated () { return this.$store.getters.authenticated }
  }
}
</script>
