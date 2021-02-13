import fs from 'fs';
import {query} from './db.js';

/***
 * Hér er búið til töflu sem heitir signatures og sett fake gögn í
 * hana sem koma frá fake.sql file'num
 */

const insertData = fs.readFileSync('database/sql/fake.sql',).toString();
const schema = fs.readFileSync('database/sql/schema.sql').toString();

var x = query(schema);
var y =query(insertData)
var select =query("SELECT * FROM signatures;")

select.then((data)=> {
    console.log(data);
})
