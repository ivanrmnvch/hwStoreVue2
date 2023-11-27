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
      <div class="checkout-page__header-count">
        Кол-во
      </div>
      <div class="checkout-page__header-price">
        Цена
      </div>
    </div>
    <div class="col">
      <div
        v-for="([orderId, value]) in orders"
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
            v-for="(order, index) in value"
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
                {{ order.product.count }}
              </div>
            </div>
            <div class="checkout-page__header-price">
              <div class="mb-1 mt-1" />
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
  },
  async mounted() {
    await this.getOrders();
  },
  methods: {
    ...mapActions('orders', [
      'getOrders',
    ]),
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
    &-price
      border-left: 1px solid gray
      padding-left: 5px
  &__payment-btn
    flex: 0 0 55%
  &__container
    border-bottom: 1px solid gray
</style>
