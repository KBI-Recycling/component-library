/* eslint-disable require-jsdoc */
import React, {useMemo, useState} from 'react';
import {TextField, InputAdornment, IconButton} from '@material-ui/core';
import {FilterList} from '@material-ui/icons';
import moment from 'moment';

export const DateRangeFilter = React.memo(function DateRangeFilter({
  column: {filterValue = [], preFilteredRows, setFilter, id},
}) {
  // const [min, max] = React.useMemo(() => {
  //   let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
  //   let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
  //   preFilteredRows.forEach(row => {
  //     min = Math.min(row.values[id], min);
  //     max = Math.max(row.values[id], max);
  //   });
  //   return [min, max];
  // }, [id, preFilteredRows]);

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <TextField
        value={filterValue[0] || ''}
        type="date"
        onClick={e => e.stopPropagation()} // This prevents column sorting when a user selects the filter input field.
        onChange={e => {
          const val = e.target.value;
          if (moment(val).isValid()) {
            console.log('inside filter', moment(val), val);
            setFilter((old = []) => [val ? moment(val).format('YYYY-MM-DD') : undefined, old[1]]);
          }
        }}
        style={{
          width: '70px',
          marginRight: '0.5rem',
        }}
      />
      to
      <TextField
        value={filterValue[1] || ''}
        type="date"
        onClick={e => e.stopPropagation()} // This prevents column sorting when a user selects the filter input field.
        onChange={e => {
          const val = e.target.value;
          if (moment(val).isValid()) {
            setFilter((old = []) => [old[0], val ? moment(val).format('YYYY-MM-DD') : undefined]);
          }
        }}
        style={{
          width: '70px',
          marginLeft: '0.5rem',
        }}
      />
    </div>
  );
},
);

export const DefaultColumnFilter = React.memo(function DefaultColumnFilter(props) {
  console.log(props);
  const {filterValue, setFilter, changeFilter, filterTypes, index} = props.column;
  const [filterType, setFilterType] = useState('text');
  // console.log(column);
  const handleClick = () => {
    console.log(filterType);
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
            <IconButton onClick={handleClick} style={{padding: 0}}>
              <FilterList />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
});
