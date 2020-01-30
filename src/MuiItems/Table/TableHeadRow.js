import React from 'react';
import PropTypes from 'prop-types';
import {TableRow} from '@material-ui/core';
import TableHeadCell from './TableHeadCell';

const TableHeadRow = (props) => {
  const {headerGroup} = props;
  return (
    <TableRow {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column, columnIndex) => <TableHeadCell key={columnIndex} column={column} />)}
    </TableRow>
  );
};

TableHeadRow.propTypes = {
  headerGroup: PropTypes.object.isRequired,
};
export default TableHeadRow;
