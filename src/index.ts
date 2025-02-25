import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { config } from 'dotenv';

config();

const app = express();

app.use(express.json());
app.use(cors());

const {
  PORT
} = process.env;

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
