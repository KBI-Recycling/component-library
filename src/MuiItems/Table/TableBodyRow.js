import React from 'react';
import PropTypes from 'prop-types';
import {TableRow} from '@material-ui/core';
import TableBodyCell from './TableBodyCell';
import TableBodyRowBlank from './TableBodyRowBlank';

const TableBodyRow = (props) => {
  const {rtProps, row} = props;
  if (!row) return <TableBodyRowBlank colSpan={rtProps.flatColumns.length} />;
  rtProps.prepareRow(row);
  return (
    <TableRow {...row.getRowProps()}>
      {row.cells.map((cell, cellIndex) => <TableBodyCell key={cellIndex} cell={cell} />)}
    </TableRow>
  );
};

TableBodyRow.propTypes = {
  rtProps: PropTypes.object.isRequired,
  row: PropTypes.object,
};
export default TableBodyRow;
