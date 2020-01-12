import React from 'react';
import PropTypes from 'prop-types';
import {Typography, TableCell} from '@material-ui/core';

const MuiBodyCell = (props) => {
  const {row, column} = props;
  return (
    <TableCell>
      <Typography noWrap>{row[column.field]}</Typography>
    </TableCell>
  );
};

MuiBodyCell.propTypes = {
  column: PropTypes.array.isRequired,
  row: PropTypes.array.isRequired,
};
export default MuiBodyCell;
