export default {
  formHasChanged: (state) => (type) => {
    console.log('type', type);
    const { id, name, active } = state[`${type}Form`].item;
    const { name: defaultName, active: defaultActive } = (state[`${type}Sections`].find((section) => section.id === id) || []);
    console.log('name === defaultName', name === defaultName);
    console.log("name === '--'", name === '--');
    console.log('name === \'', name === '');
    console.log('(name === defaultName || name === \'--\' || name === \'\')', (name === defaultName || name === '--' || name === ''));
    console.log('active === defaultActive', active === defaultActive);

    console.log('!((name === defaultName || name === \'--\' || name === \'\') && active === defaultActive)', !((name === defaultName || name === '--' || name === '') && active === defaultActive));

    return !((name === defaultName || name === '--' || name === '') && active === defaultActive);
  },
};
