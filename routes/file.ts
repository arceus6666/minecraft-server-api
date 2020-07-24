import Router, { Express } from 'express';
import * as ctrl from '../controllers/file';

export const router: Express = Router();

router.get('/', ctrl.getAllFiles);
router.get('/type/:type', ctrl.getFilesByType);
router.get('/:_id', ctrl.getFileById);

router.post('/', ctrl.addFile);

router.patch('/', ctrl.updateFileById);

router.delete('/:_id', ctrl.deleteFileById);
