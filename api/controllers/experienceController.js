const pool = require('../config/db');

exports.create = async (req, res) => {
  const { user_id, company, role, start_date, end_date, description } = req.body;

  const result = await pool.query(
    `INSERT INTO experiences 
    (id, user_id, company, role, start_date, end_date, description)
    VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [user_id, company, role, start_date, end_date, description]
  );

  res.json(result.rows[0]);
};

exports.getAll = async (req, res) => {
  const result = await pool.query('SELECT * FROM experiences');
  res.json(result.rows);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { company, role } = req.body;

  const result = await pool.query(
    'UPDATE experiences SET company=$1, role=$2 WHERE id=$3 RETURNING *',
    [company, role, id]
  );

  res.json(result.rows[0]);
};

exports.delete = async (req, res) => {
  await pool.query('DELETE FROM experiences WHERE id=$1', [req.params.id]);
  res.json({ message: 'Deleted' });
};