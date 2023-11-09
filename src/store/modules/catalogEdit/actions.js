import API from '@/utils/API';

export default {
  async init({ dispatch }) {
    await dispatch('getSectons');
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
      console.log('darta,', data);
      commit('SET_SECTIONS', data);
      commit('SET_MAIN_SECTIONS');
    } catch (e) {
      console.error(e);
    }
  },
};
