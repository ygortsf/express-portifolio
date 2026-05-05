require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/users', require('./routes/userRoutes'));
app.use('/experiences', require('./routes/experienceRoutes'));
app.use('/educations', require('./routes/educationRoutes'));
app.use('/skills', require('./routes/skillRoutes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});