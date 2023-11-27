export default {
  SET_DATA(state, { type, value }) {
    state[type] = value;
  },
  SET_EDIT_FORM(state, payload) {
    state.editForm.id = payload.id;
    state.editForm.name = payload.name;
    state.editForm.description = payload.description;
    state.editForm.price = payload.price;
    state.editForm.imagePath = payload.imagePath;
    state.editForm.active = payload.active;
    state.mainSectionSelectedId = payload.subSection.mainSection.id;
    state.subSectionSelectedId = payload.subSection.id;
    state.selectedBrandId = payload.brand.id;
  },
  SET_EDIT_FORM_FIELD(state, { field, value }) {
    state.editForm[field] = value;
  },
  SET_EDIT_FORM_CHECKBOX(state) {
    state.editForm.active = !state.editForm.active;
  },
  SET_SECTIONS(state, payload) {
    const { subSections, mainSections } = payload;
    const { mainSectionSelectedId } = state;
    state.mainSections = mainSections
      .filter((mainSection) => subSections
        .some((subSection) => subSection.mainSection.id === mainSection.id));
    state.subSections = subSections;
    state.categories = [
      ...subSections
        .filter((section) => section.mainSection.id === mainSectionSelectedId),
    ];
  },
  UPDATE_CATEGORIES(state) {
    const { mainSectionSelectedId } = state;

    state.categories = [
      ...state.subSections
        .filter((section) => section.mainSection.id === mainSectionSelectedId),
    ];
    state.subSectionSelectedId = state.categories[0].id;
  },
};
