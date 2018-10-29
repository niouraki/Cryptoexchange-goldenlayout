<template id="Trades">
  <div class="trades-component">
    <h1>Trades</h1>
    <table>
      <tr>
        <th>Size</th>
        <th>Price</th>
        <th>Time</th>
      </tr>
      <tr v-for="trade in trades" :key="trade.id">
        <td class="amount">{{ trade.amount }}</td>
        <td class="price">{{ trade.price }}</td>
        <td class="datetime">{{ trade.datetime }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Trades',
  computed: {
    trades () {
      return this.$store.state.trades
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 40px;
  margin-top: 100px;
  color: #36393b;
}
table {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding: 10px;
}
.amount {
  color: #706f6f;
  font-size: 18px;
}
.price {
  color: #706f6f;
  font-size: 18px;
}
.datetime {
  color: #2d3047;
  font-size: 18px;
}
</style>
