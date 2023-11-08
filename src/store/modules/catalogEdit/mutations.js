const defaultMainItem = {
  id: 0,
  name: '--',
  active: false,
};

const defaultSubItem = {
  id: 0,
  name: '--',
  active: false,
  mainSection: {
    id: 0,
  },
};

export default {
  // SET_DATA(state, { field, value }) {
  //   state[field] = value;
  // },
  SET_SECTIONS(state, payload) {
    state.mainSections = [
      defaultMainItem,
      ...payload.mainSections,
    ];
    state.subSections = [
      defaultSubItem,
      ...payload.subSections,
    ];
  },
  SET_SUB_SECTIONS(state, value) {
    const subSections = state.subSections
      .filter((subSection) => subSection.mainSection.id === Number(value.id));

    if (subSections.length) {
      subSections.unshift(defaultSubItem);
    }
    state.categories = subSections;
    state.mainSectionsSelectedItemId = value.id;
  },
  CHANGE_ACTIVE(state, type) {
    state[`${type}Form`].active = !state[`${type}Form`].active;
  },
  CHANGE_CREATION_MODE(state, type) {
    state[`${type}SectionCreationMode`] = !state[`${type}SectionCreationMode`];
  },
  SET_FORM(state, { type, value }) {
    state[`${type}Form`].item = value;
  },
  SET_FORM_FIELD(state, { type, field, value }) {
    state[`${type}Form`].item[field] = value;
  },
  CLEAR_SUB_FORM(state) {
    state.subForm = {
      active: true,
      item: {
        id: 0,
        name: '--',
        active: false,
        mainSection: {
          id: 0,
        },
      },
    };
  },
};
