import express from 'express';
import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { router as registerRouter } from './registration.js';
import {formatDate} from './help.js';

dotenv.config();

const {
  PORT: port = 3000,
} = process.env;

const app = express();

const path = dirname(fileURLToPath(import.meta.url));

app.use(express.static('styles'));
app.set('views', join(path, '../views'));
app.set('view engine', 'ejs');

app.locals.formatDate = formatDate;


// TODO setja upp rest af virkni!
app.use('/', registerRouter);


// Verðum að setja bara *port* svo virki á heroku
app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}/`);
});
