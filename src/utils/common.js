import jwtDecode from 'jwt-decode';

const key = 'access_token';
const ls = localStorage;

export const getSessionToken = () => ls.getItem(key) || null;
export const removeSessionToken = () => ls.removeItem(key);
export const getSessionData = () => {
  const token = getSessionToken();
  if (!token) return null;
  let data = null;
  try {
    data = jwtDecode(token.toString());
  } catch (e) {
    window.console.error('Invalid session token');
  }
  return data;
};

export const checkExpiresSessionToken = () => {
  const data = getSessionData();
  if (!data) {
    return false;
  }

  const now = Number(Date.now().toString().slice(0, 10));

  if ((data || {}).exp && now > data.exp) {
    removeSessionToken();
    return false;
  }
  return true;
};

export const getTokenData = (token = null) => {
  if (!token) throw new Error('token is required');
  let data = null;
  try {
    data = jwtDecode(token.toString());
  } catch (e) {
    window.console.error('Invalid token');
  }
  return data;
};

export const setSessionToken = (token = null) => {
  if (!token) throw new Error('token is required');
  const storage = ls;
  storage.setItem('access_token', token);

  return true;
};

export const getRole = () => {
  const sessionData = getSessionData();
  return sessionData && sessionData.roles[0];
};

// export default {
//   getSessionToken,
//   checkExpiresSessionToken,
//   getSessionData,
//   removeSessionToken,
//   getTokenData,
// };
