import Item, { IItem } from '../models/item';
import { Request, Response } from 'express';

export const addItem = async (req: Request, res: Response): Promise<void> => {
  const body: IItem = req.body;
  body.created_at = new Date(Date.now());
  const item: IItem = new Item(body);

  item.save().then((i: IItem): void => {
    res.status(201).json({ status: 201, error: null, data: i });
  }, (error: any): void => {
    res.status(500).json({ status: 500, error, data: null });
  });
}

export const getAllItems = async (req: Request, res: Response): Promise<void> => {
  Item.find({}, (error: any, items: Array<IItem>): Response | undefined => {
    if (error) return res.status(500).json({ status: 500, error, data: null });
    if (!items || items.length < 1) return res.status(204).json({ status: 204, error: null, data: [] });
    res.status(200).json({ status: 200, error: null, data: items });
  });
}

export const getItemById = async (req: Request, res: Response): Promise<void> => {
  Item.findOne({ _id: req.params._id }, (error: any, item: IItem) => {
    if (error) return res.status(500).json({ status: 500, error, data: null });
    if (!item) return res.status(404).json({ status: 404, error: true, data: null });
    res.status(200).json({ status: 200, error: null, data: item });
  });
}

export const updateItemById = async (req: Request, res: Response): Promise<void> => {
  const body: IItem = req.body;
  Item.findOne({ _id: body._id }, (error: any, item: IItem) => {
    if (error) return res.status(500).json({ status: 500, error, data: null });
    if (!item) return res.status(404).json({ status: 404, error: true, data: null });
    item.name = body.name;
    item.position = body.position;
    item.save().then((i: IItem) => {
      res.status(202).json({ status: 202, error: null, data: i });
    }, (error: any) => {
      res.status(500).json({ status: 500, error, data: null });
    });
  });
}

export const deleteItemById = async (req: Request, res: Response): Promise<void> => {
  Item.findByIdAndDelete(req.params._id, (error: any, item: IItem | null) => {
    if (error) return res.status(500).json({ status: 500, error, data: null });
    if (!item) return res.status(404).json({ status: 404, error: true, data: null });
    res.status(200).json({ status: 200, error: null, data: item });
  });
}
