import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Table as MuiTable, TableHead, TableBody} from '@material-ui/core';
import {TableHeadRow, TableBodyRow} from './index';
import TableBodyRowBlank from './TableBodyRowBlank';

const TableHeadBodyRows = ({bodyRows, disableFilters, isLoading, rowEdgePadding, rtProps}) => {
  const tableWrap = useMemo(() => ({
    display: 'block',
    maxWidth: '100%',
    overflowX: 'auto',
    overflowY: 'hidden',
    position: 'relative',
  }), []);
  const headRowProps = useMemo(() => ({
    disableFilters,
    rowEdgePadding,
  }), [disableFilters, rowEdgePadding]);

  return (
    <div style={tableWrap}>
      <MuiTable {...rtProps.getTableProps()}>
        <TableHead>
          {rtProps.headerGroups.map((headerGroup, headIndex) => {
            return <TableHeadRow key={headIndex} headerGroup={headerGroup} {...headRowProps} />;
          })}
        </TableHead>
        <TableBody>
          {bodyRows.map((row, rowIndex) => {
            if (!row || isLoading) return <TableBodyRowBlank key={rowIndex} colSpan={rtProps.allColumns.length} />;
            rtProps.prepareRow(row);
            const {key} = row.getRowProps();
            return <TableBodyRow key={key} row={row} rowEdgePadding={rowEdgePadding} />;
          })}
        </TableBody>
      </MuiTable>
    </div>
  );
};

TableHeadBodyRows.propTypes = {
  bodyRows: PropTypes.array,
  disableFilters: PropTypes.bool,
  isLoading: PropTypes.bool,
  rowEdgePadding: PropTypes.string,
  rtProps: PropTypes.object,
};
export default TableHeadBodyRows;
