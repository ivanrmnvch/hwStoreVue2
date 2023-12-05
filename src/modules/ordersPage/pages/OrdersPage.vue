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
      <div class="checkout-page__header-status">
        Статус
      </div>
    </div>
    <div class="col">
      <div
        v-for="({ orderId, items }) in getOrderObject"
        :key="orderId"
        class="checkout-page__container row"
      >
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
          </div>
        </div>
        <div class="checkout-page__header-price">
          <div
            v-for="(value, index) in getOrderPrice(items).text"
            :key="index"
          >
            {{ value }}
          </div>
          <div>
            {{ `Итог: ${getOrderPrice(items).total} ₽` }}
          </div>
        </div>
        <div class="checkout-page__header-status">
          {{ getStatus(orderId) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapActions,
  mapGetters,
} from 'vuex';

export default {
  name: 'OrdersPage',
  computed: {
    ...mapGetters('orders', [
      'getOrderObject',
      'getStatus',
    ]),
  },
  async mounted() {
    await this.getOrders();
  },
  methods: {
    ...mapActions('orders', [
      'getOrders',
    ]),
    getOrderPrice(items) {
      const total = items.reduce((acc, item) => (item.count * item.product.price + acc), 0);
      const text = items.map((item) => {
        const sum = item.count * item.product.price;
        return `${item.product.price} ₽ x ${item.count} ед | ${sum} ₽`;
      });
      return {
        text,
        total,
      };
    },
  },
};
</script>
<style lang="sass" scoped>
.checkout-page
  margin-top: 250px
  background-color: white
  border-radius: 8px
  width: 750px
  height: fit-content
  box-shadow: 2px 2px 5px -1px gray
  padding: 10px
  min-height: 100px
  &__btn-exit-wrapper
    position: absolute
    left: 725px
  &__header
    margin-top: 10px
    border-bottom: 1px solid gray
    &-reqnum
      flex: 0 0 8%
    &-product
      border-left: 1px solid gray
      padding-left: 5px
      flex: 0 0 300px
    &-status
      border-left: 1px solid gray
      flex: 0 0 100px
      padding-left: 5px
      &-text
        text-align: center
    &-price
      border-left: 1px solid gray
      padding-left: 5px
      flex: 0 0 272px
  &__payment-btn
    flex: 0 0 55%
  &__container
    border-bottom: 1px solid gray
</style>
