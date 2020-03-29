import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

export const TableLoading = ({isLoading}) => {
  if (!isLoading) return null;
  else {
    return (
      <div style={{display: 'table', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%'}}>
        <div style={{display: 'table-row', width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.7'}}>
          <div style={{display: 'table-cell', width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center'}}>
            <CircularProgress style={{width: '55px', height: '55px'}} />
          </div>
        </div>
      </div>
    );
  }
};

TableLoading.propTypes = {
  isLoading: PropTypes.bool,
};
