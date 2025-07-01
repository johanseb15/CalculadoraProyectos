// Controlador para auth
module.exports = {
  // eslint-disable-next-line no-unused-vars
  register: (_req, _res, _next) => {
    const err = new Error('register() handler not implemented');
    err.status = 501;
    throw err;
  },
  login: (_req, _res, _next) => {
    const err = new Error('login() handler not implemented');
    err.status = 501;
    throw err;
  },
};