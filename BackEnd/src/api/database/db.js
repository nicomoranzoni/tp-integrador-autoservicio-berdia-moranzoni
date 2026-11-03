import mysql2 from "mysql2/promise";
import envirronments from "../config/envirronments.js";
const {database} = envirronments;
const connection = mysql2.createPool({
    host:database.host,
    database:database.name,
    user:database.user,
    password:database.password
});
export default connection;