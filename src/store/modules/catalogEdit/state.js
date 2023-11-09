export default {
  mainSections: [],
  subSections: [],

  chapter: [{
    id: 0,
    name: '--',
    active: false,
    selected: false,
  }],
  categories: [{
    id: 0,
    name: '--',
    active: false,
    selected: false,
    mainSection: {
      id: 0,
    },
  }],

  mainForm: {
    item: {
      id: 0,
      name: '--',
      active: false,
      selected: false,
    },
    active: true,
  },

  subForm: {
    item: {
      id: 0,
      name: '--',
      active: false,
      selected: false,
      mainSection: {
        id: 0,
      },
    },
    active: true,
  },

  selectedName: '',
  showSectionInDirectory: true,

  mainSectionCreationMode: false,
  subSectionCreationMode: false,

  mainSectionsSelectedItemId: 0,
};
