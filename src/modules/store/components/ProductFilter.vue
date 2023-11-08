<template>
  <div
    id="filter"
    class="content__wrapper"
  >
    <div class="content__filter">
      <div class="content__filter-name mb-1">
        Название
      </div>
      <input
        placeholder="Введите название товара"
        class="content__filter-search-field mb-2"
        type="text"
        :value="filter.name"
        @input="(value) => SET_FILTER_FIELD({ field: 'name', value: value.target.value })"
      >
      <div>
        <div class="content__filter-name mb-1">
          Раздел
        </div>
        <select
          class="content__filter-inputs mb-2"
          @input="(value) => SET_SUB_SECTIONS(value.target.value)"
        >
          <option
            v-for="(section, index) in mainSections"
            :key="index"
            :value="section.id"
            :selected="mainSectionsSelectedItemId"
          >
            {{ section.name }}
          </option>
        </select>
      </div>
      <div>
        <div class="content__filter-name mb-1">
          Категория товара
        </div>
        <select
          class="content__filter-inputs mb-2"
          :disabled="!categories.length"
          @input="(value) => SET_FILTER_FIELD({ field: 'category', value: value.target.value })"
        >
          <option
            v-for="(category, index) in categories"
            :key="index"
            :value="category.id"
            :selected="category.id === Number(filter.category)"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="content__filter-name mb-1">
        Бренд
      </div>
      <select
        class="content__filter-inputs mb-2"
        @input="(value) => SET_FILTER_FIELD({ field: 'brand', value: value.target.value })"
      >
        <option
          v-for="(brand, index) in brands"
          :key="index"
          :value="brand.id"
          :selected="brand.id === Number(filter.brand)"
        >
          {{ brand.name }}
        </option>
      </select>
      <div class="content__filter-price">
        <div class="mb-1">
          Цена
        </div>
        <div class="content__filter-price-row mb-2">
          <span class="mr-1">
            от
          </span>
          <input
            class="content__filter-price__input"
            placeholder="0"
            type="number"
            :value="filter.priceMin"
            @input="(value) => SET_FILTER_FIELD({ field: 'priceMin', value: value.target.value })"
          >
          <span class="ml-1 mr-1">до</span>
          <input
            class="content__filter-price__input"
            placeholder="300000"
            type="number"
            :value="filter.priceMax"
            @input="(value) => SET_FILTER_FIELD({ field: 'priceMax', value: value.target.value })"
          >
        </div>
      </div>
      <button
        class="mb-2"
        @click="getProductList"
      >
        Найти
      </button>
      <button
        @click="resetFilter"
      >
        Сбросить
      </button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'ProductFilter',
  computed: {
    ...mapState('products', [
      'mainSectionsSelectedItemId',
      'mainSections',
      'categories',
      'filter',
      'brands',
    ]),
  },
  methods: {
    ...mapActions('products', [
      'getProductList',
    ]),
    ...mapMutations('products', [
      'SET_SUB_SECTIONS',
      'SET_FILTER_FIELD',
      'CLEAT_FILTER',
    ]),
    async resetFilter() {
      await this.CLEAT_FILTER();
      await this.getProductList();
    },
  },
};
</script>
<style lang="sass" scoped>
.content__wrapper
  margin-top: 40px
  width: 230px
  height: 301px
  left: 165px
.content__filter
  display: flex
  flex-direction: column
  margin: 10px
  padding: 10px
  background-color: white
  box-shadow: 2px 2px 5px -1px gray
  border-radius: 8px
  height: calc(100% - 12px)
  width: calc(100% - 40px)
  font-family: Arial, sans-serif
  font-size: 14px
.content__filter-search-field
  width: initial
  height: 15px
.content__filter-inputs
  width: 100%
  height: 19px
.content__filter-price
  display: flex
  flex-direction: column
  align-items: flex-start
.content__filter-price-row
  display: flex
  flex-direction: row
  width: auto
  align-items: baseline
.content__filter-price__input
  width: 66px
  height: 15px
.content__filter-name
  text-align: start
</style>
