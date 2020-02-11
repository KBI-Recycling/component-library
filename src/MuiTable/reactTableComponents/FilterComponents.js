/* eslint-disable require-jsdoc */
import React, {useMemo, useState} from 'react';
import {TextField, InputAdornment, IconButton} from '@material-ui/core';
import {FilterList} from '@material-ui/icons';
import moment from 'moment';

export const DateRangeFilter = React.memo(function DateRangeFilter(props) {
  const {filterValue, setFilter, changeFilter, filterTypes, index} = props.column;
  const [filterType, setFilterType] = useState('dateBefore');
  const handleClick = () => {
    setFilterType(filterTypes[filterType].next);
    changeFilter(index, filterType);
  };

  return (
    <TextField
      value={filterValue || ''}
      type="date"
      onClick={e => e.stopPropagation()} // This prevents column sorting when a user selects the filter input field.
      onChange={e => {
        const val = e.target.value;
        if (moment(val).isValid()) {
          setFilter(moment(val).format('YYYY-MM-DD'));
        }
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={handleClick} style={{padding: 0}}>
              <FilterList />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
},
);

export const DefaultColumnFilter = React.memo(function DefaultColumnFilter(props) {
  const {filterValue, setFilter, changeFilter, filterTypes, index} = props.column;
  const [filterType, setFilterType] = useState('text');
  const handleClick = () => {
    setFilterType(filterTypes[filterType].next);
    changeFilter(index, filterType);
  };

  return (
    <TextField
      value={filterValue || ''}
      onClick={e => e.stopPropagation()} // This prevents column sorting when a user selects the filter input field.
      onChange={e => setFilter(e.target.value || undefined)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={handleClick} style={{padding: 0}} disabled={!filterTypes}>
              <FilterList />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
});
