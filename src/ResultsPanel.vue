<template>
  <div class>
    <table class="table is-striped">
      <thead>
        <tr>
          <th>Count</th>
          <th>Card</th>
          <th>Cost</th>
          <th>
            <span
              title="The turn to play the card. Defaults to the card CMC, which corresponds to playing the card on curve."
            >Turn</span>
          </th>
          <th>
            <span
              class="probability"
              title="The probability to pay the mana cost by the turn, conditional on drawing turn land cards. Cards with P(mana|turn) >= 90% are highlighted in blue."
            >
              P
              <sub>mana|turn</sub>
            </span>
          </th>
          <th>
            <span
              class="probability"
              title="The unconditional probability pay the mana cost by the turn."
            >
              P
              <sub>mana</sub>
            </span>
          </th>
          <th class="rotate">
            <span
              class="probability"
              title="The unconditional probability pay the mana cost and have at least one copy of the card in hand by the turn."
            >
              P
              <sub>play</sub>
            </span>
          </th>
          <th v-if="showTapped">
            <span
              class="probability"
              title="The probability to fail to pay the mana cost by the turn due to a tap land, conditional on drawing turn land cards."
            >
              P
              <sub>tapped|turn</sub>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in tableData" :key="data.card.name" :class="rowHighlighted(data)">
          <th>{{data.card_count}}</th>
          <th>
            <a
              href="#"
              class="cardlink"
              @mouseover="showCard(data.card.image_uri)"
              @mouseout="hideCard"
            >
              {{data.card.name}}
              <sup>{{cardFootnoteSymbols(data.card)}}</sup>
            </a>
          </th>
          <td>
            <mana-cost-render :mana_cost="data.card.mana_cost_string"></mana-cost-render>
          </td>
          <td>
            {{data.card.turn}}
            <span v-if="showTurnOffset(data)">(+{{turnOffset(data)}})</span>
          </td>
          <td>{{data.p_mana_cmc}}</td>
          <td>{{data.p_mana}}</td>
          <td>{{data.p_play}}</td>
          <td v-if="showTapped">{{data.p_tapped_cmc}}</td>
        </tr>
      </tbody>
    </table>
    <div class="card-image-container">
      <img id="card-image" src />
    </div>
  </div>
</template>

<script>
import ManaCostRender from "./ManaCostRender.vue";

export default {
  components: { ManaCostRender },
  data() {
    return {};
  },
  props: {
    debug: {
      type: Boolean,
      default: function() {
        return false;
      }
    }
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
    rowHighlighted(p) {
      return p.p_mana_cmc >= 90 ? "is-selected" : "";
    },
    cardFootnoteSymbols(card) {
      return [
        this.splitCardFootnoteSymbol(card),
        this.xManaCostFootnoteSymbol(card)
      ].join("");
    },
    splitCardFootnoteSymbol(card) {
      if (card.name.includes("//")) {
        return "†";
      } else {
        return "";
      }
    },
    xManaCostFootnoteSymbol(card) {
      if (card.mana_cost_string.includes("{X}")) {
        return "*";
      } else {
        return "";
      }
    },
    turnOffset(data) {
      return data.card.turn - data.cmc;
    },
    showTurnOffset(data) {
      return this.turnOffset(data) != 0;
    }
  },
  computed: {
    showTapped() {
      const stats = this.$store.state.outputs.accumulated_stats;
      return (
        stats.length &&
        stats.reduce((s, x) => {
          return s + x.observations.tapped;
        }, 0) > 0
      );
    },
    tableData: {
      get() {
        return this.$store.state.outputs.accumulated_stats.map(s => {
          if (this.runs === 0) {
            return {
              card: s.card,
              cmc: s.cmc,
              card_count: s.card_count,
              p_mana: 0.0,
              p_play: 0.0,
              p_mana_cmc: 0.0,
              p_tapped_cmc: 0.0
            };
          } else {
            return {
              card: s.card,
              cmc: s.cmc,
              card_count: s.card_count,
              p_mana_cmc: (
                (s.observations.mana / s.observations.cmc) * 100.0 || 0.0
              ).toFixed(2),
              p_mana: ((s.observations.mana / this.runs) * 100 || 0.0).toFixed(
                2
              ),
              p_play: ((s.observations.play / this.runs) * 100 || 0.0).toFixed(
                2
              ),
              p_tapped_cmc: (
                (s.observations.tapped / s.observations.cmc) * 100 || 0.0
              ).toFixed(2)
            };
          }
        });
      }
    },
    stats: {
      get() {
        return this.$store.state.outputs.accumulated_stats;
      }
    },
    runs: {
      get() {
        return this.$store.state.outputs.accumulated_runs;
      }
    }
  }
};
</script>

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
  font-size: 0.6em;
}
.msi {
  font-size: 0.7em;
}

.footnote {
  font-size: 0.9em;
}

table {
  width: 100%;
}

.probability {
  white-space: nowrap;
  text-align: left;
}

.stack {
  display: block;
}

.inline {
  display: inline;
}

span > sub {
  font-size: 0.65em;
}
</style>

