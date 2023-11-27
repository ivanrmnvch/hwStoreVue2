<template>
  <section
    class="profile-page"
    :class="`profile-page-${getRoleText}`"
  >
    <div class="row">
      <img
        class="profile-icon"
        src="../../../../public/icons/profile-circle-svgrepo-com.svg"
      >
      <div class="ml-5">
        <div class="row">
          <p class="mb-4 mt-4">
            Логин:
          </p>
          <p class="mb-4 ml-2 mt-4">
            {{ user }}
          </p>
        </div>
        <div class="row">
          <p class="mb-4 mt-4">
            Email:
          </p>
          <p class="mb-4 ml-2 mt-4">
            some email
          </p>
        </div>
        <div class="row">
          <p class="mb-4 mt-4">
            Роль:
          </p>
          <p class="mb-4 ml-2 mt-4">
            {{ getRoleText }}
          </p>
        </div>
      </div>
      <div class="btn-exit-wrapper profile-btn-exit-wrapper row">
        <button
          class="btn-exit"
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
      </div>
    </div>
    <template v-if="userIsAdmin">
      <div class="col profile-edit-block">
        <div class="profile-form-edit row">
          <div>
            Создайте новую позицию:
          </div>
          <button
            class="profile-create-btn"
            @click="$router.push({ name: 'CreatePage' })"
          >
            Создать
          </button>
        </div>
        <div>
          Введите id товара для редактирования:
        </div>
        <div class="profile-form-edit row">
          <input
            placeholder="Enter id"
            required
            class="profile-text-field"
            type="number"
            @input="SET_DATA({ field: 'productIdToEdit', value: $event.target.value })"
          >
          <button
            class="profile-edit-btn"
            @click="openEditPage"
          >
            Редактировать
          </button>
        </div>
        <div class="profile-form-edit row">
          <div>
            Создать / изменить каталог:
          </div>
          <button
            class="profile-create-btn"
            @click="$router.push({ name: 'CatalogEditPage' })"
          >
            Создать
          </button>
        </div>
      </div>
    </template>
  </section>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

import { getTokenData } from '@/utils/common';

export default {
  name: 'ProfilePage',
  computed: {
    ...mapState(['productIdToEdit']),
    ...mapState('auth', [
      'user',
      'token',
    ]),
    getUserRoles() {
      try {
        const data = getTokenData(this.token);
        const { roles } = data;
        return roles;
      } catch {
        return [];
      }
    },
    getRoleText() {
      const text = {
        ROLE_USER: 'user',
        ROLE_ADMIN: 'admin',
      };
      const [role] = this.getUserRoles;

      return text[role];
    },
    userIsAdmin() {
      const roles = this.getUserRoles;
      return roles.includes('ROLE_ADMIN');
    },
  },
  methods: {
    ...mapMutations(['SET_DATA']),
    openEditPage() {
      const id = this.productIdToEdit;
      if (id && id > 0) {
        this.$router.push({
          name: 'EditPage',
          params: { id },
        });
      }
    },
  },
};
</script>
<style lang="sass" scoped>
.profile-page
  margin-top: 250px
  background-color: white
  border-radius: 8px
  width: 330px
  height: 310px
  box-shadow: 2px 2px 5px -1px gray
  padding: 10px
.profile-page-user
  height: 150px
.profile-icon
  object-fit: contain
  width: 50px
  height: 50px
.profile-create-btn
  border: none
  border-radius: 3px
  cursor: pointer
  color: white
  font-size: 16px
  background-color: #4c9a50
  padding: 5px 20px
.profile-create-btn:hover
  background-color: #45a049
.profile-create-btn:active
  background-color: #51be56
.profile-edit-btn
  border: none
  border-radius: 3px
  cursor: pointer
  color: white
  font-size: 16px
  background-color: #ce35c8
  padding: 5px 20px
.profile-edit-btn:hover
  background-color: #bf44ba
.profile-edit-btn:active
  background-color: #a643a1
.profile-text-field
  font-size: 14px
  padding: 10px
  border-radius: 3px
  border: 1px solid #ccc
  height: 7px
  width: 150px
.profile-form-edit
  justify-content: space-between
.profile-edit-block
  justify-content: space-around
  height: calc(100% - 150px)
.profile-btn-exit-wrapper
  width: 136px
  align-items: start
  padding-top: 6px
</style>
