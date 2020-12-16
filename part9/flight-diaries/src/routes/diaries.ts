import express from 'express';
import diaryService from '../services/diaryService';
import { NewDiaryEntry } from '../types';
import { parseToNewDiaryEntry } from '../utils/parsers';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveDiaryEntries());
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const diary = diaryService.getById(id);
  if (diary) {
    res.send(diary);
  } else {
    res.status(404).end();
  }
});

router.post('/', (req, res) => {
  const parsedData: NewDiaryEntry = parseToNewDiaryEntry(req.body);
  const newDiary = diaryService.addEntry(parsedData);
  res.send(newDiary);
});

export default router;