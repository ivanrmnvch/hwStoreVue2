export default {
  formHasChanged: (state) => (type) => {
    const { id, name, active } = state[`${type}Form`].item;
    const { name: defaultName, active: defaultActive } = (state[`${type}Sections`].find((section) => section.id === id) || []);
    return !((name === defaultName || name === '--' || name === '') && active === defaultActive);
  },
  getBody: (state) => (type) => {
    const item = type === 'main'
      ? state.mainForm.item
      : state.subForm.item;
    return {
      id: item.id,
      name: item.name,
      active: item.active,
    };
  },
};
