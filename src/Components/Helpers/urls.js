const API_ROOT = process.env.REACT_APP_API_URL;

export const APIUrls = {
  Login: () => `${API_ROOT}/api/v1/auth/login`,
  Register: () => `${API_ROOT}/api/v1/auth/register`,
  getAllRest: () => `${API_ROOT}/api/v1/all`,
  createSection: () => `${API_ROOT}/api/v1/section`,
  addItem: () => `${API_ROOT}/api/v1/menu`,
  getMenu: () => `${API_ROOT}/api/v1/menu?id=`,
  sendOrder: () => `${API_ROOT}/api/v1/orders`,
};
