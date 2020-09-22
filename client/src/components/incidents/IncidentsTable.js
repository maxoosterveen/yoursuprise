import React from 'react';
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
  table: {
    width: '800px',
  },
  tableHead: {
    textAlign: 'left',
    backgroundColor: '#f0f0f0'
  },
  tableHeader: {
    padding: '10px 15px'
  }
});


const Incidents = ({incidents}) => {

  const classes = useStyles();

  return (
    <table className={classes.table}>
      <thead className={classes.tableHead}>
        <tr>
          <th className={classes.tableHeader}>Road</th>
          <th className={classes.tableHeader}>Type</th>
          <th className={classes.tableHeader}>Start</th>
          <th className={classes.tableHeader}>Stop</th>
          <th className={classes.tableHeader}>Distance</th>
          <th className={classes.tableHeader}>Delay</th>
        </tr>
      </thead>
      <tbody>
        {incidents.map((incident) => (
          <tr key={incident.ext_id}>
            <td>{incident.road}</td>
            <td>{incident.category}</td>
            <td>{`${incident.start ? new Date(incident.start).toLocaleString('nl') : 'Onbekend'}`}</td>
            <td>{`${incident.stop ? new Date(incident.stop).toLocaleString('nl') : 'Onbekend'}`}</td>
            <td>{`${incident.distance ? incident.distance / 1000 + 'km' : 'Onbekend'}`}</td>
            <td>{`${incident.delay ? incident.delay / 60 + 'min' : 'Onbekend'}`}</td>
          </tr>
        ))}
      </tbody>
      </table>
  );
};

export default Incidents;
