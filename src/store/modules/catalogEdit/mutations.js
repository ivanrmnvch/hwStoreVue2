const defaultMainItem = {
  id: 0,
  name: '--',
  active: false,
  selected: false,
};

const defaultSubItem = {
  id: 0,
  name: '--',
  active: false,
  selected: false,
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
      ...payload.mainSections.map((section) => ({ ...section, selected: false })),
    ];
    state.subSections = [
      defaultSubItem,
      ...payload.subSections.map((section) => ({ ...section, selected: false })),
    ];
  },
  SET_MAIN_SECTIONS(state) {
    state.chapter = state.mainSections;
  },
  SET_SUB_SECTIONS(state, id) {
    const subSections = state.subSections
      .filter((subSection) => subSection.mainSection.id === Number(id));

    if (subSections.length) {
      subSections.unshift(defaultSubItem);
    }
    state.categories = subSections;
    state.mainSectionsSelectedItemId = id;
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
    state.categories = [{
      id: 0,
      name: '--',
      active: false,
      selected: true,
      mainSection: {
        id: 0,
      },
    }];
    state.subForm = {
      active: true,
      item: {
        id: 0,
        name: '--',
        active: true,
        selected: false,
        mainSection: {
          id: 0,
        },
      },
    };
  },
  DISABLED_SUB_FORM(state) {
    state.showSubSections = false;
  },
  CLEAR_MAIN_SECTION(state) {
    state.chapter = [{
      id: 0,
      name: '--',
      active: false,
      selected: false,
    }];
  },
  CLEAR_SUB_SECTION(state) {
    state.categories = [{
      id: 0,
      name: '--',
      active: false,
      selected: false,
      mainSection: {
        id: 0,
      },
    }];
  },
  ROOT_SET_FORM(state, {
    type, id = null, name = null, active = null, selected = null,
  }) {
    if (id.toString()) {
      state[`${type}Form`].item.id = id;
    }
    if (name !== null) {
      state[`${type}Form`].item.name = name;
    }
    if (selected) {
      state[`${type}Form`].item.selected = selected;
    }
    if (active) {
      state[`${type}Form`].item.active = active;
    }
  },
  SET_SELECTED_ITEM(state, { type, id }) {
    const list = type === 'main'
      ? state.chapter
      : state.categories;

    const newList = list.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          selected: true,
        };
      }
      return {
        ...item,
        selected: false,
      };
    });

    if (type === 'main') {
      state.chapter = newList;
    }

    if (type === 'sub') {
      state.categories = newList;
    }
  },
};
