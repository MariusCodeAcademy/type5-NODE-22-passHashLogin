const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

async function addUserDb(newUserData) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    const [insertResult] = await conn.execute(sql, [
      newUserData.username,
      newUserData.password,
    ]);
    await conn.close();
    return insertResult;
  } catch (error) {
    console.log('addUserDb', error);
    return false;
  }
}

async function findUserByUsername(username) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM users WHERE username = ?';
    const [userfound] = await conn.execute(sql, [username]);
    await conn.close();
    return userfound;
  } catch (error) {
    console.log('findUserByUsername', error);
    return false;
  }
}

module.exports = {
  addUserDb,
  findUserByUsername,
};
