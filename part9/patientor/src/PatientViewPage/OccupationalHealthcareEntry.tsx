import React from 'react';
import { OccupationalHealthcareEntry as Entry } from '../types';
import { Icon, Segment } from 'semantic-ui-react';
import { useStateValue } from '../state';

const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Segment>
      <h3>{entry.date} <Icon name='wheelchair' /> {entry.employerName}</h3>
      {entry.description} <br />
      <ul>
        {entry.diagnosisCodes?.map(code => (
          <li>{code} - {diagnoses[code].name}</li>
        ))}  
      </ul>      
    </Segment>
  );
};

export default OccupationalHealthcareEntry;