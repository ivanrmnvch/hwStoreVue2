const defaultItem = {
  name: '--',
  id: 0,
};

export default {
  SET_DATA(state, { type, value }) {
    console.log('value set', value);
    state[type] = value;
  },
  SET_SECTIONS(state, payload) {
    state.mainSections = [
      defaultItem,
      ...payload.mainSections,
    ];
    state.subSections = payload.subSections;
  },
  SET_BRANDS(state, payload) {
    state.brands = [
      defaultItem,
      ...payload,
    ];
  },
  SET_SUB_SECTIONS(state, id) {
    state.filter.category = '';
    const subSections = state.subSections
      .filter((subSection) => subSection.mainSection.id === Number(id));
    if (subSections.length) {
      subSections.unshift(defaultItem);
    }
    state.categories = subSections;
    state.mainSectionsSelectedItemId = Number(id);
  },
  SET_FILTER_FIELD(state, { field, value }) {
    state.filter[field] = value;
  },
  CLEAT_FILTER(state) {
    state.filter = {
      name: '',
      category: '',
      brand: '',
      priceMax: '',
      priceMin: '',
    };
    state.mainSectionsSelectedItemId = 0;
  },
};
