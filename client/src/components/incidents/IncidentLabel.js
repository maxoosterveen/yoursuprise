import React from 'react';
import styled from '@emotion/styled'

import roadworksIcon from '../../images/roadworksIcon.svg';
import jamsIcon from '../../images/jamsIcon.svg';

const IncedentLabelStyled = styled('div')`
  background: ${({ variant }) => 
    variant === 'error' ? '#e84118' :
    variant === 'normal' ? '#fbc531' : 
    variant === 'success' ? '#44bd32' : 
    '#00a8ff'
  };
  padding: 5px;
  border-radius: 5px;
  margin: 0 5px;
  color: #fff;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  > span {
    font-weight: bold;
    margin: 0 5px;
  }
  > img {
    width: 24px;
    height: auto;
  }

`;

// base = yellow
// succes = green
// error = red

const IncidentLabel = ({label, variant}) => {
  return (
    <IncedentLabelStyled variant={variant} >
      {
          label === 'roadworks' ? <img src={roadworksIcon} alt='roadworks-icon' /> :
          label === 'jams' ? <img src={jamsIcon} alt='jams-icon' /> : 
          <span>{label}</span>
        }
    </IncedentLabelStyled>
  );
}

export default IncidentLabel;
