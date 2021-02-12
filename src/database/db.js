import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';

// Ná í SQL file

dotenv.config();
/*
const {
  DATABASE_URL: connectionString,
} = process.env;
*/

const connectionString = 'postgres://maggi:maggithorSQL@localhost/v2';


if (!connectionString) {
  console.error('Vantar DATABASE_URL');
  process.exit(1);
}

// TODO gagnagrunnstengingar


async function query(q, values = []) {
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
 * Gets SQL data
 */
export async function getAllData() {
  let database = query("SELECT * FROM signatures;")
  
  return database;
}




/******TEST 
var bladra = query("select * from signatures;")
bladra.then((res)=>{
  console.log(res)
})
/**************** */

