<template>
  <div class="container">
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item title" href="/">
        <i class="ms ms-guild-simic ms-2x"></i>&nbsp;
        MTG On Curve
      </a>
    </div>

    <div class="navbar-menu is-active">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/about">About</router-link>
        <a class="navbar-item" href="https://github.com/mtgoncurve">Github</a>
        <a class="navbar-item" href="https://github.com/mtgoncurve/mtgoncurve.com">Updated for Tarkir: Dragonstorm (TDM)</a>
        <a class="navbar-item" href="https://cardgamecalculator.com">Hypergeometric Calculator</a>
      </div>
      <div class="navbar-end">
         <div class="navbar-item">
           <div class="buttons">

            <button class="button is-success" @click="this.copyURLToClipboard">
              <span>Copy link</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <span class="subtitle is-5">Calculate the probability to play cards on curve in your Magic: The Gathering decks</span>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    last_updated: function() {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC"
      };
      return new Date(__BUILD_TIME__).toLocaleDateString("en-US", options);
    },
    copyURLToClipboard() {
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(
        function() {},
        function() {
          console.error("Unable to copy URL to clipboard. :-(");
        }
      );
    }
  }
};
</script>
