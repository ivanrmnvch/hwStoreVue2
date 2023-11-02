import Vue from 'vue';
import VueRouter from 'vue-router';

import EditPage from '../modules/editPage/pages/EditPage.vue';
import StorePage from '../modules/store/pages/StorePage.vue';
import ProfilePage from '../modules/profile/pages/ProfilePage.vue';
import ProductDetailPage from '../modules/productDetailsPage/pages/ProductDetailPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
  },
  {
    path: '/',
    name: 'Store',
    component: StorePage,
  },
  {
    path: '/basket',
    name: 'Basket',
  },
  {
    path: '/product/:id',
    name: 'ProductDetailPage',
    component: ProductDetailPage,
  },
  {
    path: '/product/edit/:id',
    name: 'EditPage',
    component: EditPage,
  },
  {
    path: '/product/new',
    name: 'CreatePage',

  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
