const pool = require('../config/db');

exports.create = async (req, res) => {
  const { user_id, name, level } = req.body;

  const result = await pool.query(
    'INSERT INTO skills (user_id, name, level) VALUES ($1,$2,$3) RETURNING *',
    [user_id, name, level]
  );

  res.json(result.rows[0]);
};

exports.getAll = async (req, res) => {
  const result = await pool.query('SELECT * FROM skills');
  res.json(result.rows);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, level } = req.body;

  const result = await pool.query(
    'UPDATE skills SET name=$1, level=$2 WHERE id=$3 RETURNING *',
    [name, level, id]
  );

  res.json(result.rows[0]);
};

exports.delete = async (req, res) => {
  await pool.query('DELETE FROM skills WHERE id=$1', [req.params.id]);
  res.json({ message: 'Deleted' });
};