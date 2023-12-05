import API from '@/utils/API';

export default {
  async init({ dispatch }) {
    await dispatch('getSectons');
  },

  async updateSection({ getters }, type) {
    const { id, name, active } = getters.getBody(type);
    try {
      await API.put(`section/${id}`, {
        name,
        active,
        type,
      });
    } catch (e) {
      console.error(e);
    }
  },

  async createSection({ state, getters }, type) {
    const { mainSectionsSelectedItemId: mainSectionId } = state;
    const { name, active } = getters.getBody(type);

    try {
      await API.post('section', {
        name,
        active,
        type,
        mainSectionId: type === 'sub'
          ? mainSectionId
          : undefined,
      });
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
      commit('SET_MAIN_SECTIONS');
    } catch (e) {
      console.error(e);
    }
  },

  clearCatalogPage({ commit }) {
    commit('CLEAR_MAIN_SECTION');
    commit('CLEAR_SUB_SECTION');
    commit('CLEAR_MAIN_FORM');
    commit('CLEAR_SUB_FORM');
  },
};
