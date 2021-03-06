import api from './';

export function list(...params) {
  return api.get('/users', ...params);
}

export { getUserInfo as view } from './auth';

export function add(user) {
  return api.post('/users', { ...user });
}

export function edit(userId, user) {
  return api.patch(`/users/${userId}`, { ...user });
}

export function get(userId) {
  return api.get(`/users/${userId}`);
}

export function remove(userId) {
  return api.delete(`/users/${userId}`);
}
