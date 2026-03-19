import mysql from "mysql2";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "traveljabsv1db",
  namedPlaceholders: true
}).promise();

export default db;
