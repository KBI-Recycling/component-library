import React, {Fragment, useMemo} from 'react';
import PropTypes from 'prop-types';
import {TableRow} from '@material-ui/core';
import TableHeadCell from './TableHeadCell';
import TableHeadFilter from './TableHeadFilter';

const TableHeadRow = (props) => {
  const {disableFilters, headerGroup, rowEdgePadding} = props;
  const tableHeadCellProps = useMemo(() => ({
    rowEdgePadding,
  }), [rowEdgePadding]);

  return (
    <Fragment>
      <TableRow {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column, columnIndex) => {
          return <TableHeadCell key={column.id} column={column} columnIndex={columnIndex} headers={headerGroup.headers} {...tableHeadCellProps} />;
        })}
      </TableRow>
      {!disableFilters && <TableRow>
        {headerGroup.headers.map((column, columnIndex) => {
          return <TableHeadFilter key={columnIndex} column={column} columnIndex={columnIndex} headers={headerGroup.headers} rowEdgePadding={rowEdgePadding} />;
        })}
      </TableRow>}
    </Fragment>
  );
};

TableHeadRow.propTypes = {
  disableFilters: PropTypes.bool,
  headerGroup: PropTypes.object.isRequired,
  rowEdgePadding: PropTypes.string.isRequired,
};
export default TableHeadRow;
