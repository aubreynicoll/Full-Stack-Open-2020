import React from 'react';
import { HospitalEntry as Entry } from '../types';
import { Icon, Segment } from 'semantic-ui-react';
import { useStateValue } from '../state';

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Segment>
      <h3>{entry.date} <Icon name='hospital' /></h3>
      {entry.description} <br />
      <ul>
        {entry.diagnosisCodes?.map(code => (
          <li>{code} - {diagnoses[code].name}</li>
        ))}  
      </ul>
      Discharged {entry.discharge.date} - {entry.discharge.criteria}
    </Segment>
  );
};

export default HospitalEntry;