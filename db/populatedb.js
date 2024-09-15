#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS cart (
  cartitemid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  triptypeid Integer
);

CREATE TABLE IF NOT EXISTS triptypes (
  triptypeid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  tripname VARCHAR ( 255 ), 
  price INTEGER
);


INSERT INTO triptypes (tripname, price) 
VALUES
  ('1 Trip', 60),
  ('40 trips', 2000),
  ('100 Trips', 4800);
`;

const roleName = 'adnan'
const rolePassword = 90448

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString:
      `postgresql://${roleName}:${rolePassword}@localhost:5432/studentinfo`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
