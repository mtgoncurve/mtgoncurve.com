<template>
  <div id="app" class="hero is-small is-bold">
    <div class="hero-head">
      <Header />
    </div>
    <div class="hero-body">
      <router-view></router-view>
    </div>
    <div class="hero-foot">
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
  name: "App",
  components: { Header, Footer }
};
</script>

<style lang="scss">
@import ".~bulma/sass/utilities/_all.sass";
$table-cell-padding: 0.05em 0.5em;
$table-row-active-background-color: $cyan;
$footer-background-color: $white;
@import "~bulma";
body {
  font-family: "Georgia";
}
</style>
