<template>
  <div class="cart-page col">
    <div class="cart-page-items">
      <BasketProductCard
        v-for="(product, index) in basket"
        :key="index"
        :item="product"
      />
    </div>
    <div class="cart-page__btn-checkout-wrapper ml-4 mt-2">
      <button
        :disabled="productSelected"
        @click="openCheckoutPage"
      >
        Оформить заказ
      </button>
      <button
        class="ml-2"
        @click="$router.push({ name: 'OrdersPage' })"
      >
        Посмотреть заказы
      </button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

import BasketProductCard from '../components/BasketProductCard.vue';

export default {
  name: 'BasketPage',
  components: {
    BasketProductCard,
  },
  computed: {
    ...mapState('basket', [
      'basket',
    ]),
    productSelected() {
      return !this.basket.some((item) => item.selected);
    },
    // getProductIds() {
    //   return this.basket.filter((item) => item.selected).map((item) => item.id);
    // },
  },
  mounted() {
    this.getBasket();
  },
  methods: {
    ...mapActions('basket', [
      'getBasket',
      // 'checkout',
    ]),
    openCheckoutPage() {
      this.$router.push({
        name: 'CheckoutPage',
        // query: {
        //   id: this.basket.filter((item) => item.selected).map((item) => item.basketId),
        // },
      });
    },
  },
};
</script>
<style scoped lang="sass">
.cart-page
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  margin-top: 72px
  &__btn-checkout-wrapper
    width: 100%
.cart-page-items
  height: 100%
</style>
