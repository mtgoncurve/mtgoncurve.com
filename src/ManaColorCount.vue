<style lang="scss" scoped>
.msi {
  font-size: 0.7em;
}
.msi-dual {
  font-size: 0.7em;
}
.inline {
  display: inline-block;
}
</style>

<template>
  <div class="container">
    <div class="inline" v-if="counts.r">
      <span class>
        <i class="ms msi ms-fw ms-cost ms-r"></i>
        <span v-if="showNumbers">{{pad(counts.r,2)}}</span>
      </span>
    </div>

    <div class="inline" v-if="counts.g">
      <span class>
        <i class="ms msi ms-fw ms-cost ms-g"></i>
        <span v-if="showNumbers">{{pad(counts.g, 2)}}</span>
      </span>
    </div>

    <div class="inline" v-if="counts.b">
      <span class>
        <i class="ms msi ms-fw ms-cost ms-b"></i>
        <span v-if="showNumbers">{{pad(counts.b, 2)}}</span>
      </span>
    </div>

    <div class="inline" v-if="counts.u">
      <span class>
        <i class="ms msi ms-fw ms-cost ms-u"></i>
        <span v-if="showNumbers">{{pad(counts.u, 2)}}</span>
      </span>
    </div>

    <div class="inline" v-if="counts.w">
      <span class>
        <i class="ms msi ms-fw ms-cost ms-w"></i>
        <span v-if="showNumbers">{{pad(counts.w, 2)}}</span>
      </span>
    </div>

    <div class="inline" v-if="counts.c && showColorless">
      <span :v-show="counts.c" class>
        <i class="ms msi ms-fw ms-cost ms-c"></i>
        <span v-if="showNumbers">{{pad(counts.c, 2)}}</span>
      </span>
    </div>

    <!--
    <li>
      <span class="label">
        {{pad(counts.wu , 2)}}
        <i class="ms msi-dual ms-fw ms-cost ms-wu"></i>
      </span>
    </li>
    <li
      title="W/B"
      :style="{visibility:  counts.wb ? 'visible' : 'hidden'}"
      class="mana-cost pulled-right"
    >
      <span class="label">{{pad(counts.wb , 2)}}</label>
      <i class="ms msi-dual ms-fw ms-cost ms-wb"></i>
    </li>
    <li
      title="U/B"
      :style="{visibility:  counts.ub ? 'visible' : 'hidden'}"
      class="mana-cost pulled-right"
    >
      <span class="label">{{pad(counts.ub , 2)}}</label>
      <i class="ms msi-dual ms-fw ms-cost ms-ub"></i>
    </li>
    <li
      title="U/R"
      :style="{visibility:  counts.ur ? 'visible' : 'hidden'}"
      class="mana-cost pulled-right"
    >
      <span class="label">{{pad(counts.ur , 2)}}</label>
      <i class="ms msi-dual ms-fw ms-cost ms-ur"></i>
    </li>
    <li
      title="B/R"
      :style="{visibility:  counts.br ? 'visible' : 'hidden'}"
      class="mana-cost pulled-right"
    >
      <span class="label">{{pad(counts.br , 2)}}</label>
      <i class="ms msi-dual ms-fw ms-cost ms-br"></i>
    </li>
    <li
      title="B/G"
      :style="{visibility:  counts.bg ? 'visible' : 'hidden'}"
      class="mana-cost pulled-right"
    >
      <span class="label">{{pad(counts.bg , 2)}}</label>
      <i class="ms msi-dual ms-fw ms-cost ms-bg"></i>
    </li>
    <li
      title="R/G"
      :style="{visibility:  counts.rg ? 'visible' : 'hidden'}"
      class="mana-cost pulled-right"
    >
      <span class="label">{{pad(counts.rg , 2)}}</label>
      <i class="ms msi-dual ms-fw ms-cost ms-bg"></i>
    </li>
    <li
      title="R/W"
      :style="{visibility:  counts.rw ? 'visible' : 'hidden'}"
      class="mana-cost pulled-right"
    >
      <span class="label">{{pad(counts.rw , 2)}}</label>
      <i class="ms msi-dual ms-fw ms-cost ms-rw"></i>
    </li>
    <li
      title="G/W"
      :style="{visibility:  counts.gw ? 'visible' : 'hidden'}"
      class="mana-cost pulled-right"
    >
      <span class="label">{{pad(counts.gw , 2)}}</label>
      <i class="ms msi-dual ms-fw ms-cost ms-gw"></i>
    </li>
    <li
      title="G/U"
      :style="{visibility:  counts.gu ? 'visible' : 'hidden'}"
      class="mana-cost pulled-right"
    >
      <span class="label">{{pad(counts.gu , 2)}}</label>
      <i class="ms msi-dual ms-fw ms-cost ms-gu"></i>
    </li>
    -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    pad(n, width, z) {
      z = z || "0";
      n = n + "";
      return n.length >= width
        ? n
        : new Array(width - n.length + 1).join(z) + n;
    }
  },
  props: {
    counts: {
      type: Object,
      default: function() {
        return { total: 0 };
      }
    },
    showColorless: {
      type: Boolean,
      default: function() {
        return true;
      }
    },
    showNumbers: {
      type: Boolean,
      default: function() {
        return true;
      }
    }
  },
  components: {}
};
</script>
