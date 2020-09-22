import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  dateFilterWrapper: {
    display: 'flex',
  },
  dateFilter: {
    flex: '1 1 auto'
  }
})


const IncidentsDateFilter = () => {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const classes = useStyles()

  return (
    <div className={classes.dateFilterWrapper}>
      <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
      <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
    </div>
  );
};

export default IncidentsDateFilter;
