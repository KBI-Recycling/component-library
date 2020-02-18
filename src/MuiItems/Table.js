import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {useTable, useFilters, usePagination, useSortBy} from 'react-table';
import {Table as MuiTable, TableHead, TableBody, TableFooter} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {TableHeadRow, TableBodyRow, TableFooterRow} from './Table/';
import {BooleanColumnFilter, DatetimeColumnFilter, DefaultColumnFilter, SelectColumnFilter} from './Table/Filters/';
import moment from 'moment';

const Table = (props) => {
  const styles = useStyles();
  const autoResets = useMemo(() => ({
    autoResetSortBy: false,
    autoResetFilters: false,
    autoResetPage: false,
  }), []);
  const columns = useMemo(() => {
    const tableColumns = props.columns.map(column => {
      return {
        ...column,
        Filter: (() => {
          if (column.filterField === 'select') return SelectColumnFilter;
          if (column.type === 'datetime') return DatetimeColumnFilter;
          if (column.type === 'boolean') return BooleanColumnFilter;
          else return DefaultColumnFilter;
        })(),
        filter: (rows, id, filterValue) => {
          if (filterValue.type === 'Includes') {
            return rows.filter(row => {
              const cleanRowValue = String(row.values[id]).toLowerCase();
              const cleanFilterValue = String(filterValue.content).toLowerCase();
              return cleanRowValue !== undefined && cleanRowValue.indexOf(cleanFilterValue) !== -1 ? true : false;
            });
          }
          if (filterValue.type === 'Starts') {
            return rows.filter(row => {
              const cleanRowValue = String(row.values[id]).toLowerCase();
              const cleanFilterValue = String(filterValue.content).toLowerCase();
              return cleanRowValue !== undefined ? cleanRowValue.substring(0, cleanFilterValue.length) === cleanFilterValue : true;
            });
          }
          if (filterValue.type === 'Equals') {
            return rows.filter(row => {
              if (!filterValue.content) return true;
              const cleanRowValue = String(row.values[id]).toLowerCase();
              const cleanFilterValue = String(filterValue.content).toLowerCase();
              return cleanRowValue !== undefined && cleanRowValue === cleanFilterValue ? true : false;
            });
          }
          if (filterValue.type === 'Boolean') {
            return rows.filter(row => {
              const cleanRowValue = String(row.values[id]).toLowerCase();
              const cleanFilterValue = String(filterValue.content).toLowerCase();
              if (cleanFilterValue === 'indeterminate') return true;
              else if (cleanRowValue === cleanFilterValue) return true;
              else return false;
            });
          }
          if (filterValue.type === 'Before') {
            return rows.filter(row => {
              if (moment(row.values[id]).isBefore(filterValue.content)) return true;
              if (moment(row.values[id]).isSame(filterValue.content)) return true;
              else return false;
            });
          }
          if (filterValue.type === 'After') {
            return rows.filter(row => {
              if (moment(row.values[id]).isAfter(filterValue.content)) return true;
              if (moment(row.values[id]).isSame(filterValue.content)) return true;
              else return false;
            });
          }
          if (filterValue.type === 'Same') {
            return rows.filter(row => {
              if (moment(row.values[id]).isSame(filterValue.content)) return true;
              else return false;
            });
          }
        },
        disableFilters: column.filterDisable || false,
        sortType: column.type || 'alphanumeric',
      };
    });
    if (props.actionsPerRow.length > 0) {
      tableColumns.unshift({
        id: 'actions',
        disableFilters: true,
        disableSortBy: true,
        Header: 'Actions',
        actions: props.actionsPerRow,
      });
    }
    return tableColumns;
  }, [props.actionsPerRow, props.columns]);
  const data = useMemo(() => {
    return props.data;
  }, [props.data]);
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
    alphanumeric: (rowA, rowB, columnID) => {
      return rowA.values[columnID].localeCompare(rowB.values[columnID]);
    },
  }), []);

  const rtProps = useTable({...autoResets, columns, data, disableFilters: props.disableFilters, initialState, sortTypes}, useFilters, useSortBy, usePagination);
  const bodyRows = useMemo(() => {
    if (props.paginationActive === true) return rtProps.page;
    else return rtProps.rows;
  }, [props.paginationActive, rtProps.page, rtProps.rows]);

  return (
    <div className={styles.tableWrap}>
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
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  tableWrap: {
    display: 'block',
    maxWidth: '100%',
    overflowX: 'auto',
    overflowY: 'hidden',
  },
}));
Table.defaultProps = {
  actionsPerRow: [],
  disableFilters: false,
  paginationActive: true,
  paginationInitialIndex: 0,
  paginationInitialSize: 5,
  paginationSizes: [5, 10, 15],
};
Table.propTypes = {
  /**  Property defines the actions that will be clickable on every row in the table. */
  actionsPerRow: PropTypes.arrayOf(PropTypes.shape({
    /**  The icon that will be displayed for the action. */
    icon: PropTypes.oneOfType([PropTypes.object]).isRequired,
    /** The tooltip that will be displayed when the user hover over the action icon. */
    tooltip: PropTypes.string,
    /** The function that will be triggered when the button is clicked. ***Signature:*** `({event, rowData, rowIndex}) => {}` */
    onClick: PropTypes.func.isRequired,
  })),
  /** Property defines the columns that will be displayed in the table and the settings that should apply to each column. */
  columns: PropTypes.arrayOf(PropTypes.shape({
    /** Property that controls the header and data to be displayed in each column. Will be used as the table header by default; but can be overwritten by more descriptive `Header` property. */
    accessor: PropTypes.string.isRequired,
    /** Property only affects 'datetime' column types and overrides default display format (i.e. 'MM/DD/YYYY'). To override format, a string can be passed that conforms to <a href='https://momentjs.com/docs/#/displaying/' target='_blank'>moment.js display docs.</a> */ //eslint-disable-line
    datetimeFormat: PropTypes.string,
    /** If set to `true`, will disable filtering for this column. Defaults to `false`. */
    filterDisable: PropTypes.bool,
    /** Controls the UI input and filter method for the column's filter field. Property must be one of 'text', 'boolean', 'datetime', or 'select'. Defaults to 'text'. */
    filterField: PropTypes.oneOf(['text', 'boolean', 'datetime', 'select']),
    /** Overwrites default `accessor` title used in the table header. */
    Header: PropTypes.string,
    /** Controls whether text will wrap inside Table's Body cell.  Defaults to 'false'. */
    wrapBodyText: PropTypes.boolean,
    /** Controls whether text will wrap inside Table's Head cell.  Defaults to 'false'. */
    wrapHeadText: PropTypes.boolean,
    /** Controls default column formatting, sorting and filtering. Available types include: 'alphanumeric', 'boolean', 'currency', 'datetime', and 'numeric'. Defaults to 'alphanumeric'. */
    type: PropTypes.string,
  })).isRequired,
  /** The data to be shown by the table. Keys must match the 'accessor' of their coresponding column. */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** If `true`, disables filtering for every column in the entire table. Defaults to `false` */
  disableFilters: PropTypes.bool,
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
