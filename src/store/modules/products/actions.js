import API from '@/utils/API';

export default {
  async init({ dispatch }) {
    await dispatch('getProductList');
  },

  async getProductList({ commit }) {
    try {
      const res = await API.get('products');
      const data = JSON.parse(res.data);
      commit('SET_DATA', { type: 'products', value: data.content });
    } catch (e) {
      console.error(e);
    }
  },

  async getProduct({ commit }, id) {
    try {
      const res = await API.get(`products/product/${id}`);
      const data = JSON.parse(res.data);
      commit('SET_DATA', { type: 'product', value: data });
    } catch (e) {
      console.error(e);
    }
  },

  // async addProductToCart(_) {
  //   return '';
  // },
};
