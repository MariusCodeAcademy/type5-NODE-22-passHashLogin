const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

async function getAllPostsWCategories() {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT posts.post_id, posts.title, posts.body, 
    categories.name AS category 
    FROM posts 
    LEFT JOIN categories 
    ON posts.category_id = categories.category_id;
    `;
    const [posts] = await conn.query(sql);
    await conn.close();
    return posts;
  } catch (error) {
    console.log('getAllPostsWCategories', error);
    return false;
  }
}
module.exports = {
  getAllPostsWCategories,
};
