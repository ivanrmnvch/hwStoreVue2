<template>
  <section class="product-card">
    <div class="product-card__first-col">
      <button
        class="product__card-wrap"
        @click="openDetailsPage"
      >
        <div class="img-box">
          <img
            class="image-btn image-wrapper img-box"
            :src="imagePath"
          >
        </div>
      </button>
    </div>
    <div class="ml-2 product-card__info">
      <div class="mb-4">
        {{ name }}
      </div>
      <div class="mb-4 product-card__description">
        {{ description }}
      </div>
      <div class="product-card__price">
        {{ `Стоимость: ${price}` }}
        &#8381;
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'ProductCard',
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
    },
    imagePath: {
      type: String,
      default: '',
    },
  },
  methods: {
    openDetailsPage() {
      this.$router.push({
        name: 'ProductDetailPage',
        params: {
          id: this.id,
        },
      });
    },
  },
};
</script>
<style lang="sass" scoped>
.product-card
  display: flex
  flex-direction: row
  background-color: white
  box-shadow: 2px 2px 5px -1px gray
  width: 500px
  border-radius: 8px
  padding: 10px
  margin: 10px
.product-card__first-col
  flex-basis: 160px
.product-card__description
  line-height: 20px
  height: 60px
  overflow: hidden
.product-card__price
  text-align: end
.product-card__info
  display: flex
  flex-direction: column
.product__card-wrap
  border: none !important
  background-color: white !important
.img-box
  height: 128px
  width: 160px
</style>
