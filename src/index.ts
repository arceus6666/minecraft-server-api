import express, { Request, Response } from 'express';
import request from 'request';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import cors from 'cors';

import { app } from '../config/express';
import * as config from '../config/';

import { downloadsRouter, itemRouter, fileRouter } from '../routes/';

import { files, views, viewsRoot } from '../middlewares/statics';
import { log } from '../middlewares/logger';

import { chalkError, chalkSuccess, chalkInfo } from '../helpers/chalk';

const logsPath = path.join(__dirname, '../logs');

app.use(log);
app.use(cors());

app.use('/downloads', downloadsRouter);
app.use('/api', itemRouter);
app.use('/files', fileRouter);

app.use('/images', files);
// app.use('/zips', zips);

app.get('*.*', views);

app.get('/uuid/:id', (req: Request, res: Response) => {
  const name: string = req.params.id;
  request(`https://api.mojang.com/users/profiles/minecraft/${name}`, { json: true }, (error, resp, body) => {
    if (error) return res.status(500).json({ status: 500, error, data: null });
    if (!body) return res.status(404).json({ status: 404, error: true, data: null })
    res.status(200).json({ status: 200, error: null, data: body.id });
  });
});

app.all('*', viewsRoot);

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

const runApp = (): void => {
  // console.log((process.env))
  mongoose.connect(config.db, (error: mongoose.Error) => {
    if (error) {
      console.log(chalkError('{src} [index]'), `: There was an error initializing:\n\t${error}.`);
    } else {
      console.log(chalkSuccess('{src} [index]'), `: MongoDB connection established.`);
      try {
        app.listen(config.port, (): void => {
          const pid: number = process.pid;
          fs.writeFile(`${logsPath}/pid`, `${pid}\n`, (err): void => {
            if (err) throw err;
          });
          console.log(chalkSuccess('{src} [index]'), `: Listening on port: ${chalkInfo(config.port)}, with pid: ${chalkInfo(pid)}`);
        });
      } catch (error) {
        fs.appendFile(`${logsPath}/crash/${Date.now()}.log`, `${JSON.stringify(error, null, 2)}\n`, (err) => {
          if (err) console.log(chalkError('{src} [index]'), `: Error:\n\t${JSON.stringify(err, null, 2)}`);
        });
        runApp();
      }
    }
  });
}

runApp();
