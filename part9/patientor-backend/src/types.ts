/* eslint-disable @typescript-eslint/no-empty-interface */
export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

export interface Discharge {
  date: string,
  criteria: string
}

export interface SickLeave {
  startDate: string,
  endDate: string
}

export enum EntryType {
  HealthCheck = 'HealthCheck',
  OccupationalHealthcare = 'OccupationalHealthcare',
  Hospital = 'Hospital'
}

interface BaseEntry {
  id: string,
  description: string,
  date: string,
  specialist: string,
  diagnosisCodes?: Array<Diagnosis['code']>
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck',
  healthCheckRating: HealthCheckRating
}

export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare',
  employerName: string,
  sickLeave?: SickLeave
}

export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;

interface HospitalEntry extends BaseEntry {
  type: 'Hospital',
  discharge: Discharge
}

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;

export type Entry = 
  | HealthCheckEntry
  | OccupationalHealthcareEntry
  | HospitalEntry;

export type NewEntry = Omit<Entry, 'id'>;

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export enum HealthCheckRating {
  Healthy,
  LowRisk,
  HighRisk,
  CriticalRisk
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;