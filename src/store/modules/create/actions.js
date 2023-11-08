import API from '@/utils/API';

export default {
  async createProduct({ state }) {
    const { createForm } = state;

    try {
      await API.post('products/product', createForm);
    } catch (e) {
      console.error(e);
    }
  },
};
