import React from 'react';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  incident: {
    width: '800px',
    backgroundColor: '#ecf0f1',
    marginBottom: '5px',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center'
  },
  roadNameWrapper: {
    backgroundColor: '#f1c40f',
    borderTopLeftRadius: '5px',
    borderBottomLeftRadius: '5px',
    minWidth: '50px',
    minHeight: '50px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  roadName: {
    padding: '5px'
  },
  incidentMeta: {
    padding: '5px 15px',
  },
  incidentRoute: {
    fontSize: 18
  }
});


const IncidentCard = ({incident}) => {

  const incidentRoute = () => {
    if(incident.startRoute && incident.endRoute){
      return `${incident.startRoute} \u2192 ${incident.endRoute}`;
    } else {
      return false;
    }
  }

  const classes = useStyles();

  const dateOptions = {
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }

  return (
    <div className={classes.incident}>
      <div className={classes.roadNameWrapper}>
        <div className={classes.roadName}>{incident.road}</div>
      </div>
      <div className={classes.incidentMeta}>
        <div className={classes.incidentRoute}>{ incidentRoute() }</div>
        <div>Van {`${incident.start ? new Date(incident.start).toLocaleString('nl', dateOptions) : 'onbekend'}`} tot {`${incident.stop ? new Date(incident.stop).toLocaleString('nl', dateOptions) : 'onbekend'}`}</div>
        <div className={classes.incidentLabels}>
          {incident.category} {incident.delay} {incident.distance}
        </div>
      </div>
    </div>
  );
};

export default IncidentCard;
