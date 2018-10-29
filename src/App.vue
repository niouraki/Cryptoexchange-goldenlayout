<template>
  <div id="app">
    <div id="golden"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import GoldenLayout from 'golden-layout'
import $ from 'jquery'

export default {
  mounted () {
    let config = {
      settings: {
        hasHeaders: true,
        constrainDragToContainer: true,
        reorderEnabled: true,
        selectionEnabled: false,
        popoutWholeStack: false,
        blockedPopoutsThrowError: true,
        closePopoutsOnUnload: true,
        showPopoutIcon: true,
        showMaximiseIcon: true,
        showCloseIcon: true
      },
      dimensions: {
        borderWidth: 5,
        minItemHeight: 10,
        minItemWidth: 10,
        headerHeight: 20,
        dragProxyWidth: 300,
        dragProxyHeight: 200
      },
      labels: {
        close: 'close',
        maximise: 'maximise',
        minimise: 'minimise',
        popout: 'open in new window'
      },
      content: [{
        type: 'row',
        content: [
          {
            type: 'component',
            componentName: 'Exchange',
            componentState: { exchange: '' }
          },
          {
            type: 'component',
            componentName: 'Pairs',
            componentState: { pair: '', pairs: [] }
          },
          {
            type: 'component',
            componentName: 'Trades',
            componentState: { trades: [] }
          }
        ]
      }]
    }
    const self = this
    const myLayout = new GoldenLayout(config, $('#golden'))

    function registerComp (name, componentName) {
      myLayout.registerComponent(componentName, function (container, state) {
        container.getElement().html(`<div id="${name}"></div>`)

        setTimeout(() => {
          const LayoutConstructor = Vue.component(name).extend({
            store: self.$store
          })
          const vm = new LayoutConstructor({
            propsData: {
              lastState: container.getState() || {},
              goldenlayoutContainer: container
            }
          })
          vm.$mount(`#${name}`)
        })
      })
    }
    registerComp('Pairs', 'Pairs')
    registerComp('Exchange', 'Exchange')
    registerComp('Trades', 'Trades')
    myLayout.init()
  },
  methods: {
    setpairs () {
      this.pairs = this.$store.state.pairs
    }
  }
}
</script>

<style>
html, body{
    margin: 0px;
    padding: 0px;
    height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  display: grid;
  grid-template-columns: auto auto auto;
  min-height: 100%;
}
</style>
