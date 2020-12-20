import React from 'react';
import { HealthCheckEntry as Entry, HealthCheckRating } from '../types';
import { Icon, Segment } from 'semantic-ui-react';
import { useStateValue } from '../state';

const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Segment>
      <h3>{entry.date} <Icon name='heartbeat' /></h3>
      {entry.description} <br />
      <ul>
        {entry.diagnosisCodes?.map(code => (
          <li>{code} - {diagnoses[code].name}</li>
        ))}  
      </ul>
      Health Rating: {HealthCheckRating[entry.healthCheckRating]}
    </Segment>
  );
};

export default HealthCheckEntry;