import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { config } from 'dotenv';
import { errorMiddleware } from './middleware/error';
import router from './router';

config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorMiddleware);

const {
  PORT
} = process.env;

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
