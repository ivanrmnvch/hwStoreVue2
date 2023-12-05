export default {
  getOrderObject(state) {
    return Array.from(state.orders, ([orderId, items]) => ({ orderId, items }));
  },
  getStatus: (state, getters) => (orderId) => {
    const { items } = getters.getOrderObject
      .find((orderObj) => orderObj.orderId === orderId);
    const [{ status }] = items || [{}];
    return status;
  },
  getOrderStatus(state) {
    const { order } = state;
    return order.length
      ? order[0].status
      : null;
  },
};
