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

</style>
