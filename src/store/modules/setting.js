import store from 'store';
import config from '@/config';
import actionTypes from '../action-types';
import mutationTypes from '../mutation-types';

const settingKey = config.storeKeyPrefix + 'setting';

// initial state
const state = {
  sidebarCollapse: store.get(settingKey) ? !!store.get(settingKey).sidebarCollapse : false,
};

// getters
const getters = {
  sidebarCollapse: state => state.sidebarCollapse,
};

// actions
const actions = {
  [actionTypes.toggleSideBar]({ commit }) {
    commit(mutationTypes.TOGGLE_SIDEBAR_COLLAPSE);
  },
};

// mutations
const mutations = {
  [mutationTypes.TOGGLE_SIDEBAR_COLLAPSE](state) {
    state.sidebarCollapse = !state.sidebarCollapse;
    store.set(settingKey, state);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
