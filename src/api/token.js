export const setToken = (token) => {
  localStorage.setItem('bearer', token);
};

export const getToken = () => {
  let token = localStorage.getItem('bearer') || '';

  if (!token && location.pathname.includes('/auth')) {
    token = new URLSearchParams(location.hash.substring(1)).get('access_token') || '';
    token && setToken(token);
  }

  return token;
};

