import Vue from 'vue';
import VueRouter from 'vue-router';

import StorePage from '../modules/store/pages/StorePage.vue';
import EditPage from '../modules/editPage/pages/EditPage.vue';
import BasketPage from '../modules/basket/pages/BasketPage.vue';
import ProfilePage from '../modules/profile/pages/ProfilePage.vue';
import OrdersPage from '../modules/ordersPage/pages/OrdersPage.vue';
import CreatePage from '../modules/createPage/pages/CreatePage.vue';
import MessagePage from '../modules/messagePage/pages/MessagePage.vue';
import CheckoutPage from '../modules/checkoutPage/pages/CheckoutPage.vue';
import CatalogEditPage from '../modules/catalogEditPage/pages/CatalogEditPage.vue';
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
    component: BasketPage,
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
  {
    path: '/checkout',
    name: 'CheckoutPage',
    component: CheckoutPage,
  },
  {
    path: '/message',
    name: 'MessagePage',
    component: MessagePage,
  },
  {
    path: '/orders',
    name: 'OrdersPage',
    component: OrdersPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
