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
import ChangeOrderStatusPage from '../modules/changeOrderStatusPage/pages/ChangeOrderStatusPage.vue';

import { getRole } from '../utils/common';

const authorizedRoutes = [
  'Profile',
  'Basket',
  'CheckoutPage',
  'OrdersPage',
];

const adminRoutes = [
  'ChangeOrderStatusPage',
  'CatalogEditPage',
  'CreatePage',
  'EditPage',
];

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
  {
    path: '/orders/change-status',
    name: 'ChangeOrderStatusPage',
    component: ChangeOrderStatusPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const { name } = to;
  const role = getRole();
  switch (role) {
    case 'ROLE_ADMIN':
      next();
      break;
    case 'ROLE_USER': {
      if (adminRoutes.includes(name)) {
        next({ name: 'Store' });
      } else {
        next();
      }
      break;
    }
    default:
      if (authorizedRoutes.includes(name) || adminRoutes.includes(name)) {
        next({ name: 'Store' });
      } else {
        next();
      }
  }
});

export default router;
