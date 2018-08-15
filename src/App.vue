<template>
  <div id="app">
    <Nav></Nav>
    <div class="router">
      <router-view/>
    </div>
    <Foot></Foot>
    <BackTop></BackTop>
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
  .router{
    margin: 100px auto;
  }
</style>
