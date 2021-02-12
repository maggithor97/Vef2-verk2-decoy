import fs from 'fs';


const insertData = fs.readFileSync('sql/fake.sql').toString();
const schema = fs.readFileSync('sql/schema.sql').toString();