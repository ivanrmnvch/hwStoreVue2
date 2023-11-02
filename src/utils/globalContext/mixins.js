import getLocaleText from './getLocaleText';
import store from '../../store';

export default {
  getLangText(key, params = {}) {
    return getLocaleText(key, params);
  },
  userIsAuth() {
    const { user } = store.state.auth;
    return !!user;
  },
};
