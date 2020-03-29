import React, {Fragment, useMemo} from 'react';
import PropTypes from 'prop-types';
import {TableRow} from '@material-ui/core';
import TableHeadCell from './TableHeadCell';
import TableHeadFilter from './TableHeadFilter';

const TableHeadRow = (props) => {
  const {disableFilters, forceUpdateHeadCell, headerGroup, rowEdgePadding, setForceUpdateHeadCell} = props;
  const tableHeadCellProps = useMemo(() => ({
    forceUpdateHeadCell,
    rowEdgePadding,
    setForceUpdateHeadCell,
  }), [forceUpdateHeadCell, rowEdgePadding, setForceUpdateHeadCell]);

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
  forceUpdateHeadCell: PropTypes.number.isRequired,
  headerGroup: PropTypes.object.isRequired,
  rowEdgePadding: PropTypes.string.isRequired,
  setForceUpdateHeadCell: PropTypes.func.isRequired,
};
export default TableHeadRow;
