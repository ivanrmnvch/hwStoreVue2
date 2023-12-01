import API from '@/utils/API';
import {
  setSessionToken,
  checkExpiresSessionToken,
  getSessionData,
  getSessionToken,
  removeSessionToken,
} from '@/utils/common';

export default {
  async authorization({ state, commit, dispatch }) {
    const { login, password } = state.modalLogin;
    try {
      const res = await API.post('/auth', { login, password });
      // eslint-disable-next-line no-console
      const data = JSON.parse(res.data);
      setSessionToken(data.token);
      commit('auth/SET_AUTH', {
        user: data.login,
        token: data.token,
      });
      dispatch('setTokenUpdate');
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },

  checkToken({ commit }) {
    const check = checkExpiresSessionToken();
    if (check) {
      const token = getSessionToken();
      const { sub } = getSessionData();
      commit('auth/SET_AUTH', { user: sub, token });
    }
  },

  logout({ commit, dispatch }) {
    removeSessionToken();
    dispatch('deleteInterval');
    commit('auth/SET_AUTH', { user: null, token: null });
  },

  async refresh({ commit, dispatch }) {
    const checkToken = checkExpiresSessionToken();

    if (!checkToken) {
      dispatch('deleteInterval');
      return;
    }

    const token = getSessionToken();

    const res = await API.post('/refresh', { token });
    const { data } = JSON.parse(res.data);
    commit('auth/SET_AUTH', {
      user: data.login,
      token: data.token,
    });
    setSessionToken(data.token);
  },

  setTokenUpdate({ state, commit, dispatch }) {
    const checkToken = checkExpiresSessionToken();

    if (!checkToken) {
      dispatch('deleteInterval');
      return;
    }

    const { refreshId } = state;

    if (!refreshId) {
      const intervalId = setInterval(() => {
        dispatch('refresh');
      }, 60000);
      commit('SET_DATA', { field: 'refreshId', value: intervalId });
    }
  },

  deleteInterval({ state, commit }) {
    const { refreshId } = state;
    clearInterval(refreshId);
    commit('SET_DATA', { field: 'refreshId', value: null });
  },
};
