import File, { IFile } from '../models/file';
import { Request, Response } from 'express';

export const addFile = async (req: Request, res: Response): Promise<void> => {
  const body: IFile = req.body;
  const file: IFile = new File(body);

  file.save().then((f: IFile): void => {
    res.status(201).json({ status: 201, error: null, data: f });
  }, (error: any): void => {
    res.status(500).json({ status: 500, error, data: null });
  });
}

export const getAllFiles = async (req: Request, res: Response): Promise<void> => {
  File.find({}, (error: any, files: Array<IFile>): Response | undefined => {
    if (error) return res.status(500).json({ status: 500, error, data: null });
    if (!files || files.length < 1) return res.status(204).json({ status: 204, error: null, data: [] });
    res.status(200).json({ status: 200, error: null, data: files });
  });
}

export const getFilesByType = async (req: Request, res: Response): Promise<void> => {
  File.find({ type: req.params.type }, (error: any, files: Array<IFile>): Response | undefined => {
    if (error) return res.status(500).json({ status: 500, error, data: null });
    if (!files || files.length < 1) return res.status(204).json({ status: 204, error: null, data: [] });
    res.status(200).json({ status: 200, error: null, data: files });
  });
}

export const getFileById = async (req: Request, res: Response): Promise<void> => {
  File.findOne({ _id: req.params._id }, (error: any, file: IFile) => {
    if (error) return res.status(500).json({ status: 500, error, data: null });
    if (!file) return res.status(404).json({ status: 404, error: true, data: null });
    res.status(200).json({ status: 200, error: null, data: file });
  });
}

export const updateFileById = async (req: Request, res: Response): Promise<void> => {
  const body: IFile = req.body;
  File.findOne({ _id: body._id }, (error: any, file: IFile) => {
    if (error) return res.status(500).json({ status: 500, error, data: null });
    if (!file) return res.status(404).json({ status: 404, error: true, data: null });
    file.name = body.name;
    file.filename = body.filename;
    file.save().then((f: IFile) => {
      res.status(202).json({ status: 202, error: null, data: f });
    }, (error: any) => {
      res.status(500).json({ status: 500, error, data: null });
    });
  });
}

export const deleteFileById = async (req: Request, res: Response): Promise<void> => {
  File.findByIdAndDelete(req.params._id, (error: any, file: IFile | null) => {
    if (error) return res.status(500).json({ status: 500, error, data: null });
    if (!file) return res.status(404).json({ status: 404, error: true, data: null });
    res.status(200).json({ status: 200, error: null, data: file });
  });
}
