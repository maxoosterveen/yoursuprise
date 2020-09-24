import React, { useState, useEffect } from 'react';
import axios from 'axios';

import IncidentCard from './IncidentCard';

import DatePicker, { registerLocale } from 'react-datepicker';
import nl from "date-fns/locale/nl"
import "react-datepicker/dist/react-datepicker.css";

registerLocale('nl', nl);


const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const fetchHandler = async () => {
    const { data } = await axios.get('/api/v1/incidents', {
      params: {
        start: startDate,
        category: 'jams',
      }
    });
    setIncidents(data);
  }

  useEffect(() => {
    fetchHandler();
  }, [startDate]);

  return (
    <div>
      <DatePicker 
        selected={startDate} 
        onChange={date => setStartDate(date)}
        showTimeInput
        locale="nl"
        dateFormat="d MMMM, yyyy HH:mm" 
      />
      <div>
        {incidents.map((incident) => (
          <IncidentCard incident={incident} key={incident.ext_id} />
        ))}
      </div>
    </div>
  );
};

export default Incidents;
