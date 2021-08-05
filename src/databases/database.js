const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 5
});

pool.getConnection((err, connection) => {

  if (err) {
    return console.log(err);
  }

  if(connection) connection.release();
  return;
  console.log(connection)
});


module.exports = pool;
