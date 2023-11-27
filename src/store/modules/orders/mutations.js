export default {
  SET_DATA(state, { type, value }) {
    state[type] = value;
  },
  SET_ORDERS(state, orders) {
    state.orders = new Map([
      ...orders.map((order, index, arr) => {
        const { orderId } = order;
        const value = arr.filter((item) => item.orderId === orderId);
        return [orderId.toString(), value];
      }),
    ]);
  },
};
