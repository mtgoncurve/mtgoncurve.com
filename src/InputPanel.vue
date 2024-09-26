<style scoped>
.button-container {
  padding-top: 5px;
}
</style>

<template>
  <div class="card">
    <!--Deckcode Section -->
    <div class="card-content">
      <div class="field">
        <label class="label">Deck</label>
        <div class="control">
          <textarea
            :class="'textarea is-small ' + codeValid"
            v-model="code"
            maxlength="4096"
            placeholder="Enter Magic Arena or text deck list:

4 Ghitu Lavarunner (DAR) 127
4 Fanatical Firebrand (RIX) 101
4 Runaway Steam-Kin (GRN) 115
4 Goblin Chainwhirler (DAR) 129"
            :rows="getRowsForDeckcodeTextarea"
            size="is-small"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          ></textarea>
          <p v-if="codeError" class="help is-danger">{{this.codeError}}</p>
        </div>
      </div>

      <div class="field">
        <label class="label">London Mulligan Strategy</label>
        <div class="select">
          <select size="is-small" v-model="mulligan_down_to">
            <option value="7">Never Mulligan</option>
            <option value="6">Mulligan down to 6 cards</option>
            <option value="5">Mulligan down to 5 cards</option>
            <option value="4">Mulligan down to 4 cards</option>
            <option value="3">Mulligan down to 3 cards</option>
            <option value="2">Mulligan down to 2 cards</option>
            <option value="1">Mulligan down to 1 cards</option>
            <option value="0">Mulligan down to 0 cards</option>
          </select>
        </div>
      </div>

      <label class="label is-small">Mulligan on {{mulligan_on_lands_label}} lands:</label>
      <div class="field">
        <input type="checkbox" v-model="mulligan_on_lands" value="0" />0
        <input type="checkbox" v-model="mulligan_on_lands" value="1" />1
        <input type="checkbox" v-model="mulligan_on_lands" value="2" />2
        <input type="checkbox" v-model="mulligan_on_lands" value="3" />3
        <input type="checkbox" v-model="mulligan_on_lands" value="4" />4
        <input type="checkbox" v-model="mulligan_on_lands" value="5" />5
        <input type="checkbox" v-model="mulligan_on_lands" value="6" />6
        <input type="checkbox" v-model="mulligan_on_lands" value="7" />7
      </div>
      <div hidden>
      <label class="label is-small">Mulligan for Hands Containing:</label>
      <textarea
        :class="'textarea is-small ' + codeValid"
        v-model="cards_to_keep"
        maxlength="4096"
        placeholder="List of card names. Define multiple hands with empty lines:

Ghitu Lavarunner
Fanatical Firebrand

Runaway Steam-Kin
"
        :rows="6"
        size="is-small"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
      ></textarea>
      </div>

      <fieldset>
        <legend class="label is-small">First turn</legend>
        <div class="field">
          <input type="radio" value="true" v-model="on_the_play" />
          <label >On the play</label>
          <input type="radio" value="false" v-model="on_the_play" />
          <label >On the draw</label>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script>
function arrays_equal(array1, array2) {
  return (
    array1.length === array2.length &&
    array1.every(function(value, index) {
      return value === array2[index];
    })
  );
}

export default {
  data() {
    return {};
  },
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  computed: {
    getRowsForDeckcodeTextarea: {
      get() {
        const split_code = this.$store.state.inputs.code.split("\n");
        const val = Math.min(Math.max(split_code.length, 6), 10);
        return val;
      }
    },
    code: {
      get() {
        return this.$store.state.inputs.code;
      },
      set(val) {
        this.$store.dispatch("update", { code: val });
      }
    },
    cards_to_keep: {
      get() {
        return this.$store.state.inputs.cards_to_keep;
      },
      set(val) {
        this.$store.dispatch("update", { cards_to_keep: val });
      }
    },
    on_the_play: {
      get() {
        return this.$store.state.inputs.on_the_play;
      },
      set(val) {
        this.$store.dispatch("update", { on_the_play: val == "true" });
      }
    },
    mulligan_down_to: {
      get() {
        return this.$store.state.inputs.mulligan_down_to;
      },
      set(val) {
        this.$store.dispatch("update", { mulligan_down_to: Number(val) });
      }
    },
    mulligan_on_lands: {
      get() {
        return this.$store.state.inputs.mulligan_on_lands;
      },
      set(val) {
        this.$store.dispatch("update", {
          mulligan_on_lands: val.map(s => Number(s))
        });
      }
    },
    acceptable_hand_list: {
      get() {
        return this.$store.state.inputs.acceptable_hand_list;
      },
      set(val) {
        this.$store.dispatch("update", {
          acceptable_hand_list: val.map(s => Number(s))
        });
      }
    },
    codeValid: {
      get() {
        return this.runs > 0 ? "is-success" : "is-danger";
      }
    },
    codeError: {
      get() {
        return this.$store.state.outputs.result_error;
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
    mulligan_on_lands_label: {
      get() {
        let val = [...this.$store.state.inputs.mulligan_on_lands];
        val = val.map(s => Number(s)).sort();
        return val;
      }
    },
    acceptable_hand_list_label: {
      get() {
        let val = [...this.$store.state.inputs.acceptable_hand_list];
        val = val.map(s => Number(s)).sort();
        return val;
      }
    }
  }
};
</script>
