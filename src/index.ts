import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import router from './router';
import { initializeDb } from './lib/db';

initializeDb();

const app = express();

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'https://dice-game-client.web.app']
}));
app.use(json());
app.use(cookieParser());
app.use(router);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});