export default {
  SET_CREATE_FORM_FIELD(state, { field, value }) {
    state.createForm[field] = value;
  },
};
