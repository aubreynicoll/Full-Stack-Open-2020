import patients from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getAllNonSensitive = (): NonSensitivePatient[] => {
  return patients.map(patient => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation
  }));
};

const createNewPatient = (newPatient: NewPatient): NonSensitivePatient => {
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
  createNewPatient
};