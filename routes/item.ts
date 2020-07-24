import Router, { Express } from 'express';
import * as ctrl from '../controllers/item';

export const router: Express = Router();

router.get('/', ctrl.getAllItems);
router.get('/:_id', ctrl.getItemById);

router.post('/', ctrl.addItem);

router.patch('/', ctrl.updateItemById);

router.delete('/:_id', ctrl.deleteItemById);
