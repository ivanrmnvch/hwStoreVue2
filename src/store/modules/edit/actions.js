import API from '@/utils/API';

export default {
  async init({ dispatch }, id) {
    await dispatch('getProduct', id);
    await dispatch('getSectons');
    await dispatch('getBrands');
  },
  async getProduct({ commit }, id) {
    try {
      const res = await API.get(`products/product/${id}`);
      const data = JSON.parse(res.data);
      commit('SET_EDIT_FORM', data);
    } catch (e) {
      console.error(e);
    }
  },

  async getSectons({ state, commit }) {
    const { searchActive } = state;

    try {
      const res = await API.get('/sections', {
        params: {
          active: searchActive,
        },
      });
      const data = JSON.parse(res.data);
      commit('SET_SECTIONS', data);
    } catch (e) {
      console.error(e);
    }
  },

  async updateProduct({ state }, id) {
    const {
      editForm,
      mainSectionSelectedId,
      subSectionSelectedId,
      selectedBrandId,
    } = state;

    const body = {
      ...editForm,
      brandId: selectedBrandId,
      mainSectionId: mainSectionSelectedId,
      subSectionId: subSectionSelectedId,
    };

    const formIsValid = Object.values(body).every((field) => !!field.toString());

    if (!formIsValid) {
      return;
    }

    try {
      await API.put(`products/product/${id}`, body);
    } catch (e) {
      console.error(e);
    }
  },

  async getBrands({ commit }) {
    try {
      const res = await API.get('/brands');
      const data = JSON.parse(res.data);
      commit('SET_DATA', { type: 'brands', value: data });
    } catch (e) {
      console.error(e);
    }
  },
};
