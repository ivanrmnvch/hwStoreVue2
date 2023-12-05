export default {
  orders: new Map(),
  order: [],
  orderId: '',
  selectedStatus: '',
  statuses: [
    {
      name: 'created',
      selected: false,
    },
    {
      name: 'send',
      selected: false,
    },
    {
      name: 'successful',
      selected: false,
    },
    {
      name: 'canceled',
      selected: false,
    },
  ],
};
