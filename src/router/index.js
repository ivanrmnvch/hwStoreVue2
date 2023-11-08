import Vue from 'vue';
import VueRouter from 'vue-router';

import CatalogEditPage from '../modules/CatalogEditPage/pages/CatalogEditPage.vue';
import StorePage from '../modules/store/pages/StorePage.vue';
import EditPage from '../modules/editPage/pages/EditPage.vue';
import ProfilePage from '../modules/profile/pages/ProfilePage.vue';
import CreatePage from '../modules/createPage/pages/CreatePage.vue';
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
    path: '/product/new',
    name: 'CreatePage',
    component: CreatePage,
  },
  {
    path: '/product/catalog-edit',
    name: 'CatalogEditPage',
    component: CatalogEditPage,
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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
