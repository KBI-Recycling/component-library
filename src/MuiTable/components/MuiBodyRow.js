import React from 'react';
import PropTypes from 'prop-types';
import {TableRow} from '@material-ui/core';
import MuiBodyCell from './MuiBodyCell';

const MuiBodyRow = (props) => {
  const {columns, row} = props;
  return (
    <TableRow>
      {columns.map((column, index) => {
        const {field, ...otherProps} = column;
        return <MuiBodyCell key={index} field={row[field]} {...otherProps} />;
      })}
    </TableRow>
  );
};

MuiBodyRow.propTypes = {
  columns: PropTypes.array.isRequired,
  row: PropTypes.object.isRequired,
};
export default MuiBodyRow;
