<template>
  <section>
    <div class="row store-app">
      <ProductFilter />
      <!--        <div class="store-filter">-->
      <!--          <jsp:include page="../../ui/filter.html.jsp">-->
      <!--            <jsp:param name="name" value="${data.getFilter().getName()}"></jsp:param>-->
      <!--            <jsp:param name="priceMin" value="${data
        .getFilter().getPrice().getMin()}"></jsp:param>-->
      <!--            <jsp:param name="priceMax" value="${dat
        a.getFilter().getPrice().getMax()}"></jsp:param>-->
      <!--            <jsp:param name="brand" value="${data.g
        etFilter().getBrand()}"></jsp:param>-->
      <!--            <jsp:param name="category" value="${data
        .getFilter().getCategory()}"></jsp:param>-->
      <!--            <jsp:param name="brands" value="${data.g
        etFilter().getBrands()}"></jsp:param>-->
      <!--            <jsp:param name="categories" value="${d
        ata.getFilter().getCategories()}"></jsp:param>-->
      <!--          </jsp:include>-->
      <!--        </div>-->
      <div class="col store-product">
        <div v-if="products.length">
          <ProductCard
            v-for="product in products"
            :id="product.id"
            :key="product.id"
            :name="product.name"
            :description="product.description"
            :image-path="product.imagePath"
            :price="product.price"
          />
        </div>
        <div v-else>
          <div class="empty-wrapper">
            <div class="empty-content">
              По вашему запросу ничего не найдено! Укажите корректные данные для поиска.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row store-pagination">
      <!--        todo 1. сделать пагинацию limit + offset
                         2. -->

      <!--        <jsp:include page="../../ui/pagination.html.jsp">-->
      <!--          <jsp:param name="pagination" value="${
        data.getTableMeta().getPagination()}"/>-->
      <!--          <jsp:param name="page" value="${data.getTableMeta().getPage()}"/>-->
      <!--        </jsp:include>-->
      <!--        <jsp:include page="../../ui/dropbox.html.jsp">-->
      <!--          <jsp:param name="limit" value="${data.getTableMeta().getLimit()}"/>-->
      <!--        </jsp:include>-->
    </div>
  </section>
</template>
<script>
import { mapState, mapActions } from 'vuex';

import ProductCard from '../components/ProductCard.vue';
import ProductFilter from '../components/ProductFilter.vue';

export default {
  name: 'StorePage',
  components: {
    ProductCard,
    ProductFilter,
  },
  computed: {
    ...mapState('products', [
      'products',
    ]),
  },
  mounted() {
    this.init();
    console.log('TEST', [] + null + 1);
  },
  methods: {
    ...mapActions('products', [
      'init',
    ]),
  },
};
</script>
<style lang="sass" scoped>
.empty-wrapper
  width: 540px
  height: 232px
  display: flex
  justify-content: center
  align-items: center
.empty-content
  text-align: center
  width: 450px
  height: 100px
  background-color: white
  border-radius: 8px
  display: flex
  justify-content: center
  align-items: center
  box-shadow: 2px 2px 5px -1px gray
.store-app
  justify-content: center
.store-product
  margin-top: 40px
.store-pagination
  margin-bottom: 128px
.store-filter
  position: relative
  top: 10px
  z-index: 0
</style>
