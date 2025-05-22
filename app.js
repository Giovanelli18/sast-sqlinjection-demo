const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE users (id INT, username TEXT)");
  db.run("INSERT INTO users VALUES (1, 'alice'), (2, 'bob')");
});

app.get('/users', (req, res) => {
  const username = req.query.username;
  const query = `SELECT * FROM users WHERE username = '${username}'`;
  
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json({ users: rows });
  });
});

app.listen(3000, () => console.log('App running on http://localhost:3000'));