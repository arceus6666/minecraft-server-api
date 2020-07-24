import fs from 'fs';
import Logger from '../models/logger';
import { Request, Response, NextFunction } from 'express';

const logger: Logger = Logger.getInstance();

export const log = (req: Request, res: Response, next: NextFunction): void => {
  logger.log(req, res);
  next();
}
