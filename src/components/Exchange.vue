<template id="Exchange">
  <div class="exchange-component">
    <h1>Exchange</h1>
    <select :value="exchange" v-on:change="getExchange">
      <option disabled value="">Please select an exchange</option>
      <option v-for="exchange in exchanges" v-bind:value="exchange" :key="exchange.id">{{ exchange }}</option>
    </select>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Exchange',
  computed: {
    exchanges () {
      return this.$store.state.exchanges
    },
    exchange () {
      return this.$store.state.exchange
    }
  },
  methods: {
    ...mapActions(['getMarkets', 'receiveExchange']),
    // Gets the value of the exchange in the input and passes it to the action receiveExchange in the store
    getExchange (e) {
      let exchange = e.target.value
      this.receiveExchange(exchange)
      this.getMarkets()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.exchange-component {
  height: 100%;
}
h1 {
  margin-top: 100px;
  font-size: 40px;
  color: #36393b;
}
select {
  font-size: 18px;
  padding: 5px;
}
</style>
