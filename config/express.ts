import express, { Express } from 'express';
import cors from 'cors';
import compression from 'compression';

export const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cors());

// export = app;
