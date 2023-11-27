import API from '@/utils/API';

export default {
  async getList({ rootGetters, commit }) {
    try {
      const basketIds = rootGetters.getBasketIds;
      const res = await API.get('checkout', { params: { ids: basketIds.join(', ') } });
      commit('SET_DATA', { field: 'orders', value: JSON.parse(res.data) });
    } catch (e) {
      console.error(e);
    }
  },

  async checkout({ rootGetters }) {
    const basketIds = rootGetters.getBasketIds;
    try {
      await API.post('order', { basketIds });
    } catch (e) {
      console.error(e);
    }
  },
};
