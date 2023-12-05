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

  async getOrder({ state, commit, getters }) {
    const { orderId } = state;
    try {
      const res = await API.get(`order/${orderId}`);
      const data = JSON.parse(res.data);
      commit('SET_DATA', { type: 'order', value: data });
      const status = getters.getOrderStatus;
      commit('SET_DATA', { type: 'selectedStatus', value: status });
    } catch (e) {
      console.error(e);
    }
  },

  async saveStatus({ state }) {
    const { orderId, selectedStatus } = state;
    try {
      await API.put(`order/${orderId}`, { status: selectedStatus });
    } catch (e) {
      console.error(e);
    }
    console.log('orderId', orderId);
  },
};
