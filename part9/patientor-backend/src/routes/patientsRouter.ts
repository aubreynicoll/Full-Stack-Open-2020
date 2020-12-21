import express from 'express';
import patientsService from '../services/patientsService';
import { NewPatient, Entry, NewEntry } from '../types';
import { toNewPatient, toId, toNewEntry } from '../utils/parsers';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getAllNonSensitive());
});

patientsRouter.get('/:id', (req, res) => {
  const id: string = toId(req.params);
  const patient = patientsService.getById(id);
  res.send(patient);
});

patientsRouter.post('/', (req, res) => {
  const parsedData: NewPatient = toNewPatient(req.body);
  const newPatient = patientsService.createNewPatient(parsedData);
  res.send(newPatient);
});

patientsRouter.post('/:id/entries', (req, res) => {
  const id: string = toId(req.params);
  const parsedData: NewEntry = toNewEntry(req.body);
  const newEntry = patientsService.createNewEntry(id, parsedData as Entry);
  res.send(newEntry);
});

export default patientsRouter;