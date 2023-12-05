export default {
  SET_DATA(state, { field, value }) {
    state[field] = value;
  },
  SET_MODAL(state, { field, value }) {
    state.modalLogin[field] = value;
  },
  SET_MODAL_REG(state, { field, value }) {
    state.modalRegistration[field] = value;
  },
};
