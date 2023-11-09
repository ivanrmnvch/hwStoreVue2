<template>
  <div class="edit-page">
    <div class="col">
      <!--      <jsp:include page="../../ui/buttons/return-btn.html.jsp">-->
      <!--        <jsp:param-->
      <!--          name="action"-->
      <!--          value="profile"-->
      <!--        />-->
      <!--      </jsp:include>-->

      <div class="edit-page-form row">
        <CatalogEditPageForm
          :creation-mode="mainSectionCreationMode"
          :another-mod="subSectionCreationMode"
          :section-items="chapter"
          :form="mainForm"
          type="main"
          @click="(value) => setMainForm({ type: 'main', value })"
        />
        <CatalogEditPageForm
          :creation-mode="subSectionCreationMode"
          :another-mod="mainSectionCreationMode"
          :section-items="categories"
          :disabled="showSubSections"
          :form="subForm"
          type="sub"
          @click="(value) => setSubForm({ type: 'sub', value })"
        />
      </div>
      <!--      <div class="btn-wrapper">-->
      <!--        <button-->
      <!--          class="btn-edit"-->
      <!--          @click="create"-->
      <!--        >-->
      <!--          Редактировать-->
      <!--        </button>-->
      <!--      </div>-->
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import CatalogEditPageForm from '../components/CatalogEditPageForm.vue';

export default {
  name: 'CatalogEditPage',
  components: {
    CatalogEditPageForm,
  },
  computed: {
    ...mapState('catalogEdit', [
      'mainSectionCreationMode',
      'subSectionCreationMode',
      'categories',
      'mainForm',
      'subForm',
      'chapter',
    ]),
    showSubSections() {
      return this.categories.length === 1;
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions('catalogEdit', [
      'init',
    ]),
    ...mapMutations('catalogEdit', [
      // 'DISABLED_SUB_FORM',
      'SET_SELECTED_ITEM',
      'SET_SUB_SECTIONS',
      'CLEAR_SUB_FORM',
      'SET_FORM',
    ]),
    setMainForm({ type, value }) {
      this.SET_SUB_SECTIONS(value.id);
      this.SET_SELECTED_ITEM({ type: 'sub', id: 0 });
      this.SET_FORM({ type, value });
      if (value.id === 0) {
        this.CLEAR_SUB_FORM();
      }
    },
    setSubForm({ type, value }) {
      this.SET_FORM({ type, value });
      this.SET_SELECTED_ITEM({ type: 'sub', id: value.id });
    },
  },
};
</script>
<style lang="sass" scoped>
.edit-page
  background-color: white
  border-radius: 8px
  width: 625px
  height: 226px
  box-shadow: 2px 2px 5px -1px gray
  padding: 10px
.edit-text-field
  font-size: 14px
  padding: 10px
  border-radius: 3px
  border: 1px solid #ccc
  height: 28px
  flex: 1 1 207px
.edit-form
  width: 285px
  margin: 5px 0 5px 0
  height: 216px
.edit-form__name
  justify-content: center
  max-width: 93px
  flex: 1 1 93px
.edit-page-form
  padding: 0 15px
  flex-wrap: wrap
  justify-content: space-between
.btn-edit
  border: none
  color: white
  margin: 18px
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
  justify-content: start
.btn-wrapper
  display: flex
  flex-direction: row
  justify-content: start
</style>
