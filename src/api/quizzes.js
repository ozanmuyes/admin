import api from './';

export function list(...params) {
  return api.get('/quizzes', ...params);
}

export function add(quiz) {
  return api.post('/quizzes', { ...quiz });
}

export function get(quizId) {
  return api.get(`/quizzes/${quizId}`);
}

export function remove(quizId) {
  return api.delete(`/quizzes/${quizId}`);
}
