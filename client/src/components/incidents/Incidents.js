import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker, { registerLocale } from 'react-datepicker';
import nl from "date-fns/locale/nl"
import "react-datepicker/dist/react-datepicker.css";
import IncidentCard from './IncidentCard';

import css from '@emotion/css';
import styled from '@emotion/styled';

registerLocale('nl', nl);


const IncedentCategoryFilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px -5px;
`;

const IncedentCategoryFilter = styled.button`
  margin: 0 5px;
  background-color: transparent;
  border: 0;
  outline: 0;
  font-size: 18px;
  cursor: pointer;
`;

const IncedentCategoryFilterActive = css`
  background: red;
`

const datePickerStyles = css`
  color: red;
  background: green;
`


const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [category, setCategory] = useState();

  const changeCategory = (e) => {
    setCategory(e.target.dataset.category);
  }

  useEffect(() => {
    const fetchHandler = async () => {
      const { data } = await axios.get('/api/v1/incidents', {
        params: {
          start: startDate,
          category
        }
      });
      setIncidents(data);
    }
    fetchHandler();
  }, [startDate, category]);

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
      <IncedentCategoryFilterWrapper>
        <IncedentCategoryFilter onClick={changeCategory}>Alles</IncedentCategoryFilter>
        <IncedentCategoryFilter data-category='jams' onClick={changeCategory}>Files</IncedentCategoryFilter>
        <IncedentCategoryFilter data-category='roadworks' onClick={changeCategory}>Werkzaamheden</IncedentCategoryFilter>
      </IncedentCategoryFilterWrapper>
      <div>
        {incidents.map((incident) => (
          <IncidentCard incident={incident} key={incident.ext_id} />
        ))}
      </div>
    </div>
  );
};

export default Incidents;
