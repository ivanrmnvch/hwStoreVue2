import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

import auth from './modules/auth';
import edit from './modules/edit';
import create from './modules/create';
import products from './modules/products';
import catalogEdit from './modules/catalogEdit';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    auth,
    edit,
    create,
    products,
    catalogEdit,
  },
});
