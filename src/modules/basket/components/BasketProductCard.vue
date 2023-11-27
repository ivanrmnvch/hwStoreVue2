<template>
  <div class="basket-card content-wrapper justify-space-between row">
    <div class="img-box">
      <img
        class="image-wrapper img-box"
        :src="item.imagePath"
      >
    </div>
    <p class="basket-card__name basket-card__text col ml-4">
      {{ item.name }}
    </p>
    <p class="basket-card__price basket-card__text col ml-4">
      {{ item.price }}
      &#8381;
    </p>
    <div class="basket-card__count-wrapper row">
      <input
        class="basket-card__count ml-4"
        :value="item.count"
        min="1"
        type="number"
        oninput="validity.valid || (value='');"
        @input="(value) => changeCount(value.target.value)"
      >
    </div>
    <div class="basket-card__count-wrapper row">
      <input
        type="checkbox"
        :value="item.selected"
        @change="selectProduct"
      >
    </div>
    <button class="basket-card__btn-delete">
      <button
        class="product__card-wrap"
        @click="deleteBasket"
      >
        <div class="img-delete-box">
          <img
            class="image-btn image-wrapper img-delete-box"
            src="../../../../public/icons/cart-xmark-svgrepo-com.svg"
          >
        </div>
      </button>
    </button>
  </div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex';
import API from '@/utils/API';

export default {
  name: 'BasketProductCard',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions('basket', [
      'deleteBasketById',
    ]),
    ...mapMutations('basket', [
      'SELECT_PRODUCT',
    ]),
    async changeCount(value) {
      try {
        await API.put(`basket/${this.item.basketId}`, { count: value });
      } catch (e) {
        console.error(e);
      }
    },
    async deleteBasket() {
      await this.deleteBasketById(this.item.basketId);
    },
    selectProduct() {
      this.SELECT_PRODUCT(this.item.basketId);
    },
  },
};
</script>
<style scoped lang="sass">
.basket-card
  margin: 10px
  width: 600px
  height: 70px
  &__count
    height: 15px
    width: 40px
    &-wrapper
      align-items: center
.basket-card__text
  justify-content: center
.basket-card__btn-delete
  border: none
  background-color: white
  margin-left: 15px
.basket-card__name
  width: 230px
.basket-card__price
  width: 75px
.img-box
  height: 70px
  width: 97px
.img-delete-box
  height: 20px
  width: 20px
.product__card-wrap
  border: none !important
  background-color: white !important
</style>
