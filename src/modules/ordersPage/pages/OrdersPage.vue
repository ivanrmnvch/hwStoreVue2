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
      <div class="checkout-page__header-reqnum">
        №
      </div>
      <div class="checkout-page__header-product">
        Товар
      </div>
      <div class="checkout-page__header-price">
        Стоимость заказа
      </div>
    </div>
    <div class="col">
      <div
        v-for="({ orderId, items }) in getOrderObject"
        :key="orderId"
        class="checkout-page__container row"
      >
        {{ orderId }}
        <div class="checkout-page__header-reqnum">
          <div class="mb-1 mt-1">
            {{ orderId }}
          </div>
        </div>
        <div class="col">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="row"
          >
            <div class="checkout-page__header-product">
              <div class="mb-1 mt-1">
                {{ item.product.name }}
              </div>
            </div>
            <!--            v-if="index === 0"-->
            <div

              class="checkout-page__header-price"
            >
              <p
                v-for="(text, row) in getPriceText({ orderId, item })"
                :key="row"
                class="mb-1 mt-1"
              >
                {{ text }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapState,
  mapActions,
} from 'vuex';

export default {
  name: 'OrdersPage',
  computed: {
    ...mapState('orders', [
      'orders',
    ]),
    getOrderObject() {
      return Array.from(this.orders, ([orderId, items]) => ({ orderId, items }));
    },
  },
  async mounted() {
    await this.getOrders();
  },
  methods: {
    ...mapActions('orders', [
      'getOrders',
    ]),
    getOrderById(id) {
      return this.getOrderObject.find(({ orderId }) => orderId === id);
    },
    getSum(orderId) {
      const order = this.getOrderById(orderId);
      return order.items.reduce((acc, item) => item.product.price * item.count + acc, 0);
    },
    getPriceText({ orderId, item }) {
      const sum = this.getSum(item.id);
      // const test = [
      //   `${order.product.price} x ${order.count} ед`,
      //   `Итог: ${sum}`,
      // ];
      // console.log('test,', test);
      // return test;
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
    &-reqnum
      flex: 0 0 8%
    &-product
      border-left: 1px solid gray
      padding-left: 5px
      flex: 0 0 240px
    &-count
      border-left: 1px solid gray
      flex: 0 0 50px
      padding-left: 5px
      &-text
        text-align: center
    &-price
      border-left: 1px solid gray
      padding-left: 5px
  &__payment-btn
    flex: 0 0 55%
  &__container
    border-bottom: 1px solid gray
</style>
