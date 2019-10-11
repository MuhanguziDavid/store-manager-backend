import itemsRoute from './itemsRoute';

const apiPrefix = '/api/v1';

// add your route to this list
const routes = [
  itemsRoute,
];
export default (app) => {
  routes.forEach(route => app.use(apiPrefix, route));
  return app;
};
