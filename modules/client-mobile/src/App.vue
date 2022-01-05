<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <section class="hero is-danger is-fullheight">
      <div class="hero-body">
        <div class="">
          <p class="title">Fullheight hero</p>
          <p class="subtitle">Fullheight subtitle</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import HelloWorld from "./components/HelloWorld.vue";

import Buefy from "buefy";
import "buefy/dist/buefy.css";

Vue.use(Buefy);

@Component({
  components: {
    // HelloWorld,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
}
</style>
