export default {
  SET_DATA(state, { type, value }) {
    state[type] = value;
  },
  SET_BASKET(state, payload) {
    state.basket = payload.map((item) => ({
      ...item.product,
      count: item.count,
      basketId: item.id,
      selected: false,
    }));
  },
  SELECT_PRODUCT(state, id) {
    state.basket = state.basket.map((item) => {
      if (item.basketId === id) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return item;
    });
  },
};
