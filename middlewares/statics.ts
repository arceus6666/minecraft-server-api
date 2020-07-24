import express, { Handler, Response, Request } from 'express';
import path from 'path';

const viewsPath: string = path.join(__dirname, '../views');
const filesPath: string = path.join(__dirname, '../files');
// const zipsPath: string = path.join(__dirname, '../files/zips');

export const views: Handler = express.static(viewsPath, { maxAge: '1y' });
export const files: Handler = express.static(filesPath);
// export const zips: Handler = express.static(zipsPath);


export const viewsRoot = (req: Request, res: Response): void => {
  res.status(200).sendFile(`/`, { root: viewsPath });
}
