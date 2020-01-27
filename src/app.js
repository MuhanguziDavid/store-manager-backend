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

// load view engine
app.set("views", path.join(__dirname, "views"));  //use views as the source of template files
app.set("view engine", "pug");  //use pug as template engine

routes(app);

const server = http.createServer(app);

// start server
server.listen(process.env.PORT, () => {
  console.log(`Store manager listening on port ${process.env.PORT}!`);
});
