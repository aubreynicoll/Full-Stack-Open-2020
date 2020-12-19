import express from 'express';
import patientsService from '../services/patientsService';
import { NewPatient } from '../types';
import { toNewPatient, toId } from '../utils/parsers';

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

export default patientsRouter;