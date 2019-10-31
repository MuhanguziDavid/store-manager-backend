import itemsRoute from './itemsRoute';
import checkoutRoute from './checkoutRoute';

const apiPrefix = '/api/v1';

// add your route to this list
const routes = [
  itemsRoute,
  checkoutRoute,
];
export default (app) => {
  routes.forEach(route => app.use(apiPrefix, route));
  return app;
};
