import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {createUseStyles} from 'react-jss'

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// import IncidentsDateFilter from './IncidentsDateFilter';
import IncidentsTable from './IncidentsTable';

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [startDate, setStartDate] = useState(new Date().setHours(new Date().getHours() - 1));
  const [endDate, setEndDate] = useState(new Date().setHours(new Date().getHours() + 1));

  async function fetchHandler() {
    const { data } = await axios.get('/api/v1/incidents/jams');
    setIncidents(data);
  }


  function filter(incidents){
    return incidents.filter(incident => {
      const incidentStartDate = new Date(incident.start);
      const incidentEndDate = new Date(incident.start);

      return true;
    })
  }

  useEffect(() => {
    fetchHandler();
  }, []);

  return (
    <div>
      <DatePicker 
        selected={startDate} 
        onChange={date => setStartDate(date)}
        showTimeInput 
        dateFormat="MMMM d, yyyy h:mm" 
      />
      <DatePicker 
        selected={endDate} 
        onChange={date => setEndDate(date)}
        showTimeInput 
        dateFormat="d MMMM, yyyy h:mm" 
      />
      <div>
        <IncidentsTable incidents={ filter(incidents) } />
      </div>
    </div>
  );
};

export default Incidents;
