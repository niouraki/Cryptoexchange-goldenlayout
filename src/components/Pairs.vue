<template id="Pairs">
  <div class="pairs-component">
    <h1>Pairs</h1>
    <select :value="pair.symbol" v-on:change="getPair">
      <option disabled value="">Please select a pair</option>
      <option v-for="pair in pairs" v-bind:value="pair.symbol" :key="pair.id"> {{ pair.symbol }}</option>
    </select>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Pairs',
  computed: {
    pairs () {
      return this.$store.state.pairs
    },
    pair () {
      return this.$store.state.pair
    }
  },
  // when the select input value is changed by the user, this method will get the new value and store it
  methods: {
    // Gets the value of the pair in the input and passes it to the action receivePairs in the store
    ...mapActions(['receivePair', 'getTrades']),
    getPair (e) {
      let pair = e.target.value
      this.receivePair(pair)
      this.getTrades()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin-top: 100px;
  font-size: 40px;
  color: #36393b;
}
select {
  font-size: 18px;
  padding: 5px;
  color: #36393b;
  color: #36393b;
}
</style>
