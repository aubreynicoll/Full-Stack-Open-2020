import patients from '../../data/patients';
import { PublicPatient, Patient, NewPatient, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const getAllNonSensitive = (): PublicPatient[] => {
  return patients.map(patient => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation
  }));
};

const getById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
} ;

const createNewPatient = (newPatient: NewPatient): PublicPatient => {
  const patient: Patient = {
    id: uuid(),
    ...newPatient
  };

  patients.push(patient);

  return {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation
  };
};

const createNewEntry = (id: string, newEntry: Entry): Entry => {
  console.log('id: ', id, 'newEntry: ', newEntry);

  newEntry.id = uuid();

  patients.find(p => p.id === id)?.entries.push(newEntry);

  return newEntry;
};

export default {
  getAllNonSensitive,
  createNewPatient,
  getById,
  createNewEntry
};