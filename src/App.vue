<template>
  <div id="app">
    <Nav></Nav>
    <div class="router" v-if="showRou">
      <router-view/>
    </div>
    <Foot v-if="showFoot"></Foot>
    <BackTop v-if="showFoot"></BackTop>
  </div>
</template>

<script>
import Foot from './components/footer-main.vue'
import Nav from './components/nav-main.vue'
export default {
  name: 'App',
  components: {
    Foot,
    Nav
  },
  data () {
    return {
      showRou: false,
      showFoot: false
    }
  },
  created () {
    // 显示content
    setTimeout(() => {
      this.showRou = true
    }, 0)
    // 显示sidebar
    setTimeout(() => {
      this.showFoot = true
    }, 0)
  }
}
</script>

<style>
  .icon {
    width: 22px;
    height: 22px;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .router{
    margin: 100px auto;
  }
</style>
