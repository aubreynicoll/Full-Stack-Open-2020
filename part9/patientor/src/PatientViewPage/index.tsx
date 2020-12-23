import React, {useState, useEffect } from 'react';
import { Entry, Patient } from '../types';
import { addEntryToPatient, updatePatient, useStateValue } from "../state";
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useParams } from 'react-router-dom';
import EntryContainer from './EntryContainer';
import { Table, Button } from 'semantic-ui-react';
import AddEntryModal from '../AddEntryModal/index';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const PatientViewPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(null);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntryToPatient(id, data));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  useEffect((): void => {
    const fetchPatientById = async () => {
      let patient = patients[id];

      if (!patient.ssn && !patient.entries) {
        try {
          patient = (await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)).data;
        } catch (e) {
          console.error(e);
        }
        dispatch(updatePatient(patient));
      }

      setPatient(patient);
    };

    fetchPatientById();
    // eslint-disable-next-line
  }, []);

  if (!patient) return null;

  return (
    <div>
      <h2>{patient.name}</h2>
      <Table celled>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Sex:</Table.Cell>
            <Table.Cell>{patient.gender}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>DOB:</Table.Cell>
            <Table.Cell>{patient.dateOfBirth}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>SSN:</Table.Cell>
            <Table.Cell>{patient.ssn}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Occupation:</Table.Cell>
            <Table.Cell>{patient.occupation}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={openModal}>Add New Entry</Button>

      <h3>Entries</h3>
      {patient.entries?.map(entry => (
        <EntryContainer key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default PatientViewPage;