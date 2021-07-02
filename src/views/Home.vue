<template>
  <div>
    <h3 class="v-heading text-h4 my-4">Welcome</h3>
    <v-form
      ref="form"
      v-model="valid"
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
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    valid: true,
    apiKey: '',
    apiKeyRules: [
      v => !!v || 'API key is required'
    ]
  }),
  methods: {
    submitForm () {
      this.$store.dispatch('validateApiKey', this.apiKey)
    },
    validateForm () {
      this.$refs.form.validate() && this.submitForm()
    }
  },
  computed: {
    authenticated () { return this.$store.getters.authenticated }
  },
  watch: {
    authenticated () {
      // redirect to /daily-crafting when authenticated
      if (this.authenticated) {
        this.$router.push('/daily-crafting')
      }
    }
  }
}
</script>
