import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';
import http from 'http';
import routes from './routes';

import models, { sequelize} from './models'

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Store manager listening on port ${process.env.PORT}!`);
});

// sequelize.sync().then(() => {
//   app.listen(process.env.PORT, () => {
//     console.log(`Store manager listening on port ${process.env.PORT}!`);
//   });
// }) .catch(err => {
//   console.error('Unable to connect to the database:', err);
// });
