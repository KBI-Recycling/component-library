import React from 'react';
import PropTypes from 'prop-types';
import {TableCell, TableRow} from '@material-ui/core';

const TableBodyRowBlank = (props) => {
  return (
    <TableRow>
      <TableCell colSpan={props.colSpan}>{''}</TableCell>;
    </TableRow>
  );
};

TableBodyRowBlank.propTypes = {
  colSpan: PropTypes.number.isRequired,
};
export default React.memo(TableBodyRowBlank);
