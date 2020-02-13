<template>
    <div>
      <div class="tags">
        <span class="tag is-medium is-light">
          <i class="ms msi ms-fw ms-cost ms-tap"></i>&nbsp;
          <span class="has-text-weight-semibold">{{pad(deck_size, 2)}} cards</span>&nbsp;
        (<mana-color-count class="inline" v-bind:counts="total_non_land_counts" v-bind:showColorless="false"/>)
        </span>
        <span class="tag is-medium is-light">
          <i class="ms msi ms-fw ms-cost ms-land"></i>&nbsp;
          <span class="has-text-weight-semibold">{{pad(total_land_counts.total, 2)}} lands</span>&nbsp;
        (<mana-color-count class="inline" v-bind:counts="total_land_counts"/>)
        </span>
        <span class="tag is-medium is-light">
          <span class="has-text-weight-semibold">{{average_opening_hand_size}}</span>&nbsp;| Expected cards in opening hand
        </span>
        <span class="tag is-medium is-light">
          <span class="has-text-weight-semibold">{{average_lands_in_opening_hand}}</span>&nbsp;| Expected lands in opening hand
        </span>
        <span class="tag is-medium is-light">
          <span class="has-text-weight-semibold">{{deck_average_cmc}}</span>&nbsp;| Average non-land CMC
        </span>
        <div hidden>
          <span class="tag is-medium is-light">
            <span class="has-text-weight-semibold">{{recommended_land_count}}</span>&nbsp;| Recommended land count
          </span>
        </div>
      </div>
  </div>
</template>

<script>
import ManaColorCount from "./ManaColorCount.vue";

export default {
  components: { ManaColorCount },
  data() {
    return {};
  },
  methods: {
    calculate_recommend_land_count(cmc, deck_size) {
      let result = 18;
      if (cmc < 0.8) {
        result = 18;
      } else if (cmc < 1.12) {
        result = 19;
      } else if (cmc < 1.44) {
        result = 20;
      } else if (cmc < 1.76) {
        result = 21;
      } else if (cmc < 2.08) {
        result = 22;
      } else if (cmc < 2.4) {
        result = 23;
      } else if (cmc < 2.72) {
        result = 24;
      } else if (cmc < 3.04) {
        result = 25;
      } else if (cmc < 3.36) {
        result = 26;
      } else if (cmc < 3.68) {
        result = 27;
      } else {
        result = 28;
      }
      return (deck_size / 60.0) * result;
    },
    pad(n, width, z) {
      z = z || "0";
      n = n + "";
      return n.length >= width
        ? n
        : new Array(width - n.length + 1).join(z) + n;
    }
  },
  computed: {
    recommended_land_count: {
      get() {
        return (
          this.calculate_recommend_land_count(
            this.deck_average_cmc,
            this.deck_size
          ) || 0.0
        ).toFixed(1);
      }
    },
    average_opening_hand_size: {
      get() {
        return (
          this.$store.state.outputs.accumulated_opening_hand_size / this.runs ||
          0.0
        ).toFixed(2);
      }
    },
    average_lands_in_opening_hand: {
      get() {
        return (
          this.$store.state.outputs.accumulated_opening_hand_land_count /
            this.runs || 0.0
        ).toFixed(2);
      }
    },
    deck_average_cmc: {
      get() {
        return (this.$store.state.outputs.deck_average_cmc || 0.0).toFixed(2);
      }
    },
    deck_size: {
      get() {
        let c = this.$store.state.outputs.land_stats.deck_size;
        return c;
      }
    },
    runs: {
      get() {
        return this.$store.state.outputs.accumulated_runs;
      }
    },
    land_stats: {
      get() {
        let c = this.$store.state.outputs.land_stats;
        return c;
      }
    },
    total_land_counts: {
      get() {
        const c = this.land_stats.total_land_counts;
        return c;
      }
    },
    total_non_land_counts: {
      get() {
        const c = this.land_stats.non_land_counts;
        return c;
      }
    }
  }
};
</script>
