export default {
  formHasChanged: (state) => (type) => {
    console.log('type', type);
    const { id, name, active } = state[`${type}Form`].item;
    const { name: defaultName, active: defaultActive } = (state[`${type}Sections`].find((section) => section.id === id) || []);
    console.log('!(name === defaultName && active === defaultActive)', !(name === defaultName && active === defaultActive));
    console.log('name === defaultName', name === defaultName);
    console.log('active === defaultActive', active === defaultActive);
    console.log("name === '--'", name === '--');

    return !((name === defaultName || name === '--') && active === defaultActive);
  },
};
