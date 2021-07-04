import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiKey: '',
    authenticated: false,
    accountDailyCrafting: [],
    dailyCrafting: [
      'charged_quartz_crystal',
      'glob_of_elder_spirit_residue',
      'lump_of_mithrilium',
      'spool_of_silk_weaving_thread',
      'spool_of_thick_elonian_cord'
    ],
    dailyCraftingItemIds: {
      lump_of_mithrilium: 46742,
      charged_quartz_crystal: 43772,
      glob_of_elder_spirit_residue: 46744,
      spool_of_silk_weaving_thread: 46740,
      spool_of_thick_elonian_cord: 46745
    },
    gameItems: [
      {
        name: 'Lump of Mithrillium',
        description: 'Used in the refinement of deldrimor steel.',
        type: 'CraftingMaterial',
        vendor_value: 80,
        id: 46742,
        ingredients: [
          {
            name: 'Mithril Ingot',
            count: 50
          },
          {
            name: 'Glob of Ectoplasm',
            count: 1
          },
          {
            name: 'Thermocatalytic Reagent',
            count: 10
          }
        ],
        chat_link: '[&AgGWtgAA]',
        icon: 'https://render.guildwars2.com/file/BAF140ED460135E04101146CC8CE9EFB5698F077/631490.png'
      },
      {
        name: 'Glob of Elder Spirit Residue',
        description: 'Used in the refinement of spiritwood.',
        type: 'CraftingMaterial',
        vendor_value: 80,
        id: 46744,
        ingredients: [
          {
            name: 'Elder Wood Plank',
            count: 50
          },
          {
            name: 'Glob of Ectoplasm',
            count: 1
          },
          {
            name: 'Thermocatalytic Reagent',
            count: 10
          }
        ],
        chat_link: '[&AgGYtgAA]',
        icon: 'https://render.guildwars2.com/file/131F51B9177E2AEB75326901021C42CB3169452D/631492.png'
      },
      {
        name: 'Spool of Silk Weaving Thread',
        description: 'Used in the weaving of damask.',
        type: 'CraftingMaterial',
        vendor_value: 80,
        id: 46740,
        ingredients: [
          {
            name: 'Bolt of Silk',
            count: 100
          },
          {
            name: 'Glob of Ectoplasm',
            count: 1
          },
          {
            name: 'Spool of Gossamer Thread',
            count: 25
          }
        ],
        chat_link: '[&AgGUtgAA]',
        icon: 'https://render.guildwars2.com/file/45C6FC08BE801CFC31C455A8684A963B51A73759/631488.png'
      },
      {
        name: 'Spool of Thick Elonian Cord',
        description: 'Used in the refinement of elonian leather.',
        type: 'CraftingMaterial',
        vendor_value: 80,
        id: 46745,
        ingredients: [
          {
            name: 'Cured Thick Leather Square',
            count: 50
          },
          {
            name: 'Glob of Ectoplasm',
            count: 1
          },
          {
            name: 'Thermocatalytic Reagent',
            count: 10
          }
        ],
        chat_link: '[&AgGZtgAA]',
        icon: 'https://render.guildwars2.com/file/643E2343E5B573664DD8010ACBD9B5BD970E305C/631493.png'
      },
      {
        name: 'Charged Quartz Crystal',
        description: 'Transform 25 Quartz into a Charged Quartz Crystal at a place of power.',
        type: 'CraftingMaterial',
        vendor_value: 50,
        id: 43772,
        chat_link: '[&AgH8qgAA]',
        icon: 'https://render.guildwars2.com/file/10ABB44B459640C30CB8BFAEA9DFEAE19C6ECD67/603251.png'
      }
    ],
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
    gameItems (state) {
      return state.gameItems
    },
    notCrafted (state) {
      return state.notCrafted
    },
    crafted (state) {
      return state.crafted
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
    setgameItems (state, gameItems) {
      state.gameItems = gameItems
    },
    buildNotCrafted (state) {
      const notCraftedItemNames = state.dailyCrafting.filter(item => !state.accountDailyCrafting.includes(item))
      state.notCrafted = notCraftedItemNames.map(mappedItem => state.gameItems.find(gameItem => gameItem.id === state.dailyCraftingItemIds[mappedItem]))
    },
    buildCrafted (state) {
      state.crafted = state.accountDailyCrafting.map(item => state.gameItems.find(gameItem => gameItem.id === state.dailyCraftingItemIds[item]))
    },
    logout (state) {
      state.apiKey = ''
      state.authenticated = false
      state.accountDailyCrafting = []
    }
  },
  actions: {
    fetchAccountDailyCrafting ({ commit, getters }) {
      const res = axios.get('https://c2h7nmi4zd.execute-api.us-west-2.amazonaws.com/default/fetchAccountDailyCrafting/', { params: { 'gw2-api-key': getters.apiKey } })
      res.then(response => {
        if (response.status === 200) {
          commit('setAuthenticated', true)
          commit('setAccountDailyCrafting', response.data)
          commit('buildNotCrafted')
          commit('buildCrafted')
        }
      }).catch(error => { console.log(error) })
      return res
    }
  }
})
