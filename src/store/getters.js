export default {
  getBasketIds(state) {
    return state.basket.basket
      .filter((basket) => basket.selected)
      .map(({ basketId }) => basketId);
  },
};
