export default {
  SET_EDIT_FORM(state, payload) {
    state.editForm.id = payload.id;
    state.editForm.name = payload.name;
    state.editForm.description = payload.description;
    state.editForm.price = payload.price;
    state.editForm.imagePath = payload.imagePath;
    state.editForm.brand = payload.brand;
    state.editForm.category = payload.category;
    state.editForm.active = payload.active;
  },
  SET_EDIT_FORM_FIELD(state, { field, value }) {
    state.editForm[field] = value;
  },
  SET_EDIT_FORM_CHECKBOX(state) {
    state.editForm.active = !state.editForm.active;
  },
};
