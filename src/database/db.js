import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';

// Ná í SQL file
const insertData = fs.readFileSync('sql/fake.sql').toString();
const schema = fs.readFileSync('sql/schema.sql').toString();

dotenv.config();
/*
const {
  DATABASE_URL: connectionString,
} = process.env;
*/

const connectionString = 'leyndó';
const client = new pg.Client({ connectionString });

if (!connectionString) {
  console.error('Vantar DATABASE_URL');
  process.exit(1);
}

// TODO gagnagrunnstengingar


async function query(q, values = []) {
  //const client = new Client({ connectionString });

  await client.connect();

  try {
    const result = await client.query(q, values);

    return result;
  } catch (err) {
    throw err;
  } finally {
    await client.end();
  }
}
/******TEST */
var bladra = query("select * from signatures;")
bladra.then((res)=>{
  console.log(res.rows)
})
/**************** */


/*
client.connect();
client.query('select * from signatures;', (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Hello")
      console.log(res.rows)
    }
  
    client.end();
  });
  */
