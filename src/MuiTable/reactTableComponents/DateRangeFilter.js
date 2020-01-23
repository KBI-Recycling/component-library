/* eslint-disable require-jsdoc */
import React, {useMemo} from 'react';
import {TextField} from '@material-ui/core';
import moment from 'moment';

function NumberRangeColumnFilter({
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
}

export default NumberRangeColumnFilter;
