import itemsRoute from './itemsRoute';
import checkoutRoute from './checkoutRoute';
import storesRoute from './storesRoute';

const apiPrefix = '/api/v1';

// add your route to this list
const routes = [
  itemsRoute,
  checkoutRoute,
  storesRoute
];
export default (app) => {
  routes.forEach(route => app.use(apiPrefix, route));
  return app;
};
