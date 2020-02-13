import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {TableRow} from '@material-ui/core';
import TableHeadCell from './TableHeadCell';
import TableHeadFilter from './TableHeadFilter';

const TableHeadRow = (props) => {
  const {headerGroup} = props;
  return (
    <Fragment>
      <TableRow {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column, columnIndex) => <TableHeadCell key={columnIndex} column={column} />)}
      </TableRow>
      <TableRow>
        {headerGroup.headers.map((column, columnIndex) => <TableHeadFilter key={columnIndex} column={column} />)}
      </TableRow>
    </Fragment>
  );
};

TableHeadRow.propTypes = {
  headerGroup: PropTypes.object.isRequired,
};
export default TableHeadRow;
