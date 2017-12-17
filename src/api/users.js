import api from './';

export { getUserInfo as view } from './auth';

export function add(user) {
  return api.post('/users', { ...user });
}

export function edit(userId, user) {
  return api.patch(`/users/${userId}`, { ...user });
}

export function remove(userId) {
  return api.delete(`/users/${userId}`);
}
