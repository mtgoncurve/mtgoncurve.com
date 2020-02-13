<style lang="scss" scoped>
.card-image-container {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 1;
}

#card-image {
  height: 300px;
}

.mana_cost {
  padding: 5px;
}

.count {
  font-size: 0.7em;
}

.msi {
  font-size: 0.7em;
}

.msi-dual {
  font-size: 0.7em;
}

.inline {
  display: inline-block;
}

table {
  width: 100%;
}

</style>

<template>
  <div>
    <table class="table is-striped">
      <thead>
        <tr>
          <th>Count</th>
          <th>Card</th>
          <th>Mana</th>
          <th>Kind</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in tableData" :key="data.card.name">
          <th>{{data.card_count}}</th>
          <th>
            <a
              href="#"
              class="cardlink"
              @mouseover="showCard(data.card.image_uri)"
              @mouseout="hideCard"
            >{{data.card.name}}</a>
          </th>
          <td>
            <i
              v-show="data.card.mana_cost.c"
              :class="`ms msi ms-fw ms-cost ms-${data.card.mana_cost.c}`"
            ></i>
            <i
              v-for="(n,i) in data.card.mana_cost.w"
              v-show="data.card.mana_cost.w"
              class="ms msi ms-fw ms-cost ms-w"
            ></i>
            <i
              v-for="(n,i) in data.card.mana_cost.u"
              v-show="data.card.mana_cost.u"
              class="ms msi ms-fw ms-cost ms-u"
            ></i>
            <i
              v-for="(n,i) in data.card.mana_cost.b"
              v-show="data.card.mana_cost.b"
              class="ms msi ms-fw ms-cost ms-b"
            ></i>
            <i
              v-for="(n,i) in data.card.mana_cost.r"
              v-show="data.card.mana_cost.r"
              class="ms msi ms-fw ms-cost ms-r"
            ></i>
            <i
              v-for="(n,i) in data.card.mana_cost.g"
              v-show="data.card.mana_cost.g"
              class="ms msi ms-fw ms-cost ms-g"
            ></i>
          </td>
          <td>{{data.card.kind.replace("Land", "")}}</td>
        </tr>
      </tbody>
    </table>
    <div class="card-image-container">
      <img id="card-image" src />
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
    showCard(uri) {
      const card_image = document.getElementById("card-image");
      card_image.src = uri;
    },
    hideCard() {
      const card_image = document.getElementById("card-image");
      card_image.src = "";
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
    tableData: {
      get() {
        return this.$store.state.outputs.land_counts;
      }
    },
    land_stats: {
      get() {
        let c = this.$store.state.outputs.land_stats;
        return c;
      }
    },
    deck_size: {
      get() {
        const ds = this.land_stats.deck_size || 0;
        return ds;
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
    },
  }
};
</script>
