<template>
  <div class="edit-page">
    <div style="position: absolute">
      <button
        class="btn-exit create-page__btn-exit-wrapper"
        @click="$router.push({ name: 'Profile' })"
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
    <div class="col">
      <div class="edit-page-form row">
        <div
          v-for="element in createFormConfig()"
          :key="element.value"
          class="edit-form row"
        >
          <p class="col edit-form__name reset">
            {{ element.name }}
          </p>
          <input
            required
            class="edit-text-field ml-4"
            :type="element.type"
            :value="createForm[element.value]"
            @input="(value) => SET_CREATE_FORM_FIELD({
              field: element.value,
              value: value.target.value,
            })"
          >
        </div>
        <div class="edit-form row">
          <p class="col edit-form__name reset">
            Раздел
          </p>
          <select
            class="edit-text-field ml-4"
            @input="(value) => setMainSection(JSON.parse(value.target.value))"
          >
            <option
              v-for="(section, index) in mainSections"
              :key="index"
              :selected="section.id === mainSectionSelectedId"
              :value="JSON.stringify(section)"
            >
              {{ section.name }}
            </option>
          </select>
        </div>
        <div class="edit-form row">
          <p class="col edit-form__name reset">
            Подраздел
          </p>
          <select
            class="edit-text-field ml-4"
            :disabled="disabledSubSection"
            @input="(value) => setSubSection(JSON.parse(value.target.value))"
          >
            <option
              v-for="(section, index) in categories"
              :key="index"
              :selected="section.id === subSectionSelectedId"
              :value="JSON.stringify(section)"
            >
              {{ section.name }}
            </option>
          </select>
        </div>
        <div class="edit-form row">
          <p class="col edit-form__name reset">
            Бренд
          </p>
          <select
            class="edit-text-field ml-4"
            @input="(value) => setBrand(JSON.parse(value.target.value))"
          >
            <option
              v-for="(brand, index) in brands"
              :key="index"
              :selected="brand.id === selectedBrandId"
              :value="JSON.stringify(brand)"
            >
              {{ brand.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="btn-wrapper">
        <button
          class="btn-edit"
          @click="create"
        >
          Редактировать
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import createFormConfig from '../config/createFormConfig';

export default {
  name: 'CreatePage',
  data: () => ({ createFormConfig }),
  computed: {
    ...mapState('create', [
      'createForm',
      'mainSections',
      'categories',
      'mainSectionSelectedId',
      'subSectionSelectedId',
      'selectedBrandId',
      'brands',
    ]),
    disabledSubSection() {
      return !this.categories.length || !this.mainSectionSelectedId === 0;
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions('create', [
      'createProduct',
      'init',
    ]),
    ...mapMutations('create', [
      'SET_CREATE_FORM_FIELD',
      'CHANGE_SECTIONS',
      'SET_DATA',
    ]),
    async create() {
      await this.createProduct();
    },
    setMainSection(value) {
      console.log('main value', value);
      this.CHANGE_SECTIONS(value.id);
    },
    setSubSection(value) {
      this.SET_DATA({ type: 'subSectionSelectedId', value: value.id });
    },
    setBrand(value) {
      this.SET_DATA({ type: 'selectedBrandId', value: value.id });
    },
  },
};
</script>
<style lang="sass" scoped>
.edit-page
  margin-top: 250px
  background-color: white
  border-radius: 8px
  width: 730px
  height: 239px
  box-shadow: 2px 2px 5px -1px gray
  padding: 10px
.edit-text-field
  font-size: 14px
  padding-left: 5px
  border-radius: 3px
  border: 1px solid #ccc
  height: 23px
  flex: 1 1 207px
.edit-form
  width: 329px
  margin: 5px 0 5px 0
.edit-form__name
  justify-content: center
  max-width: 93px
  flex: 1 1 93px
.edit-page-form
  padding: 20px 25px
  flex-wrap: wrap
  justify-content: space-between
.btn-edit
  border: none
  color: white
  margin-left: 25px
  padding: 10px 20px
  text-align: center
  text-decoration: none
  display: inline-block
  font-size: 16px
  border-radius: 3px
  cursor: pointer
  width: 30%
  background-color: #4CAF50
.btn-edit:hover
  background-color: #45a049
.btn-wrapper
  display: flex
  flex-direction: row
  justify-content: space-between
.create-page
  &__btn-exit-wrapper
    position: absolute
    left: 705px
</style>
