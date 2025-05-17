const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// DB connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'user_management'
});

const email = 'officer1@example.com';
const plainPassword = 'officer123';

bcrypt.hash(plainPassword, 10, (err, hashedPassword) => {
  if (err) return console.error('Hash error:', err);

  const insertQuery = `
    INSERT INTO officers (email, password, name)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE password = VALUES(password), name = VALUES(name)
  `;

  pool.query(insertQuery, [email, hashedPassword, 'Test Officer'], (err, results) => {
    if (err) return console.error('Insert error:', err);

    console.log('Test officer inserted/updated successfully.');
    process.exit(0);
  });
});
