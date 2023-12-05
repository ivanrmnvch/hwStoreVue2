<template>
  <div class="change-status-page">
    <div style="position: absolute">
      <button
        class="btn-exit change-status-page__btn-exit-wrapper"
        @click="$router.push({ name: 'Basket' })"
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
    <div>
      <div class="mb-2 mt-1 pl-2">
        Редактировать статус заказа
      </div>
      <div class="mb-2">
        <input
          min="1"
          type="number"
          oninput="validity.valid || (value='');"
          placeholder="Enter id"
          class="change-status-page__field"
          @input="SET_DATA({ type: 'orderId', value: $event.target.value })"
        >
        <button
          class="change-status-page__btn ml-2"
          @click="getOrder"
        >
          Найти
        </button>
      </div>
      <div>
        <select
          class="change-status-page__select"
          :disabled="!selectedStatus"
          @input="SET_DATA({ type: 'selectedStatus', value: $event.target.value })"
        >
          <option
            v-for="(status, index) in statuses()"
            :key="index"
            :selected="status.name === selectedStatus"
          >
            {{ status.name }}
          </option>
        </select>
        <button
          class="change-status-page__btn ml-2"
          :disabled="!selectedStatus"
          @click="saveStatus"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import statuses from '../entities';

export default {
  name: 'ChangeOrderStatusPage',
  data: () => ({ statuses }),
  computed: {
    ...mapState('orders', [
      'selectedStatus',
    ]),
  },
  methods: {
    ...mapMutations('orders', [
      'SET_DATA',
    ]),
    ...mapActions('orders', [
      'saveStatus',
      'getOrder',
    ]),
  },
};
</script>
<style lang="sass" scoped>
.change-status-page
  margin-top: 250px
  background-color: white
  border-radius: 8px
  width: 230px
  height: fit-content
  box-shadow: 2px 2px 5px -1px gray
  padding: 10px
  min-height: 100px
  &__btn-exit-wrapper
    position: absolute
    left: 205px
  &__field
    width: 100px
  &__select
    width: 108px
    height: 21px
  &__btn
    width: 83px
</style>
