import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
