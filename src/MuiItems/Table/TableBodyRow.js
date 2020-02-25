import React from 'react';
import PropTypes from 'prop-types';
import {TableRow} from '@material-ui/core';
import TableBodyCell from './TableBodyCell';
import TableBodyCellBlank from './TableBodyCellBlank';

const TableBodyRow = (props) => {
  const {rtProps, row} = props;
  if (!row) return <TableRow><TableBodyCellBlank colSpan={rtProps.flatColumns.length} /></TableRow>;
  rtProps.prepareRow(row);
  return (
    <TableRow {...row.getRowProps()}>
      {row.cells.map((cell, cellIndex) => <TableBodyCell key={cellIndex} cell={cell} />)}
    </TableRow>
  );
};

TableBodyRow.propTypes = {
  rtProps: PropTypes.object.isRequired,
  row: PropTypes.object.isRequired,
};
export default TableBodyRow;
