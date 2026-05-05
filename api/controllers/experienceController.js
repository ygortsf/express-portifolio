exports.create = async (req, res) => {
  try {
    console.log('BODY:', req.body); 

    const { user_id, title, company, start_date, end_date } = req.body;

    const result = await pool.query(
      `INSERT INTO experiences (user_id, title, company, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_id, title, company, start_date, end_date]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error('ERRO REAL:', err); 
    res.status(500).json({ error: err.message });
  }
};