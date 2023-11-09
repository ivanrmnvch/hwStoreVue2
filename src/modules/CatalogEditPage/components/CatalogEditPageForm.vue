<template>
  <div class="col edit-form">
    <div class="catalog-page__title mb-4">
      {{ getTitle }}
    </div>
    <div class="justify-space-between mb-3 row">
      <div class="row">
        <p class="reset">
          Поиск:
        </p>
        <select
          class="catalog-page__select ml-2"
          :disabled="showSearchBlock"
          @input="(value) => createEvent('click', JSON.parse(value.target.value))"
        >
          <option
            v-for="(item, index) in sectionItems"
            :key="index"
            :value="JSON.stringify(item)"
            :selected="item.selected"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="row">
        <input
          :disabled="showSearchBlock"
          :checked="form.active"
          type="checkbox"
          @change="CHANGE_ACTIVE(type)"
        >
        <p class="reset">
          Active
        </p>
      </div>
    </div>
    <div class="catalog-page__delimiter-line mb-3" />
    <div class="mb-3">
      <div class="mb-2">
        {{ getTextFieldTitle }}
      </div>
      <input
        class="catalog-page__text-field"
        :disabled="unShowUi"
        :value="form.item.name"
        type="text"
        @input="(value) => SET_FORM_FIELD({
          field: 'name',
          type,
          value: value.target.value,
        })"
      >
    </div>
    <div class="mb-3 row">
      <div>
        Показывать раздел в поиске:
      </div>
      <input
        :disabled="unShowUi"
        :checked="form.item.active"
        class="ml-2"
        type="checkbox"
        @change="SET_FORM_FIELD({
          field: 'active',
          type,
          value: !form.item.active,
        })"
      >
    </div>
    <div class="catalog-page__title col">
      <button
        class="catalog-page__create-btn mb-2"
        :disabled="!showBtnSave || unShowUi"
      >
        <img
          class="catalog-page__btn-icon"
          :class="{ 'catalog-page__btn-icon-disabled': shutdown }"
          src="../../../../public/icons/edit-svgrepo-com.svg"
        >
        <div class="ml-2">
          Сохранить изменения
        </div>
      </button>
      <button
        :disabled="shutdown"
        @click="CHANGE_CREATION_MODE(type)"
      >
        <div
          v-if="!creationMode"
          class="catalog-page__create-btn"
        >
          <img
            class="catalog-page__btn-icon"
            :class="{ 'catalog-page__btn-icon-disabled': shutdown }"
            src="../../../../public/icons/add-square-svgrepo-com.svg"
          >
          <div class="ml-2">
            {{ getCreateBtnText }}
          </div>
        </div>
        <div
          v-else
          class="catalog-page__create-btn"
        >
          <img
            class="catalog-page__btn-icon"
            :class="{ 'catalog-page__btn-icon-disabled': shutdown }"
            src="../../../../public/icons/exit-svgrepo-com.svg"
          >
          <div class="ml-2">
            {{ getCreateBtnText }}
          </div>
        </div>
      </button>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

// todo новый под раздел сделать второе имя кнопке
// todo динамические заголовки

export default {
  name: 'CatalogEditPageForm',
  props: {
    type: {
      type: String,
      required: true,
    },
    sectionItems: {
      type: Array,
      default: () => ([{
        id: 0,
        name: '--',
        active: false,
        selected: false,
      }]),
    },
    form: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    creationMode: {
      type: Boolean,
      default: false,
    },
    anotherMod: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState('catalogEdit', [
      'mainForm',
      'subForm',
    ]),
    ...mapGetters('catalogEdit', [
      'formHasChanged',
    ]),
    getSelectedId() {
      return this.form.item.id;
    },
    showBtnSave() {
      return this.formHasChanged(this.type);
    },
    getCreateBtnText() {
      if (this.creationMode) {
        return 'Выйти';
      }
      return this.type === 'main'
        ? 'Создать новый раздел'
        : 'Создать новый подраздел';
    },
    getTitle() {
      if (this.creationMode) {
        return this.type === 'main'
          ? 'Создание раздела'
          : 'Создание подраздела';
      }
      return this.type === 'main'
        ? 'Редактирование раздела'
        : 'Редактирование подраздела';
    },
    getTextFieldTitle() {
      if (this.creationMode) {
        return this.type === 'main'
          ? 'Введите название раздела'
          : 'Введите название подраздела';
      }
      return this.type === 'main'
        ? 'Редактировать название раздела'
        : 'Редактировать название подраздела';
    },
    getForm() {
      switch (this.type) {
        case 'main':
          return this.mainForm;
        case 'sub':
          return this.subForm;
        default:
          return null;
      }
    },
    unShowUi() {
      return (Object.keys(this.getForm.item).length === 0
        || this.getForm.item.id === 0
        || this.shutdown) && !this.creationMode;
    },
    shutdown() {
      return this.disabled || this.globalShutdown;
    },
    globalShutdown() {
      return this.creationMode === false && this.anotherMod === true;
    },
    showSearchBlock() {
      return this.type === 'main'
        ? (this.shutdown && !(this.type === 'main' && this.globalShutdown)) || this.creationMode
        : this.shutdown || this.creationMode;
    },
  },
  watch: {
    creationMode(mode) {
      console.log('mode', mode);
      if (mode) {
        if (this.type === 'main') {
          console.log('main');
          this.CLEAR_MAIN_SECTION();
          this.CLEAR_SUB_SECTION();
          this.SET_FORM_FIELD({ type: 'main', field: 'name', value: '' });
          this.SET_FORM_FIELD({ type: 'sub', field: 'name', value: '' });
        }
        if (this.type === 'sub') {
          // this.CLEAR_SUB_SECTION();
          this.SET_FORM_FIELD({ type: 'main', field: 'name', value: '--' });
          this.SET_FORM_FIELD({ type: 'sub', field: 'name', value: '' });
        }
      } else {
        if (this.type === 'main') {
          this.SET_MAIN_SECTIONS();
          this.ROOT_SET_FORM({ type: 'main', id: 0, name: '--' });
        }
        if (this.type === 'sub') {
          this.ROOT_SET_FORM({ type: 'main', id: 0, name: '--' });
        }
      }
    },
  },
  methods: {
    ...mapMutations('catalogEdit', [
      'CHANGE_CREATION_MODE',
      'CLEAR_MAIN_SECTION',
      'CLEAR_SUB_SECTION',
      'SET_MAIN_SECTIONS',
      'SET_FORM_FIELD',
      'CHANGE_ACTIVE',
      'ROOT_SET_FORM',
    ]),
    createEvent(event, value) {
      // console.log('value', value);
      this.$emit(event, value);
    },
  },
};
</script>
<style lang="sass" scoped>
.catalog-page
  &__title
    text-align: center
  &__select
    width: 150px
    height: 19px
  &__text-field
    height: 13px
    width: 277px
  &__delimiter-line
    border-bottom: 1px solid gray
  &__btn-icon
    object-fit: contain
    width: 15px
    height: 15px
    &-disabled
      opacity: 0.3
  &__create-btn
    display: flex
    flex-direction: row
    justify-content: center
</style>
