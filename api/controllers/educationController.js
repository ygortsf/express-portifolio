const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

exports.create = async (req, res) => {
  const { user_id, institution, course } = req.body;

  const result = await pool.query(
    'INSERT INTO educations (id, user_id, institution, course) VALUES ($1,$2,$3,$4) RETURNING *',
    [uuidv4(), user_id, institution, course]
  );

  res.json(result.rows[0]);
};

exports.getAll = async (req, res) => {
  const result = await pool.query('SELECT * FROM educations');
  res.json(result.rows);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { institution, course } = req.body;

  const result = await pool.query(
    'UPDATE educations SET institution=$1, course=$2 WHERE id=$3 RETURNING *',
    [institution, course, id]
  );

  res.json(result.rows[0]);
};

exports.delete = async (req, res) => {
  await pool.query('DELETE FROM educations WHERE id=$1', [req.params.id]);
  res.json({ message: 'Deleted' });
};