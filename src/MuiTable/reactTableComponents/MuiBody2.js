import React from 'react';
import PropTypes from 'prop-types';
import {TableBody} from '@material-ui/core';
import MuiBodyRow from './MuiBodyRow2';

const MuiBody2 = (props) => {
  const {rows, getTableBodyProps, prepareRow} = props;

  return (
    <TableBody component='div' {...getTableBodyProps()}>
      {rows.map((row, index) => {
        prepareRow(row);
        return (
          <MuiBodyRow key={index} row={row} />
        );
      })
      }
    </TableBody>
  );
};

MuiBody2.propTypes = {
  getTableBodyProps: PropTypes.func.isRequired,
  prepareRow: PropTypes.func.isRequired,
  rows: PropTypes.array.isRequired,
};
export default MuiBody2;
