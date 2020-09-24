import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker, { registerLocale } from 'react-datepicker';
import nl from "date-fns/locale/nl"
import "react-datepicker/dist/react-datepicker.css";
import IncidentCard from './IncidentCard';

import css from '@emotion/css';

const datePickerStyles = css`
  color: red;
  background: green;
`

registerLocale('nl', nl);

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const fetchHandler = async () => {
      const { data } = await axios.get('/api/v1/incidents', {
        params: {
          start: startDate,
          category: 'jams',
        }
      });
      setIncidents(data);
    }
    fetchHandler();
  }, [startDate]);

  return (
    <div>
      <div>
        <DatePicker
          selected={startDate} 
          onChange={date => setStartDate(date)}
          showTimeInput
          locale="nl"
          popperClassName={datePickerStyles}
          dateFormat="d MMMM, yyyy HH:mm" 
        />
      </div>
      <div>
        {incidents.map((incident) => (
          <IncidentCard incident={incident} key={incident.ext_id} />
        ))}
      </div>
    </div>
  );
};

export default Incidents;
