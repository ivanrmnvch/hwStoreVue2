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
    ]),
  },
  methods: {
    ...mapActions('create', [
      'createProduct',
    ]),
    ...mapMutations('create', [
      'SET_CREATE_FORM_FIELD',
    ]),
    async create() {
      await this.createProduct();
    },
  },
};
</script>
<style lang="sass" scoped>
.edit-page
  background-color: white
  border-radius: 8px
  width: 730px
  height: 239px
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
  width: 329px
  margin: 5px 0 5px 0
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
