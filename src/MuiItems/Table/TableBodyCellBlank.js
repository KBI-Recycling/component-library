import React from 'react';
import PropTypes from 'prop-types';
import {TableCell} from '@material-ui/core';


const TableBodyCellBlank = (props) => {
  return <TableCell colSpan={props.colSpan}>{''}</TableCell>;
};

TableBodyCellBlank.propTypes = {
  colSpan: PropTypes.number.isRequired,
};
export default TableBodyCellBlank;
