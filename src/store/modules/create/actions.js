import API from '@/utils/API';

export default {
  async init({ dispatch }) {
    await dispatch('getSections');
    await dispatch('getBrands');
  },

  async createProduct({ state }) {
    const {
      createForm,
      mainSectionSelectedId,
      subSectionSelectedId,
      selectedBrandId,
    } = state;

    const form = {
      ...createForm,
      mainSectionId: mainSectionSelectedId,
      subSectionId: subSectionSelectedId,
      brandId: selectedBrandId,
    };

    const idField = [
      'mainSectionId',
      'subSectionId',
      'brandId',
    ];

    const formIsValid = Object.entries(form).every(([field, value]) => {
      if (idField.includes(field)) {
        return value > 0;
      }
      if (field === 'price') {
        return Number(value) >= 0;
      }
      return !!value;
    });

    if (!formIsValid) {
      return;
    }

    try {
      await API.post('products/product', form);
    } catch (e) {
      console.error(e);
    }
  },

  async getSections({ commit }) {
    try {
      const res = await API.get('/sections');
      const data = JSON.parse(res.data);
      console.log('data', data);
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
};
