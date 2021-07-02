import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

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
      state.dailyCraftingItems = dailyCraftingItems.reduce((items, item) => {
        const key = item.name.toLowerCase().split(' ').join('_')
        items[key] = item
        return items
      }, {})
    }
    // TODO: Create object where crafting item name is key, value is fully qualified item value
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
    fetchDailyCraftingItems ({ commit, getters }) {
      // TODO: Test case comparing item ids (convert to array)
      return axios.get('https://cors-anywhere.herokuapp.com/https://api.guildwars2.com/v2/items?ids=46744,43772,46742,46740,46745')
        .then(response => {
          commit('setDailyCraftingItems', response.data)
        })
        .catch(error => { console.log(error) })
    },
    async fetchDailyCraftingData ({ dispatch, getters, commit }) {
      await Promise.all([dispatch('fetchDailyCrafting'), dispatch('fetchAccountDailyCrafting')], dispatch('fetchDailyCraftingItems'))
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
