import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';

// Ná í SQL file

dotenv.config();


/* Rann út á tíma, átti eftir að setja upp .env
  svo ég gerði þetta the dirty way
const {
  DATABASE_URL: connectionString,
} = process.env;
*/
const connectionString = 'postgres://maggi:password@localhost/v2';


if (!connectionString) {
  console.error('Vantar DATABASE_URL');
  process.exit(1);
}

// TODO gagnagrunnstengingar


/**
 * Fall sem tekur inn sql query streng og gögn, keyrir queryið og 
 * skilar útkomunni.
 * @param {string} q Query strengur til að keyra
 * @param {gildi} values fylki af gildum sem passa í query strenginn 
 */
export async function query(q, values = []) {
  const client = new pg.Client({ connectionString });

  await client.connect();

  try {
    const result = await client.query(q, values);

    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    await client.end();
  }
}

/**
 * Ná í alla signatures töfluna
 */
export async function getAllData() {
  let database = query("SELECT * FROM signatures;")
  
  return database;
}

/**
 * Setur gildi í signatures SQL töfluna
 * @param {string} name nafi
 * @param {string} kt 10 stafa kennitala
 * @param {string} comment 0-400 stafa strengur
 * @param {boolean} anonymous nafnlaus eða ekki
 */
export function insertData(name, kt, comment, anonymous) {
  const q= `INSERT INTO signatures 
  (name, nationalId, comment, anonymous) 
  VALUES 
  ($1, $2, $3, $4);`;
  let bool;
  if (anonymous === "on") {
    bool = true;
  } else {
    bool = false;
  }
  const values = [name, kt, comment, bool]
  return query(q, values);

}