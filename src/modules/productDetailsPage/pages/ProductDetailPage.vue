<template>
  <section class="product-detail-page">
    <div class="product-detail-page__content">
      <div class="col">
        <h3
          class="mb-0 mt-2"
          style="margin-bottom: 5px;"
        >
          {{ product.name }}
        </h3>
        <div class="img-box">
          <img
            class="image-wrapper img-box"
            :src="product.imagePath"
          >
        </div>
        <div
          class="col product-detail-page__footer"
          style="align-items: center;"
        >
          <div class="row">
            <button
              class="btn btn-green"
              :class="getBtnClass"
              @click="addToCart"
            >
              Добавить в корзину
            </button>
            <div class="product-detail-page__count-wrapper row">
              <input
                class="ml-4 product-detail-page__count"
                :value="getCount"
                min="1"
                type="number"
                oninput="validity.valid || (value='');"
                @input="(value) => setCount(value.target.value)"
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col product-detail-page__info">
        <div class="product-detail-page__title">
          <h3 class="ml-8 mt-2">
            Описание
          </h3>
          <button
            class="btn-exit detail-page-return-btn"
            @click="$router.push({ name: 'Store' })"
          >
            <div class="image-btn-exit-box">
              <img
                class="btn-exit-icon image-btn"
                src="../../../../public/icons/cross-checkbox-svgrepo-com.svg"
                alt="exit"
              >
            </div>
          </button>
          <!--            <jsp:include page="../../ui/buttons/return-btn.html.jsp">-->
          <!--              <jsp:param-->
          <!--                name="action"-->
          <!--                value="products"-->
          <!--              />-->
          <!--            </jsp:include>-->
        </div>
        <p class="ml-8 mr-5 mt-0 product-detail-page__description">
          {{ product.description }}
        </p>
        <div class="col ml-8 product-detail-page__footer">
          <div class="row">
            <h3 class="reset">
              Стоимость:
            </h3>
            <h2 class="ml-2 product-detail-page__price reset">
              {{ product.price }}
            </h2>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'ProductDetailPage',
  data: () => ({
    id: '',
  }),
  computed: {
    ...mapState('products', [
      'product',
      'count',
    ]),
    getBtnClass() {
      return this.userIsAuth()
        ? ''
        : 'disabled';
    },
    getCount() {
      return this.count;
    },
  },
  mounted() {
    const { id } = this.$route.params;
    this.id = id;
    this.getProduct(id);
    this.SET_DATA({ type: 'count', value: '1' });
  },
  methods: {
    ...mapMutations('products', [
      'SET_DATA',
    ]),
    ...mapActions('products', [
      'getProduct',
      'addProductToCart',
    ]),
    addToCart() {
      this.addProductToCart(this.id);
    },
    setCount(value) {
      console.log('value', value);
      this.SET_DATA({ type: 'count', value: Number(value) <= 0 ? '1' : value });
    },
  },
};
</script>
<style lang="sass" scoped>
.product-detail-page
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  &__count
    height: 15px
    width: 40px
    &-wrapper
      align-items: center
.product-detail-page__content
  margin-top: 250px
  height: 400px
  width: 700px
  background-color: white
  border-radius: 8px
  box-shadow: 2px 2px 5px -1px gray
  padding: 10px
  display: flex
.product-detail-page__description
  padding: 10px
  text-align: justify
  overflow-y: auto
  height: 210px
  background-color: #f0f0f0
  border-radius: 8px
.product-detail-page__footer
  height: 126px
  justify-content: center
.product-detail-page__price
  line-height: 22px
.product-detail-page__title
  display: flex
  flex-direction: row
  justify-content: space-between
.product-detail-page__info
  width: 100%
.disabled
  background-color: #4caf507a !important
.disabled:hover
  background-color: #45a049a3 !important
.img-box
  height: 240px
  width: 293px
.detail-page-return-btn
  display: flex
  margin-top: 6px
</style>
