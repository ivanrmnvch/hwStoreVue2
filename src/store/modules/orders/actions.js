import API from '@/utils/API';

export default {
  async getOrders({ commit }) {
    try {
      const res = await API.get('order');
      const data = JSON.parse(res.data);
      // commit('SET_DATA', { type: 'orders', value: data });
      commit('SET_ORDERS', data);
    } catch (e) {
      console.error(e);
    }
  },
};
