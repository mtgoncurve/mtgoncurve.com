<template>
  <div class="container">
    <div class="columns">
      <div class="column is-one-third">
        <h4 class="title is-4 inline">Inputs</h4>
        <input-panel />
      </div>
      <div class="column is-two-thirds">
        <h4 class="title is-4 inline">Results</h4>
        <span class="">({{numberWithCommas(runs)}} / {{numberWithCommas(total_runs)}} runs)</span>
        <results-panel />
        <div class="columns" v-if="showHandStatTags">
          <div class="column is-two-thirds">
            <span class="title is-4">Mana Sources</span>
            <lands-panel />
          </div>
          <div class="column is-one-thirds">
            <h4 class="title is-4 inline">Deck Statistics</h4>
            <stats-panel />
          </div>
        </div>
        <div clas="container">
          <div class="footnote" v-if="showSplitCardFootnote">
      <sup>
        <span>&#8224;</span>
      </sup>
      Results shown for the left-most card. Use the right-most card name to instead see its results.
    </div>
    <div class="footnote" v-if="showXManaCostFootnote">
      <sup>
        <span>&#42;</span>
      </sup>
      You can specify the
      <i class="ms msi ms-fw ms-cost ms-x"></i> mana cost by appending 
      <span
        class="has-text-black has-background-grey-light"
      ># X = 4</span> to the end of the card line in the deck list.
    </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResultsPanel from "./ResultsPanel.vue";
import InputPanel from "./InputPanel.vue";
import LandsPanel from "./LandsPanel.vue";
import StatsPanel from "./StatsPanel.vue";

export default {
  name: "Calculator",
  components: {InputPanel, LandsPanel, StatsPanel, ResultsPanel },
  data() {
    return {
      debug: false
    };
  },
  watch: {
    encoding: function(encoding) {
      if (encoding == null || encoding === undefined) {
        console.log("Unexpected null or undefined encoding");
        return;
      }
      const url = new URL(document.location);
      url.searchParams.set("v0", encoding);
      history.replaceState({}, null, url);
    }
  },
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  computed: {
    encoding: {
      get() {
        return this.$store.getters.base64EncodedInputs;
      }
    },
    showHandStatTags: {
      get() {
        return this.runs > 0;
      }
    },
    runs: {
      get() {
        return this.$store.state.outputs.accumulated_runs;
      }
    },
    total_runs: {
      get() {
        return this.$store.state.outputs.total_runs;
      }
    },
    showSplitCardFootnote() {
      return this.$store.state.outputs.accumulated_stats.some(d => d.card.name.includes("//"));
    },
    showXManaCostFootnote() {
      return this.$store.state.outputs.accumulated_stats.some(d => d.card.mana_cost_string.includes("{X}"));
    },
  },
  created: function() {
    this.$store.dispatch("spawnWorker");
  },
  mounted: function() {
    // Retrieve the base64 inputs encoding found after the # in the URL
    const search_params = new URL(document.location).searchParams;
    this.$data.debug = search_params.get("debug") === "true";
    const encoding = search_params.get("v0");
    if (!encoding) {
      return;
    }
    this.$store.dispatch("initializeWithBase64Encoding", encoding);
  }
};
</script>

<style lang="scss">
.inline {
  display: inline;
}
</style>
