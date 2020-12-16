import diaryData from '../../data/diaryData';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

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

const getById = (id: number): DiaryEntry | undefined => {
  return diaryData.find(d => d.id === id);
};

const addEntry = (entry: NewDiaryEntry): DiaryEntry => {
  const newEntry = {
    id: Math.max(...diaryData.map(d => d.id )) + 1,
    ...entry
  };
  diaryData.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveDiaryEntries,
  getById
};