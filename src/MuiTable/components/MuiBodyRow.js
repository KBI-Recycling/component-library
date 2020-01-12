import React from 'react';
import PropTypes from 'prop-types';
import {TableRow} from '@material-ui/core';
import MuiBodyCell from './MuiBodyCell';

const MuiBodyRow = (props) => {
  const {columns, row} = props;
  console.log({columns, row});
  return (
    <TableRow>
      {columns.map((column, cIndex) => <MuiBodyCell key={cIndex} column={column} row={row} />)}
    </TableRow>
  );
};

MuiBodyRow.propTypes = {
  columns: PropTypes.array.isRequired,
  row: PropTypes.object.isRequired,
};
export default MuiBodyRow;
