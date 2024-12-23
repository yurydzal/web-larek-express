import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';
import config from './config';
import { requestLogger, errorLogger } from './middlewares/logger';
import errorHandler from './middlewares/error-handler';

import router from './routes';

const app = express();

mongoose.connect(config.dbAddress as string);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`listening port: ${config.port}`);
});
