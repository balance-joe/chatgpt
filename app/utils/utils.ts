export const TOKEN_KEY = "token";
export const OPENAI_KEY = "access_key";
export const setToken = (token: any) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    return token;
  }
  return false;
};

export const rmToken = () => {
  localStorage.setItem(TOKEN_KEY, "");
};
