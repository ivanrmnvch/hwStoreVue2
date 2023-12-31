import API from '@/utils/API';

export default {
  async init({ dispatch }) {
    await dispatch('getProductList');
    await dispatch('getSections');
    await dispatch('getBrands');
  },

  async getProductList({ state, commit }) {
    const { filter } = state;

    const params = Object.entries(filter).reduce((acc, [param, value]) => {
      if ((['category', 'brand'].includes(param) && value === '0')
        || (['priceMin', 'priceMax'].includes(param) && Number(value) < 0)
        || value === ''
      ) {
        return acc;
      }
      return {
        ...acc,
        [param]: value,
      };
    }, {});

    try {
      const res = await API.get('products', { params });
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

  async getSections({ commit }) {
    try {
      const res = await API.get('/sections');
      const data = JSON.parse(res.data);
      commit('SET_SECTIONS', data);
    } catch (e) {
      console.error(e);
    }
  },

  async getBrands({ commit }) {
    try {
      const res = await API.get('/brands');
      const data = JSON.parse(res.data);
      commit('SET_BRANDS', data);
    } catch (e) {
      console.error(e);
    }
  },

  async addProductToCart({ state }, id) {
    const { count } = state;
    try {
      await API.post(`basket/${id}`, {
        count,
      });
    } catch (e) {
      console.error(e);
    }
  },
};
