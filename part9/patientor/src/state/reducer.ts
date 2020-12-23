import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
    type: "SET_DIAGNOSES_LIST";
    payload: Diagnosis[];
  }
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
  }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
  }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
  }
  | {
    type: "ADD_ENTRY_TO_PATIENT";
    payload: {
      id: string;
      entry: Entry;
    };
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (rsf, diagnosis) => ({ ...rsf, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY_TO_PATIENT":
      const existingPatient = state.patients[action.payload.id];
      const updatedPatient = {
        ...existingPatient,
        entries: [
          ...existingPatient.entries,
          action.payload.entry
        ]
      };
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: updatedPatient
        }
      };
    default:
      return state;
  }
};

export const setDiagnosesList = (diagnosesList: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES_LIST",
    payload: diagnosesList
  };
};

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const updatePatient = (patient: Patient): Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: patient
  };
};

export const addEntryToPatient = (id: string, entry: Entry): Action => {
  return {
    type: "ADD_ENTRY_TO_PATIENT",
    payload: {
      id,
      entry
    }
  };
};