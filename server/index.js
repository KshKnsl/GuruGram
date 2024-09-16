import express from 'express';
import cors from 'cors';
import pkg from 'pg';

const app = express();
const { Pool } = pkg;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'avnadmin',
  host: 'pg-1bb9fbad-vivekkumarsingh4545-99d6.c.aivencloud.com',
  database: 'defaultdb',
  password: 'AVNS_bk1y6zYXaz7NQ0k8Dnn',
  port: 20358,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.post('/signup', async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    dob,
    gender,
    course,
    studentId,
    instituteName,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !address ||
    !city ||
    !state ||
    !dob ||
    !gender ||
    !course ||
    !studentId ||
    !instituteName
  ) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const query = `
      INSERT INTO users (
        first_name,
        last_name,
        email,
        phone,
        address,
        city,
        state,
        dob,
        gender,
        course,
        student_id,
        institute_name
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;
    `;

    const values = [
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      dob,
      gender,
      course,
      studentId,
      instituteName,
    ];

    const result = await pool.query(query, values);

    res.status(201).json({
      message: 'User registered successfully!',
      user: result.rows[0],
    });
  } catch (err) {
    console.error('Error registering user:', err.message);
    res.status(500).json({
      message: 'Error registering user',
      error: err.message,
    });
  }
});

const PORT =3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
