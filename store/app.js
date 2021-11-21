// Vuex is created so that param-reassign must be permitted: (https://vuex.vuejs.org/guide/mutations.html)
/* eslint-disable no-param-reassign */

const getDefaultState = () => ({
  pageTitle: '',
  introductionText: '',
});

export const getters = {
  get(state) { return state; },
};

export const mutations = {
  reset(state) {
    // Merge rather than replace so we don't lose observers
    // https://github.com/vuejs/vuex/issues/1118
    Object.assign(state, getDefaultState());
  },
  set(state, payload) {
    Object.keys(payload).forEach((key) => {
      if (key in state) {
        state[key] = payload[key];
      } else {
        console.error(`Tried to change appState with a non-existent key, key=${key}`);
      }
    });
  },
};
export const actions = {
  reset({ commit }) {
    commit('reset');
  },
  set({ commit }, payload) {
    commit('set', payload);
  },
};

export const state = getDefaultState;
