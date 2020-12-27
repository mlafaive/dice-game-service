import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import router from './router';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(router);

const port = process.env.ROLLING_AMERICA_PORT || 8000;
app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});