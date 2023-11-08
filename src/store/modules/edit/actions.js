import API from '@/utils/API';

export default {
  async getProduct({ commit }, id) {
    try {
      const res = await API.get(`products/product/${id}`);
      const data = JSON.parse(res.data);
      commit('SET_EDIT_FORM', data);
    } catch (e) {
      console.error(e);
    }
  },

  async updateProduct({ state }, id) {
    const { editForm } = state;
    try {
      await API.put(`products/product/${id}`, {
        params: {
          editForm,
        },
      });
    } catch (e) {
      console.error(e);
    }
  },
};
