import React from 'react';
import styled from '@emotion/styled'
import IncidentLabel from './IncidentLabel';

const IncidentCardStyled = styled.div`
  width: 800px;
  background-color: #f5f6fa;
  margin-bottom: 5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

const IncidentCardContent = styled.div`
  padding: 5px 15px;
  display: flex;
  flex: 1 1 auto;
  justify-content: space-between;
  align-items: center;
`;

const IncidentCardRoute = styled.div`
  font-size: 18px;
`;

const IncidentLabels = styled.div`
  display: flex;
  margin: 0 -5px;
`;

const RoadName = styled.div`
  background: ${({ type }) => 
    type === 'a' ? '#e84118' :
    type === 'n' ? '#fbc531' : 
    '#00a8ff'
  };
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  min-width: 60px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  > span {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
  }
`;

const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
}


const IncidentCard = ({incident}) => {

  const incidentRoute = () => {
    if(incident.startRoute && incident.endRoute){
      return `${incident.startRoute} \u2192 ${incident.endRoute}`;
    } else {
      return false;
    }
  }

  return (
    <IncidentCardStyled>
      <RoadName type={incident.type}>
        <span>{incident.road}</span>
      </RoadName>
      <IncidentCardContent>
        <div>
          <IncidentCardRoute>{ incidentRoute() }</IncidentCardRoute>
          <div>Van {`${incident.start ? new Date(incident.start).toLocaleString('nl', dateOptions) : 'onbekend'}`} tot {`${incident.stop ? new Date(incident.stop).toLocaleString('nl', dateOptions) : 'onbekend'}`}</div>
        </div>
        <IncidentLabels>
          { incident.delay && (
            <IncidentLabel variant='error' label={`+ ${incident.delay / 60} min`} />
          )}
          { incident.distance && (
            <IncidentLabel variant='error' label={`${incident.distance / 1000} km`} />
          )}
          { incident.category && (
            <IncidentLabel variant='normal' label={incident.category} />
          )}
        </IncidentLabels>
      </IncidentCardContent>
    </IncidentCardStyled>
  );
};

export default IncidentCard;
