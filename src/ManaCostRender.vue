<style lang="scss">
.mana_cost {
  padding: 5px;
}
.count {
  font-size: 0.6em;
}
.msi {
  font-size: 0.7em;
}
</style>

<template>
  <div>
    <i
      v-for="(symbol, idx) in mana_cost_css_symbols"
      :key="idx"
      :class="`ms msi ms-fw ms-cost ms-${symbol}`"
    ></i>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    mana_cost_css_symbols() {
      let result = this.mana_cost
        .substring(1, this.mana_cost.length - 1)
        .split("}{");
      result = result.map(s => {
        return s.replace("/", "");
      });
      result = result.map(s => {
        return s.replace("X", "1");
      });
      result = result.map(s => {
        return s.toLowerCase();
      });
      return result;
    }
  },
  props: {
    mana_cost: {
      type: String,
      default: function() {
        return "";
      }
    }
  }
};
</script>
