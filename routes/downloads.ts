import Router, { Request, Response, Express } from 'express';
import path from 'path';

const filesPath = path.join(__dirname, '../files');

export const router: Express = Router();

router.get('/rsspack', (req: Request, res: Response) => {
  const file: string = `${filesPath}/zips/rsspack.zip`;
  res.set('Content-Type', 'application/zip');
  res.download(file, 'rsspack.zip', (err: any) => {
    if (err) res.status(404).json({ msg: 'File error' });
  });
});

router.get('/tweaks', (req: Request, res: Response) => {
  const file: string = `${filesPath}/zips/tweaks.zip`;
  res.set('Content-Type', 'application/zip');
  res.download(file, 'tweaks.zip', (err: any) => {
    if (err) res.status(404).json({ msg: 'File error' });
  });
});

router.get('/packs/:id', (req: Request, res: Response) => {
  const name: string = `${req.params.id}`;
  const file: string = `${filesPath}/zips/${name}.zip`;
  res.set('Content-Type', 'application/zip');
  res.download(file, `${name}.zip`, (err: any) => {
    if (err) res.status(404).json({ msg: 'File error' });
  });
});

router.get('/mods/:id', (req: Request, res: Response) => {
  const name: string = `${req.params.id}`;
  const file: string = `${filesPath}/jars/${name}.jar`;
  res.set('Content-Type', 'application/java-archive');
  res.download(file, `${name}.jar`, (err: any) => {
    if (err) res.status(404).json({ msg: 'File error' });
  });
});

router.get('/images/:type/:name', (req: Request, res: Response) => {
  const type: string = req.params.type;
  const name: string = `${req.params.name}.png`;
  const filePath: string = `${filesPath}/${type}/${name}`;
  res.set('Content-Type', 'image/png');
  res.status(200).download(filePath, name, (err: any) => {
    if (err) res.status(404).json({ msg: 'File error' });
  });
});
