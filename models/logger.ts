import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';

import { getRequestDuration } from '../helpers/requestDuration';
import { chalkError } from '../helpers/chalk';

const logsPath: string = path.join(__dirname, '../logs');

export default class Logger {
  private static instance: Logger;
  private constructor() { }

  public static getInstance = (): Logger => {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public log = (req: Request, res: Response): void => {
    const current_datetime: Date = new Date();
    const formatted_date: string = `${current_datetime.getDate()}-${current_datetime.getMonth() + 1}-${current_datetime.getFullYear()} ${current_datetime.getHours()}:${current_datetime.getMinutes()}:${current_datetime.getSeconds()}`;
    const start: [number, number] = process.hrtime();
    const duration: number = getRequestDuration(start);
    const log: string = `[${formatted_date}] ${req.ip} ${req.method}:${req.url} ${res.statusCode} ${duration} ms\n`;

    fs.appendFile(`${logsPath}/logs.log`, log, (err) => {
      if (err) console.log(chalkError(err));
    });
  }
}
