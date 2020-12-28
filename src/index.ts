import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import router from './router';
import { initializeDb } from './lib/db';

initializeDb();

const app = express();

app.use(cors());
app.use(json());
app.use(router);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});