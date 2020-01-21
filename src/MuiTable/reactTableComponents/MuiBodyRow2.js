import React from 'react';
import PropTypes from 'prop-types';
import {TableRow} from '@material-ui/core';
import MuiBodyCell from './MuiBodyCell2';

const MuiBodyRow = (props) => {
  const {row} = props;
  return (
    <TableRow component='div' {...row.getRowProps()}>
      {row.cells.map((cell, index) => {
        return <MuiBodyCell key={index} cell={cell} />;
      })}
    </TableRow>
  );
};

MuiBodyRow.propTypes = {
  row: PropTypes.object.isRequired,
};
export default MuiBodyRow;
