/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, NewPatient } from "../types";
import { validate } from 'uuid';

export const toNewPatient = (object: any): NewPatient => {
  const newPatient = {
    name: toName(object.name),
    dateOfBirth: toDateString(object.dateOfBirth),
    ssn: toSsn(object.ssn),
    gender: toGender(object.gender),
    occupation: toOccupation(object.occupation),
    entries: []
  };
  return newPatient;
};

export const toId = (object: any): string => {
  const id = toIdString(object.id);
  return id;
};



const toIdString = (id: any): string => {
  if (!id || !isString(id) || !isIdString(id)) {
    throw new Error('Bad id field: ' + id);
  } else {
    return id;
  }
};

const toName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Bad name field: ' + name);
  } else {
    return name;
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

const toOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Bad occupation field: ' + occupation);
  } else {
    return occupation;
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