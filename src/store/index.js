import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// TODO: Document reasoning behind this choice.  API limitations.
// TODO: Test case against return from /v2/dailycrafting and this to verify ids are up to date
export const craftingItemIds = {
  lump_of_mithrilium: 46742,
  charged_quartz_crystal: 43772,
  glob_of_elder_spirit_residue: 46744,
  spool_of_silk_weaving_thread: 46740,
  spool_of_thick_elonian_cord: 46745
}

// TODO: Move Daily Crafting and other route-specific data to their own store modules
export default new Vuex.Store({
  state: {
    apiKey: '',
    authenticated: false,
    dailyCrafting: [],
    accountDailyCrafting: [],
    dailyCraftingItems: [],
    notCrafted: [],
    crafted: []
  },
  getters: {
    apiKey (state) {
      return state.apiKey
    },
    authenticated (state) {
      return state.authenticated
    },
    dailyCrafting (state) {
      return state.dailyCrafting
    },
    accountDailyCrafting (state) {
      return state.accountDailyCrafting
    },
    dailyCraftingItems (state) {
      return state.dailyCraftingItems
    },
    notCrafted (state) {
      return state.dailyCrafting.filter(item => !state.accountDailyCrafting.includes(item))
    },
    crafted (state) {
      return state.dailyCrafting.filter(item => state.accountDailyCrafting.includes(item))
    }
  },
  mutations: {
    setDailyCrafting (state, dailyCrafting) {
      state.dailyCrafting = dailyCrafting
    },
    setApiKey (state, apiKey) {
      state.apiKey = apiKey
    },
    setAuthenticated (state, authenticated) {
      state.authenticated = authenticated
    },
    setAccountDailyCrafting (state, accountDailyCrafting) {
      state.accountDailyCrafting = accountDailyCrafting
    },
    setDailyCraftingItems (state, dailyCraftingItems) {
      state.dailyCraftingItems = dailyCraftingItems
    }
  },
  actions: {
    fetchDailyCrafting ({ commit }) {
      return axios.get('https://cors-anywhere.herokuapp.com/https://api.guildwars2.com/v2/dailycrafting')
        .then(response => {
          commit('setDailyCrafting', response.data)
        })
        .catch(error => { console.log(error) })
    },
    fetchAccountDailyCrafting ({ commit, getters }) {
      return axios.get('https://cors-anywhere.herokuapp.com/https://api.guildwars2.com/v2/account/dailycrafting/', { params: { access_token: getters.apiKey } })
        .then(response => {
          commit('setAccountDailyCrafting', response.data)
        })
        .catch(error => { console.log(error) })
    },
    fetchDailyCraftingItems ({ commit }) {
      const idsString = Object.values(craftingItemIds).join(',')
      return axios.get(`https://cors-anywhere.herokuapp.com/https://api.guildwars2.com/v2/items?ids=${idsString}`)
        .then(response => {
          commit('setDailyCraftingItems', response.data)
        })
        .catch(error => { console.log(error) })
    },
    fetchDailyCraftingData ({ dispatch }) {
      Promise.all([dispatch('fetchDailyCrafting'), dispatch('fetchAccountDailyCrafting')], dispatch('fetchDailyCraftingItems'))
    },
    validateApiKey ({ commit }, apiKey) {
      commit('setAuthenticated', false)
      // TODO: Use env variables for dev and production links to api
      axios.get('https://cors-anywhere.herokuapp.com/https://api.guildwars2.com/v2/account/', { params: { access_token: apiKey } })
        .then(response => {
          if (response.data.text && response.data.text === 'Invalid access token') {
            commit('setAuthenticated', false)
          } else if (response.data.id) {
            commit('setAuthenticated', true)
            commit('setApiKey', apiKey)
          }
        })
    }
  }
})
