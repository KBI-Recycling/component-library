import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {useTable, useSortBy, usePagination} from 'react-table';
import {Table as MuiTable, TableHead, TableBody, TableFooter} from '@material-ui/core';
import TableHeadRow from './Table/TableHeadRow';
import TableBodyRow from './Table/TableBodyRow';
import TableFooterRow from './Table/TableFooterRow';
import moment from 'moment';

const Table = (props) => {
  const data = useMemo(() => {
    return props.data;
  }, [props.data]);
  const columns = useMemo(() => {
    return props.columns.map(column => {
      return {
        ...column,
        sortType: column.type,
      };
    });
  }, [props.columns]);
  const initialState = useMemo(() => ({
    pageSize: props.paginationInitialSize,
    pageIndex: props.paginationInitialIndex,
  }), [props.paginationInitialIndex, props.paginationInitialSize]);

  const sortTypes = useMemo(() => ({
    boolean: (rowA, rowB, columnID) => {
      if (rowA.values[columnID] === rowB.values[columnID]) return 0;
      if (!rowA.values[columnID]) return 1;
      if (rowA.values[columnID]) return -1;
    },
    currency: (rowA, rowB, columnID) => {
      if (rowA.values[columnID] === rowB.values[columnID]) return 0;
      if (rowA.values[columnID] > rowB.values[columnID]) return 1;
      if (rowA.values[columnID] < rowB.values[columnID]) return -1;
    },
    datetime: (rowA, rowB, columnID) => {
      const momentA = moment(rowA.values[columnID]);
      const momentB = moment(rowB.values[columnID]);
      if (momentA.isSame(momentB)) return 0;
      if (momentA.isAfter(momentB)) return 1;
      if (momentA.isBefore(momentB)) return -1;
    },
    numeric: (rowA, rowB, columnID) => {
      if (rowA.values[columnID] === rowB.values[columnID]) return 0;
      if (rowA.values[columnID] > rowB.values[columnID]) return 1;
      if (rowA.values[columnID] < rowB.values[columnID]) return -1;
    },
    string: (rowA, rowB, columnID) => {
      return rowA.values[columnID].localeCompare(rowB.values[columnID]);
    },
  }), []);
  const rtProps = useTable({columns, data, initialState, sortTypes}, useSortBy, usePagination);
  const bodyRows = useMemo(() => {
    if (props.paginationActive === true) return rtProps.page;
    else return rtProps.rows;
  }, [props.paginationActive, rtProps.page, rtProps.rows]);

  return (
    <MuiTable {...rtProps.getTableProps()} size='small'>
      <TableHead>
        {rtProps.headerGroups.map((headerGroup, headIndex) => <TableHeadRow key={headIndex} headerGroup={headerGroup} />)}
      </TableHead>
      <TableBody>
        {bodyRows.map((row, bodyIndex) => <TableBodyRow key={bodyIndex} rtProps={rtProps} row={row} />)}
      </TableBody>
      <TableFooter>
        <TableFooterRow columns={columns} rtProps={rtProps} paginationActive={props.paginationActive} paginationSizes={props.paginationSizes} />
      </TableFooter>
    </MuiTable>
  );
};

Table.defaultProps = {
  paginationActive: true,
  paginationInitialIndex: 0,
  paginationInitialSize: 5,
  paginationSizes: [5, 10, 15],
};
Table.propTypes = {
  /** Property defines the columns that will be displayed in the table and the settings that should apply to each column. */
  columns: PropTypes.arrayOf(PropTypes.shape({
    /** Property that controls the header and data to be displayed in each column. Will be used as the table header by default; but can be overwritten by more descriptive `Header` property. */
    accessor: PropTypes.string.isRequired,
    /** By default, 'datetime' column types display as `moment().format('MM/DD/YYYY')`. This property overrides that default format string. See <a href='https://momentjs.com/docs/#/displaying/' target='_blank'>moment.js display docs</a> for more details. */ //eslint-disable-line
    datetimeFormat: PropTypes.string,
    /** Overwrites default `accessor` title used in the table header. */
    Header: PropTypes.string,
    /** Data type: 'boolean', 'currency', 'datetime', 'numeric', 'string' */
    type: PropTypes.string,
  })).isRequired,
  /** The data to be shown by the table. Keys must match the 'accessor' of their coresponding column. */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**  If `false`, pagination will be turned off. Defaults to `true`. */
  paginationActive: PropTypes.bool,
  /** Index of the page that should be displayed first when pagination is active. Defaults to `0`. */
  paginationInitialIndex: PropTypes.number,
  /** The amount of rows on any given page when pagination is active. Defaults to `5`. */
  paginationInitialSize: PropTypes.number,
  /**  An array of numbers representing the amount of rows on any given page. Default to [5, 10, 25]. */
  paginationSizes: PropTypes.arrayOf(PropTypes.number),
};
export default Table;
