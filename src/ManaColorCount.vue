<style scoped>
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
      <div class="inline" v-if="counts.w_count">
        <span class="">
          <i class="ms msi ms-fw ms-cost ms-w"></i>
          {{pad(counts.w_count, 2)}}
        </span>
      </div>

      <div class="inline" v-if="counts.u_count">
        <span class="">
          <i class="ms msi ms-fw ms-cost ms-u"></i>
          {{pad(counts.u_count, 2)}}
        </span>
      </div>

      <div class="inline" v-if="counts.b_count">
        <span class="">
          <i class="ms msi ms-fw ms-cost ms-b"></i>
          {{pad(counts.b_count, 2)}}
        </span>
      </div>

      <div class="inline" v-if="counts.r_count">
        <span class="">
          <i class="ms msi ms-fw ms-cost ms-r"></i>
          {{pad(counts.r_count,2)}}
        </span>
      </div>

      <div class="inline" v-if="counts.g_count">
        <span class="">
          <i class="ms msi ms-fw ms-cost ms-g"></i>
          {{pad(counts.g_count, 2)}}
        </span>
      </div>

      <div class="inline" v-if="counts.c_count && showColorless">
        <span :v-show="counts.c_count" class="">
          <i class="ms msi ms-fw ms-cost ms-c"></i>
          {{pad(counts.c_count, 2)}}
        </span>
      </div>

    <!--
    <li>
      <span class="label">
        {{pad(counts.wu_count , 2)}}
        <i class="ms msi-dual ms-fw ms-cost ms-wu"></i>
      </span>
    </li>
    <li
      title="W/B"
      :style="{visibility:  counts.wb_count ? 'visible' : 'hidden'}"
      class="mana-cost pulled-right"
    >
      <span class="label">{{pad(counts.wb_count , 2)}}</label>
      <i class="ms msi-dual ms-fw ms-cost ms-wb"></i>
    </li>
    <li
      title="U/B"
      :style="{visibility:  counts.ub_count ? 'visible' : 'hidden'}"
      class="mana-cost pulled-right"
    >
      <span class="label">{{pad(counts.ub_count , 2)}}</label>
      <i class="ms msi-dual ms-fw ms-cost ms-ub"></i>
    </li>
    <li
      title="U/R"
      :style="{visibility:  counts.ur_count ? 'visible' : 'hidden'}"
      class="mana-cost pulled-right"
    >
      <span class="label">{{pad(counts.ur_count , 2)}}</label>
      <i class="ms msi-dual ms-fw ms-cost ms-ur"></i>
    </li>
    <li
      title="B/R"
      :style="{visibility:  counts.br_count ? 'visible' : 'hidden'}"
      class="mana-cost pulled-right"
    >
      <span class="label">{{pad(counts.br_count , 2)}}</label>
      <i class="ms msi-dual ms-fw ms-cost ms-br"></i>
    </li>
    <li
      title="B/G"
      :style="{visibility:  counts.bg_count ? 'visible' : 'hidden'}"
      class="mana-cost pulled-right"
    >
      <span class="label">{{pad(counts.bg_count , 2)}}</label>
      <i class="ms msi-dual ms-fw ms-cost ms-bg"></i>
    </li>
    <li
      title="R/G"
      :style="{visibility:  counts.rg_count ? 'visible' : 'hidden'}"
      class="mana-cost pulled-right"
    >
      <span class="label">{{pad(counts.rg_count , 2)}}</label>
      <i class="ms msi-dual ms-fw ms-cost ms-bg"></i>
    </li>
    <li
      title="R/W"
      :style="{visibility:  counts.rw_count ? 'visible' : 'hidden'}"
      class="mana-cost pulled-right"
    >
      <span class="label">{{pad(counts.rw_count , 2)}}</label>
      <i class="ms msi-dual ms-fw ms-cost ms-rw"></i>
    </li>
    <li
      title="G/W"
      :style="{visibility:  counts.gw_count ? 'visible' : 'hidden'}"
      class="mana-cost pulled-right"
    >
      <span class="label">{{pad(counts.gw_count , 2)}}</label>
      <i class="ms msi-dual ms-fw ms-cost ms-gw"></i>
    </li>
    <li
      title="G/U"
      :style="{visibility:  counts.gu_count ? 'visible' : 'hidden'}"
      class="mana-cost pulled-right"
    >
      <span class="label">{{pad(counts.gu_count , 2)}}</label>
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
    }
  },
  components: {}
};
</script>
