import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { router as registerRouter, isRegistered } from './registration.js';
import { formatDate, formatKennitala, getError } from './help.js';
import { insertData } from './database/db.js';

dotenv.config();

const {
  PORT: port = 3000,
} = process.env;

const app = express();

const path = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('styles'));
app.set('views', join(path, '../views'));
app.set('view engine', 'ejs');

app.locals.formatDate = formatDate;

// TODO setja upp rest af virkni!

/**
 * Notar registerRouter sem er í registration.js
 */
app.use('/', registerRouter);

/**
 * Fær gögn þegar það er submittað forminu. Sendir
 */
app.post('/', (req, res, next) => {
  const form = req.body;
  const kt = formatKennitala(form.kennitala);
  const { name } = req.body;
  const { comment } = req.body;
  const { anonymous } = req.body;

  const registered = isRegistered(kt);
  
  registered.then((result) => {
    // Ef kt er til í database
    if (result) {
      res.render('errorPage')
    } else {

      const errors = getError(name, kt, comment);
      // Villa í formi
      if (errors.length > 0) { 
        console.log("Villa/ur í formi eru eftirfarandi: ")
        console.log(errors);
        res.send(req.body);
      } else { // Ekki villa í formi
        insertData(name, kt, comment, anonymous);
        res.redirect('back');
      }
    }
  })


});

// Verðum að setja bara *port* svo virki á heroku
app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}/`);
});
