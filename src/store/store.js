import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const ccxt = require('ccxt')
// here I define the data of my app
export default new Vuex.Store({
  state: {
    exchanges: [...ccxt.exchanges],
    exchange: '',
    pairs: [],
    pair: '',
    trades: []
  },
  mutations: {
    // Receives the value of the exchange from receiveExchange action and passes the value to the state
    receiveExchange (state, payload) {
      state.exchange = payload
      console.log(state.exchange)
    },
    // Receives the pairs from the action and passes the value to the state
    getMarkets (state, payload) {
      state.pairs = payload
    },
    // Receives the selected pair from the action and passes the value to the state
    receivePair (state, payload) {
      state.pair = payload
      console.log(state.pair)
    },
    receiveTrades (state, payload) {
      state.trades = payload
    }
  },
  actions: {
    // async function that instantiates the exchange and retrieves the pairs. It sends the pairs to the getMarkets mutation
    async getMarkets ({commit, state}, exchange) {
      try {
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        let newExchange = new ccxt[state.exchange]({ 'proxy': proxy, 'timeout': 20000 })
        let pairs = await newExchange.loadMarkets()
        commit('getMarkets', pairs)
      } catch (error) {
        alert('There has been an error. Please try again later')
        console.log(error)
      }
    },
    // Receives the exchange from the exchange component and passes it with commit to the receiveExchange mutation
    receiveExchange ({commit}, exchange) {
      commit('receiveExchange', exchange)
    },
    // Receives the pair from the pair component and passes it with commit to the receivePair mutation
    receivePair ({commit}, pair) {
      commit('receivePair', pair)
    },
    async getTrades ({commit, state}) {
      try {
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        let newExchange = new ccxt[state.exchange]({ 'proxy': proxy, 'timeout': 20000 })
        let since = newExchange.seconds()
        const symbol = state.pair
        const limit = 20
        const trades = await newExchange.fetchTrades(symbol, since, limit)
        commit('receiveTrades', trades)
      } catch (error) {
        alert('There has been an error. Please try again later')
        console.log(error)
      }
    }
  }
})
