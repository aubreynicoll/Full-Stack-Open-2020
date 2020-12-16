import express from 'express';
import patientsService from '../services/patientsService';
import { NewPatient } from '../types';
import { parseToNewPatient } from '../utils/parsers';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getAllNonSensitive());
});

patientsRouter.post('/', (req, res) => {
  const parsedData: NewPatient = parseToNewPatient(req.body);
  const newPatient = patientsService.createNewPatient(parsedData);
  res.send(newPatient);
});

export default patientsRouter;