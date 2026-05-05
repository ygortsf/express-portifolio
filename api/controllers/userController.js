const pool = require('../config/db');

exports.create = async (req, res) => {
  const { name, email, summary } = req.body;

  const result = await pool.query(
    'INSERT INTO users (id, name, email, summary) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, summary]
  );

  res.json(result.rows[0]);
};

exports.getAll = async (req, res) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
};

exports.getById = async (req, res) => {
  const { id } = req.params;

  const user = await pool.query('SELECT * FROM users WHERE id=$1', [id]);

  const experiences = await pool.query('SELECT * FROM experiences WHERE user_id=$1', [id]);
  const educations = await pool.query('SELECT * FROM educations WHERE user_id=$1', [id]);
  const skills = await pool.query('SELECT * FROM skills WHERE user_id=$1', [id]);

  res.json({
    ...user.rows[0],
    experiences: experiences.rows,
    educations: educations.rows,
    skills: skills.rows,
  });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, email, summary } = req.body;

  const result = await pool.query(
    'UPDATE users SET name=$1, email=$2, summary=$3 WHERE id=$4 RETURNING *',
    [name, email, summary, id]
  );

  res.json(result.rows[0]);
};

exports.delete = async (req, res) => {
  await pool.query('DELETE FROM users WHERE id=$1', [req.params.id]);
  res.json({ message: 'Deleted' });
};