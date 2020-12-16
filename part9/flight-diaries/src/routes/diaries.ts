import express from 'express';
import diaryService from '../services/diaryService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveDiaryEntries());
});

router.post('/', (_req, res) => {
  res.send('making diaries!');
});

export default router;