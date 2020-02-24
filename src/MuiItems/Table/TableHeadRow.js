import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {TableRow} from '@material-ui/core';
import TableHeadCell from './TableHeadCell';
import TableHeadFilter from './TableHeadFilter';

const TableHeadRow = (props) => {
  const {disableFilters, headerGroup} = props;
  return (
    <Fragment>
      <TableRow {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column, columnIndex) => <TableHeadCell key={columnIndex} column={column} />)}
      </TableRow>
      {!disableFilters && <TableRow>
        {headerGroup.headers.map((column, columnIndex) => <TableHeadFilter key={columnIndex} column={column} />)}
      </TableRow>}
    </Fragment>
  );
};

TableHeadRow.propTypes = {
  disableFilters: PropTypes.bool,
  headerGroup: PropTypes.object.isRequired,
};
export default TableHeadRow;
