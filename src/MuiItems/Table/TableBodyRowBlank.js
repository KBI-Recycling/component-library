import React from 'react';
import PropTypes from 'prop-types';
import {TableCell, TableRow} from '@material-ui/core';

const TableBodyRowBlank = ({colSpan}) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>{''}</TableCell>
    </TableRow>
  );
};

TableBodyRowBlank.propTypes = {
  colSpan: PropTypes.number.isRequired,
};
export default React.memo(TableBodyRowBlank);
