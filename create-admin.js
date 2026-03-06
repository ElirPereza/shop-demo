const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function createAdmin() {
  const email = 'admin@bakery.com';
  const password = 'admin123';
  const hash = bcrypt.hashSync(password, 10);
  
  try {
    // Check if admin exists
    const check = await pool.query('SELECT * FROM admin_user WHERE email = $1', [email]);
    
    if (check.rows.length > 0) {
      console.log('Admin already exists');
      process.exit(0);
    }
    
    // Create admin
    await pool.query(`
      INSERT INTO admin_user (uuid, status, email, password, full_name, created_at, updated_at)
      VALUES (gen_random_uuid(), 1, $1, $2, 'Admin', NOW(), NOW())
    `, [email, hash]);
    
    console.log('Admin created: admin@bakery.com / admin123');
    process.exit(0);
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
}

createAdmin();
