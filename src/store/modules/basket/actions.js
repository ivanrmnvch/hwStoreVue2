import API from '@/utils/API';

export default {
  async getBasket({ commit }) {
    try {
      const res = await API.get('basket');
      const data = JSON.parse(res.data);
      commit('SET_BASKET', data);
    } catch (e) {
      console.error(e);
    }
  },

  async deleteBasketById({ dispatch }, id) {
    try {
      await API.delete(`basket/${id}`);
      await dispatch('getBasket');
    } catch (e) {
      console.error(e);
    }
  },

  checkout({ state, commit }) {
    const { basket } = state;
    const order = basket.filter((product) => product.selected);
    console.log('order', JSON.stringify(order));
    commit('checkoutPage/SET_DATA', { field: 'orders', value: order }, { root: true });
  },
};
