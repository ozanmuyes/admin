import api from './';

export function list(...params) {
  return api.get('/quizzes', ...params);
}

export function add(quiz) {
  return api.post('/quizzes', { ...quiz });
}
