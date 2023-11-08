import store from '../../store';

export default {
  userIsAuth() {
    const { user } = store.state.auth;
    return !!user;
  },
};
