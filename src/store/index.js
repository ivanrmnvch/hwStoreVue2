import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

import auth from './modules/auth';
import edit from './modules/edit';
import orders from './modules/orders';
import create from './modules/create';
import basket from './modules/basket';
import products from './modules/products';
import messagePage from './modules/messagePage';
import catalogEdit from './modules/catalogEdit';
import checkoutPage from './modules/checkoutPage';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    auth,
    edit,
    orders,
    create,
    basket,
    products,
    messagePage,
    catalogEdit,
    checkoutPage,
  },
});
