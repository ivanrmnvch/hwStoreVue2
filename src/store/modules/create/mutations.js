const defaultMainItem = {
  id: 0,
  name: '--',
  active: false,
  selected: false,
};

// const defaultSubItem = {
//   id: 0,
//   name: '--',
//   active: false,
//   selected: false,
//   mainSection: {
//     id: 0,
//   },
// };

const defaultItem = {
  name: '--',
  id: 0,
};

export default {
  SET_CREATE_FORM_FIELD(state, { field, value }) {
    state.createForm[field] = value;
  },

  SET_SECTIONS(state, payload) {
    const { subSections, mainSections } = payload;
    state.mainSections = [
      defaultMainItem,
      ...mainSections
        .filter((mainSection) => subSections
          .some((subSection) => subSection.mainSection.id === mainSection.id)),
    ];
    state.subSections = subSections;
  },

  CHANGE_SECTIONS(state, id) {
    console.log('id', id);
    if (id === 0) {
      state.categories = [];
      state.mainSectionSelectedId = 0;
      state.subSectionSelectedId = 0;
      return;
    }
    state.categories = state.subSections.filter((section) => section.mainSection.id === id);
    state.mainSectionSelectedId = id;
    console.log('def', state.categories[0].id);
    state.subSectionSelectedId = state.categories[0].id;
  },
  SET_BRANDS(state, payload) {
    state.brands = [
      defaultItem,
      ...payload,
    ];
  },
  SET_DATA(state, { type, value }) {
    state[type] = value;
  },
};
