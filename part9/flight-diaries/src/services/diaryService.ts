import diaryData from '../../data/diaryData';
import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';

const getEntries = (): DiaryEntry[] => {
  return diaryData;
};

const getNonSensitiveDiaryEntries = (): NonSensitiveDiaryEntry[] => {
  return diaryData.map(({ id, date, weather, visibility}) => ({
    id,
    date, 
    weather,
    visibility
  }));
};

const addEntry = (): null => {
  return null;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveDiaryEntries
};