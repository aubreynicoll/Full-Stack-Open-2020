/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, NewPatient, EntryType, NewHealthCheckEntry, HealthCheckRating, NewOccupationalHealthcareEntry, NewHospitalEntry, Discharge, Entry } from "../types";
import { validate } from 'uuid';

export const toNewPatient = (object: any): NewPatient => {
  const newPatient = {
    name: toString(object.name),
    dateOfBirth: toDateString(object.dateOfBirth),
    ssn: toSsn(object.ssn),
    gender: toGender(object.gender),
    occupation: toString(object.occupation),
    entries: []
  };
  return newPatient;
};

export const toId = (object: any): string => {
  const id = toIdString(object.id);
  return id;
};

export const toNewEntry = (object: any): Entry => {
  const entryType: EntryType = toEntryType(object.type);
  let newEntry;
  switch (entryType) {
    case 'HealthCheck':
      newEntry = toHealthCheckEntry(object);
      break;
    case 'OccupationalHealthcare':
      newEntry = toOccupationalHealthcareEntry(object);
      break;
    case 'Hospital':
      newEntry = toHospitalEntry(object);
      break;
    default:
      throw new Error(`Unhandled type: ${entryType}, Object: ${JSON.stringify(object)}`);
  }
  return newEntry as Entry;
};


const toHealthCheckEntry = (object: any): NewHealthCheckEntry => {
  const newHealthCheckEntry = {
    id: '',
    type: 'HealthCheck',
    description: toString(object.description),
    date: toDateString(object.date),
    specialist: toString(object.specialist),
    healthCheckRating: toHealthCheckRating(object.healthCheckRating)
  };
  return newHealthCheckEntry as NewHealthCheckEntry;
};

const toOccupationalHealthcareEntry = (object: any): NewOccupationalHealthcareEntry => {
  const newOccupationalHealthcareEntry = {
    id: '',
    type: 'OccupationalHealthcare',
    description: toString(object.description),
    date: toDateString(object.date),
    specialist: toString(object.specialist),
    employerName: toString(object.employerName)
  };
  return newOccupationalHealthcareEntry as NewOccupationalHealthcareEntry;
};

const toHospitalEntry = (object: any): NewHospitalEntry => {
  const newHospitalEntry = {
    id: '',
    type: 'Hospital',
    description: toString(object.description),
    date: toDateString(object.date),
    specialist: toString(object.specialist),
    discharge: toDischarge(object.discharge)
  };
  return newHospitalEntry as NewHospitalEntry;
};


const toIdString = (id: any): string => {
  if (!id || !isString(id) || !isIdString(id)) {
    throw new Error('Bad id field: ' + id);
  } else {
    return id;
  }
};

const toString = (str: any): string => {
  if (!str || !isString(str)) {
    throw new Error('Bad name field: ' + str);
  } else {
    return str;
  }
};

const toDateString = (date: any): string => {
  if (!date || !isString(date) || !isDateString(date)) {
    throw new Error('Bad date field: ' + date);
  } else {
    return date;
  }
};

const toSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn) || !isSsnString(ssn)) {
    throw new Error('Bad ssn field: ' + ssn);
  } else {
    return ssn;
  }
};

const toGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Bad gender field: ' + gender);
  } else {
    return gender;
  }
};

const toEntryType = (entryType: any): EntryType => {
  if (!entryType || !isEntryType(entryType)) {
    throw new Error('Bad entry type field: ' + entryType);
  } else {
    return entryType;
  }
};

const toHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Bad health check rating field ' + healthCheckRating);
  } else {
    return healthCheckRating;
  }
};

const toDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Bad discharge field: ' + discharge);
  } else {
    return discharge;
  }
};



const isString = (s: any): s is string => {
  return typeof s === 'string' || s instanceof String;
};

const isDateString = (d: any): d is string => {
  return Boolean(Date.parse(d));
};

const isSsnString = (s: any): s is string => {
  const regex = RegExp('^[0-9]{6}-(?:[0-9]+){1,3}[0-9A-Za-z]$');
  return regex.test(s);
};

const isGender = (g: any): g is Gender => {
  return Object.values(Gender).includes(g);
};

const isIdString = (s: any): s is string => {
  return validate(s);
};

const isEntryType = (e: any): e is EntryType => {
  return Object.values(EntryType).includes(e);
};

const isHealthCheckRating = (h: any): h is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(h);
};

const isDischarge = (d: any): d is Discharge => {
  return Boolean(
    d.date && isDateString(d.date) &&
    d.criteria && isString(d.criteria)
  
    );
};