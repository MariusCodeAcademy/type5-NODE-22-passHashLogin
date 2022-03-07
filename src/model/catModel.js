const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

// funkcija kuri parsiusncia visas kategorijas
// getAllCategories()
// SELECT * FROM `categories`

async function getAllCategories() {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT * FROM categories
    `;
    const [categories] = await conn.query(sql);
    await conn.close();
    return categories;
  } catch (error) {
    console.log('getAllCategories', error);
    return false;
  }
}

module.exports = {
  getAllCategories,
};
