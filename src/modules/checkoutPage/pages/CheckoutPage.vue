<template>
  <div class="checkout-page">
    <div style="position: absolute">
      <button
        class="btn-exit checkout-page__btn-exit-wrapper"
        @click="$router.push({ name: 'Basket' })"
      >
        <div class="image-btn-exit-box">
          <img
            class="btn-exit-icon image-btn"
            src="../../../../public/icons/cross-checkbox-svgrepo-com.svg"
            alt="exit"
          >
        </div>
      </button>
    </div>
    <div class="checkout-page__header row">
      <div class="checkout-page__header-product">
        Товар
      </div>
      <div class="checkout-page__header-count">
        Кол-во
      </div>
      <div class="checkout-page__header-price">
        Цена
      </div>
    </div>
    <div class="col">
      <div
        v-for="(order, index) in getOrders"
        :key="index"
        class="row"
      >
        <div class="checkout-page__header-product">
          <div class="mb-1 mt-1">
            {{ order.product.name }}
          </div>
        </div>
        <div class="checkout-page__header-count">
          <div class="mb-1 mt-1">
            {{ order.count }}
          </div>
        </div>
        <div class="checkout-page__header-price">
          <div class="mb-1 mt-1">
            {{ getPrice({ product: order.product, count: order.count }) }}
          </div>
        </div>
      </div>
    </div>
    <div class="mt-2 row">
      <div class="checkout-page__payment-btn">
        <button @click="openMessagePage">
          Оплатить
        </button>
      </div>
      <div class="row">
        <div>
          {{ getText }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'CheckoutPage',
  computed: {
    ...mapState('checkoutPage', [
      'orders',
    ]),
    getSum() {
      return this.orders.reduce((acc, { product, count }) => (acc + (product.price * count)), 0);
    },
    getText() {
      return `Итоговая сумма: ${this.getSum}`;
    },
    getOrders() {
      return this.orders;
    },
  },
  async mounted() {
    await this.getList();
  },
  methods: {
    ...mapActions('checkoutPage', [
      'checkout',
      'getList',
    ]),
    ...mapActions('basket', [
      'getBasket',
    ]),
    ...mapMutations('messagePage', [
      'SET_MESSAGE',
    ]),
    getPrice({ product, count }) {
      return product.price * count;
    },
    async openMessagePage() {
      this.SET_MESSAGE('Заказ успешно оформлен');
      await this.checkout();
      await this.getBasket();
      await this.$router.push({ name: 'MessagePage' });
    },
  },
};
</script>
<style lang="sass" scoped>
.checkout-page
  margin-top: 250px
  background-color: white
  border-radius: 8px
  width: 430px
  height: fit-content
  box-shadow: 2px 2px 5px -1px gray
  padding: 10px
  min-height: 100px
  &__btn-exit-wrapper
    position: absolute
    left: 405px
  &__header
    margin-top: 10px
    border-bottom: 1px solid gray
    &-product
      flex: 0 0 67%
    &-count
      border-left: 1px solid gray
      flex: 0 0 12%
      padding-left: 5px
    &-price
      border-left: 1px solid gray
      padding-left: 5px
  &__payment-btn
    flex: 0 0 55%
</style>
