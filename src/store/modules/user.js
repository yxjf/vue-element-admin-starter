import store from 'store';
import config from '@/config';
import { login, logout } from '@/api/login';
import actionTypes from '../action-types';
import mutationTypes from '../mutation-types';

const userKey = config.storeKeyPrefix + 'user';

const defaultState = {
  userInfo: {
    id: '',
    userName: '',
    displayName: '',
  },
  token: '',
  role: [],
  resource: [],
};

// initial state
const state = Object.assign({}, defaultState, store.get(userKey) || {});

// getters
const getters = {
  token: state => state.token,
  userInfo: state => state.userInfo,
  getMenu: state => {
    return state.resource.filter(d => d.type === 'menu').map(d => d.name);
  },
  getApi: state => {
    return state.resource.filter(d => d.type === 'api').map(d => d.name);
  },
  getAction: state => {
    return state.resource.filter(d => d.type === 'action').map(d => d.name);
  },
};

// actions
const actions = {
  // 登录
  [actionTypes.login]({ commit }, { username, password }) {
    console.log(password);
    return new Promise((resolve, reject) => {
      login(username.trim(), password)
        .then(data => {
          commit(mutationTypes.SET_USERINFO, data);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 退出
  [actionTypes.logout]({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit(mutationTypes.REMOVE_USERINFO);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};

// mutations
const mutations = {
  [mutationTypes.SET_USERINFO](state, data) {
    state.userInfo = { ...data.userInfo };
    state.token = data.token;
    state.role = [...data.role];
    state.resource = [...data.resource];
    store.set(userKey, state);
  },
  [mutationTypes.REMOVE_USERINFO](state) {
    Object.assign(state, defaultState);
    store.set(userKey, state);
  },
  [mutationTypes.SET_TOKEN](state, token) {
    state.token = token;
    store.set(userKey, state);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
