import patients from '../../data/patients';
import { NonSensitivePatient } from '../types';

const getAllNonSensitive = (): NonSensitivePatient[] => {
  return patients.map(patient => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation
  }));
};

export default {
  getAllNonSensitive
};