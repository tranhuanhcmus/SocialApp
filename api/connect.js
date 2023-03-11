import mysql from "mysql";
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "social",
});
export default db;