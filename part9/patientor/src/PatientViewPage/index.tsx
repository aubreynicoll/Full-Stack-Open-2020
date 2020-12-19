import React, {useState, useEffect } from 'react';
import { Patient } from '../types';
import { useStateValue } from "../state";
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useParams } from 'react-router-dom';

const PatientViewPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect((): void => {

    const fetchPatientById = async () => {
      let patient = patients[id];

      if (!patient || !patient.ssn) {
        try {
          patient = (await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)).data;
        } catch (e) {
          console.error(e);
        }
        dispatch({ type: "UPDATE_PATIENT", payload: patient});
      }

      setPatient(patient);
    };

    fetchPatientById();
  }, []);

  if (!patient) return null;

  return (
    <div>
      <h2>{patient.name}</h2>
      <table>
        <tbody>
          <tr>
            <td>SSN:</td>
            <td>{patient.ssn}</td>
          </tr>
          <tr>
            <td>DOB:</td>
            <td>{patient.dateOfBirth}</td>
          </tr>
          <tr>
            <td>Occupation:</td>
            <td>{patient.occupation}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PatientViewPage;