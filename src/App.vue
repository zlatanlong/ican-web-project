<template>
  <div id="app">
    <Nav></Nav>
    <router-view/>
    <Foot></Foot>
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
</style>
