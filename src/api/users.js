import api from './';

export { getUserInfo as view } from './auth';

export function remove(userId) {
  return api.delete(`/users/${userId}`);
}
