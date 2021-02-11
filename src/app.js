import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const {
  PORT: port = 3000,
} = process.env;

const app = express();
app.use(express.static('styles'));
app.set('view engine', 'ejs');

// TODO setja upp rest af virkni!
app.get('/', (req, res) => {
  res.render('index');
});

// Verðum að setja bara *port* svo virki á heroku
app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}/`);
});
