import React from 'react';

import Incidents from './components/incidents/Incidents';

import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
  App: {
    width: '800px',
    margin: '0 auto',
  }
})

function App() {

  const classes = useStyles();

  return (
    <div className={classes.App}>
      <Incidents />
    </div>
  );
}

export default App;
