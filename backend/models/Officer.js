const db = require('../db'); // assuming you have db connection exported here

const Officer = {
  create: (officer, callback) => {
    const sql = 'INSERT INTO officers (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [officer.name, officer.email, officer.password], callback);
  },
  
  findByEmail: (email, callback) => {
    const sql = 'SELECT * FROM officers WHERE email = ?';
    db.query(sql, [email], callback);
  },

  findById: (id, callback) => {
    const sql = 'SELECT * FROM officers WHERE id = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = Officer;