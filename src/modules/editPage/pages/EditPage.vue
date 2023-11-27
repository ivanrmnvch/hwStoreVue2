<template>
  <div class="edit-page">
    <div style="position: absolute">
      <button
        class="btn-exit catalog-edit-page__btn-exit-wrapper"
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
      <!--          <jsp:include page="../../ui/buttons/return-btn.html.jsp">-->
      <!--            <jsp:param-->
      <!--              name="action"-->
      <!--              value="profile"-->
      <!--            />-->
      <!--          </jsp:include>-->

      <div class="edit-page-form row">
        <div
          v-for="element in editFormConfig()"
          :key="element.value"
          class="edit-form row"
        >
          <p class="col edit-form__name reset">
            {{ element.name }}
          </p>
          <input
            :readonly="element.readonly"
            :value="editForm[element.value]"
            :type="element.type"
            required
            class="edit-text-field ml-4"
            @input="(value) => SET_EDIT_FORM_FIELD({
              field: element.value,
              value: value.target.value,
            })"
          >
        </div>
        <div class="edit-form row">
          <p class="col edit-form__name reset">
            Active
          </p>
          <input
            :checked="editForm.active"
            type="checkbox"
            required
            class="edit-text-field ml-4"
            @input="SET_EDIT_FORM_CHECKBOX"
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
      </div>
      <div class="btn-wrapper">
        <button
          class="btn-edit"
          @click="update"
        >
          Редактировать
        </button>
        <div class="catalog-edit-page__brand-wrapper row">
          <p class="catalog-edit-page__brand-label reset">
            Бренд
          </p>
          <select
            class="edit-text-field"
            @input="(value) => setBrand(JSON.parse(value.target.value))"
          >
            <option
              v-for="brand in brands"
              :key="brand.id"
              :value="JSON.stringify(brand)"
              :selected="brand.id === selectedBrandId"
            >
              {{ brand.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';

import editFormConfig from '../config/editFormConfig';

export default {
  name: 'EditPage',
  data: () => ({ editFormConfig }),
  computed: {
    ...mapState('edit', [
      'editForm',
      'mainSections',
      'mainSectionSelectedId',
      'subSectionSelectedId',
      'selectedBrandId',
      'categories',
      'brands',
    ]),
  },
  async mounted() {
    const { id } = this.$route.params;
    await this.init(id);
  },
  methods: {
    ...mapActions('edit', [
      'updateProduct',
      'init',
    ]),
    ...mapMutations('edit', [
      'SET_EDIT_FORM_CHECKBOX',
      'SET_EDIT_FORM_FIELD',
      'UPDATE_CATEGORIES',
      'SET_DATA',
    ]),
    async update() {
      const { id } = this.$route.params;
      await this.updateProduct(id);
    },
    setMainSection(value) {
      this.SET_DATA({ type: 'mainSectionSelectedId', value: value.id });
      this.UPDATE_CATEGORIES();
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
input[type=checkbox]
  transform: scale(0.5)
.catalog-edit-page
  &__btn-exit-wrapper
    position: absolute
    left: 705px
  &__brand-wrapper
    width: 329px
    margin-right: 25px
  &__brand-label
    margin-right: 68px
</style>
