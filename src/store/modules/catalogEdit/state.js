export default {
  mainSections: [],
  subSections: [],

  categories: [],

  mainForm: {
    item: {
      id: 0,
      name: '--',
      active: false,
    },
    active: true,
  },

  subForm: {
    item: {
      id: 0,
      name: '--',
      active: false,
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
