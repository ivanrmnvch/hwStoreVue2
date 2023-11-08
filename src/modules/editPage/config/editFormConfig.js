export default () => [
  {
    name: 'ID:',
    readonly: true,
    value: 'id',
    type: 'text',
  },
  {
    name: 'Название:',
    readonly: false,
    value: 'name',
    type: 'text',
  },
  {
    name: 'Описание',
    readonly: false,
    value: 'description',
    type: 'text',
  },
  {
    name: 'Цена:',
    readonly: false,
    value: 'price',
    type: 'number',
  },
  {
    name: 'Url картинки:',
    readonly: false,
    value: 'imagePath',
    type: 'url',
  },
  {
    name: 'Бренд:',
    readonly: false,
    value: 'brand',
    type: 'text',
  },
  {
    name: 'Категория:',
    readonly: false,
    value: 'category',
    type: 'text',
  },
];
