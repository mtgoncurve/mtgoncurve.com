import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const RUNS_PER_UPDATE = 100000;
const RUNS_TOTAL = 1000000;

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    // STOP WARNING DANGER
    // DO NOT CHANGE INPUTS OR YOU WILL BREAK EVERY
    // LINK IN EXISTENCE. Need to figure out a workflow
    // to support old versions of inputs.
    inputs: {
      code: '',
      on_the_play: true,
      initial_hand_size: 7,
      mulligan_down_to: 5,
      mulligan_on_lands: [0, 1, 6, 7],
      cards_to_keep: '',
    },
    outputs: {
      total_runs: RUNS_TOTAL,
      accumulated_stats: [],
      accumulated_opening_hand_size: 0,
      accumulated_opening_hand_land_count: 0,
      deck_average_cmc: 0,
      accumulated_runs: 0,
      land_counts: {},
      land_stats: {},
      result_error: ''
    }
  },
  getters: {
    base64EncodedInputs({ inputs }) {
      return btoa(JSON.stringify(inputs));
    }
  },
  actions: {
    update({ commit, dispatch }, inputs) {
      commit('setInputs', inputs);
      commit('clearAccumulatedOutputs');
      dispatch('postWork');
    },
    initializeWithBase64Encoding({ commit, dispatch }, encoding) {
      commit('setInputsWithBase64Encoding', encoding);
      commit('clearAccumulatedOutputs');
      dispatch('postWork');
    },
    // {commit, state} is ES2015 argument destructuring of the context
    // object
    postWork({ commit, dispatch, state }) {
      this.task_id += 1;
      const cards_to_keep_string = state.inputs.cards_to_keep;
      const card_sets_to_keep =
        cards_to_keep_string.split(/^\s*\n/gm).map(s => s.trim());
      const card_sets_to_keep_split =
        card_sets_to_keep.map(s => s.split(/\r?\n/).map(s => s.trim()));
      const acceptable_hand_list =
        cards_to_keep_string.length == 0 ? [] : card_sets_to_keep_split;
      // console.log(acceptable_hand_list);

      // WARN(jshrake): The follwing schema MUST be
      // serializable to lib/src/wasm_api.rs::LandlordInput
      const data = {
        code: state.inputs.code,
        runs: RUNS_PER_UPDATE,
        on_the_play: state.inputs.on_the_play,
        initial_hand_size: state.inputs.initial_hand_size,
        mulligan_down_to: state.inputs.mulligan_down_to,
        mulligan_on_lands: state.inputs.mulligan_on_lands,
        acceptable_hand_list: acceptable_hand_list,
        // Extra data for the web worker
        task_id: this.task_id,
        total_runs: RUNS_TOTAL
      };
      this.worker.postMessage(data);
    },
    spawnWorker({ commit, dispatch, state }) {
      this.task_id = 0;
      // Start a fresh worker
      this.worker = new window.Worker('landlord.worker.js');
      this.worker.addEventListener('message', e => {
        // console.log('main thread got result from worker: ', e.data);
        // Look for the ready signal, and then dispatch work
        if (e.data === true) {
          // If the deck code is empty, don't post any work
          if (!state.inputs.code.length) {
            return;
          }
          dispatch('postWork');
        } else if (e.data.task_id == this.task_id) {
          if (typeof e.data.results == 'string' ||
            e.data.results instanceof String) {
            commit('setResultError', e.data.results);
          } else {
            commit('accumulate', e.data);
          }
        }
      }, false);
    }
  },
  mutations: {
    setResultError(state, err) {
      state.outputs.result_error = err;
    },
    setInputs(state, inputs) {
      Object.assign(state.inputs, inputs);
    },
    setInputsWithBase64Encoding(state, encoding) {
      const newInputs = JSON.parse(atob(encoding));
      Object.assign(state.inputs, newInputs);
    },
    clearAccumulatedOutputs(state) {
      state.outputs.result_error = '';
      state.outputs.accumulated_runs = 0;
      // Only reset vars when the deckcode is deleted
      // accumulated_stats is reset in accumulateOutputs when runs == 0
      if (state.inputs.code.length == 0) {
        state.outputs.accumulated_stats = [];
        state.outputs.land_stats = [];
        state.outputs.accumulated_opening_hand_size = 0;
        state.outputs.accumulated_opening_hand_land_count = 0;
        state.outputs.deck_average_cmc = 0;
      }
    },
    accumulate(state, { results, runs }) {
      if (state.outputs.accumulated_runs == 0) {
        const {
          card_observations,
          land_counts,
          accumulated_opening_hand_size,
          accumulated_opening_hand_land_count,
          deck_average_cmc,
          ...land_stats
        } = results;
        state.outputs.land_counts = land_counts;
        state.outputs.accumulated_stats = card_observations;
        state.outputs.land_stats = land_stats;
        state.outputs.accumulated_opening_hand_size =
          accumulated_opening_hand_size;
        state.outputs.accumulated_opening_hand_land_count =
          accumulated_opening_hand_land_count;
        state.outputs.deck_average_cmc = deck_average_cmc;
      } else {
        for (let i = 0; i < results.card_observations.length; i++) {
          state.outputs.accumulated_stats[i].observations.mana +=
            results.card_observations[i].observations.mana;
          state.outputs.accumulated_stats[i].observations.cmc +=
            results.card_observations[i].observations.cmc;
          state.outputs.accumulated_stats[i].observations.play +=
            results.card_observations[i].observations.play;
        }
        state.outputs.accumulated_opening_hand_size +=
          results.accumulated_opening_hand_size;
        state.outputs.accumulated_opening_hand_land_count +=
          results.accumulated_opening_hand_land_count;
      }
      state.outputs.accumulated_runs += runs;
    }
  }
});
