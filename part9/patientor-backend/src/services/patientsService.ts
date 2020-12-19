import patients from '../../data/patients';
import { PublicPatient, Patient, NewPatient } from '../types';
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

export default {
  getAllNonSensitive,
  createNewPatient,
  getById
};