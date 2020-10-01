import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useTable, useFilters, usePagination, useSortBy, useRowSelect} from 'react-table';
import {ActionBar, RowSelectCheckbox, TableHeadBodyRows, TableFooterRow, TableLoading, TableTitles} from './Table/';
import {BooleanColumnFilter, DatetimeColumnFilter, DefaultColumnFilter, SelectColumnFilter} from './Table/Filters/';
import moment from 'moment';
import matchSorter from 'match-sorter';

const Table = (props) => {
  const onLoadProps = useMemo(() => {
    // This memo holds MuiTable props that will never, ever, EVER change after initial component mount.
    // Extreme caution should be used when placing props inside this memo.
    return {
      columns: props.columns,
      disableFilters: props.disableFilters,
      paginationActive: props.paginationActive,
      paginationInitialIndex: props.paginationInitialIndex,
      paginationInitialSize: props.paginationInitialSize,
      paginationSizes: props.paginationSizes,
      rowEdgePadding: props.rowEdgePadding,
      selectRows: props.selectRows,
      title: props.title,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const baseConfig = useMemo(() => {
    const defaultSelectedRowObject = {};
    if (props.selectRowsInitial) {
      props.selectRowsInitial.forEach(dataIndex => defaultSelectedRowObject[dataIndex] = true);
    }
    return {
      autoResetSortBy: false,
      autoResetFilters: false,
      autoResetPage: false,
      autoResetSelectedRows: false,
      disableFilters: onLoadProps.disableFilters,
      initialState: {
        pageIndex: onLoadProps.paginationInitialIndex,
        pageSize: onLoadProps.paginationInitialSize,
        sortBy: props.sortInitial ? props.sortInitial : [],
        selectedRowIds: defaultSelectedRowObject,
      },
    };
  }, [onLoadProps, props.sortInitial, props.selectRowsInitial]);
  const columns = useMemo(() => {
    const tableColumns = onLoadProps.columns.map(column => {
      return {
        ...column,
        Filter: (() => {
          if (column.filterField === 'select') return SelectColumnFilter;
          if (column.type === 'datetime' || column.type === 'timestamp') return DatetimeColumnFilter;
          if (column.type === 'boolean') return BooleanColumnFilter;
          else return DefaultColumnFilter;
        })(),
        filter: (rows, id, filterValue) => {
          if (filterValue.type === 'Similar') {
            return matchSorter(rows, filterValue.content, {keys: [row => row.values[id]]});
          }
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
              const filterMoment = moment(filterValue.content, 'YYYY-MM-DD');
              const rowMoment = () => {
                if (filterValue.columnType === 'datetime') return moment(row.values[id]);
                else if (filterValue.columnType === 'timestamp') return moment(row.values[id].toMillis ? row.values[id].toMillis() : null);
              };
              if (!filterMoment.isValid()) return true; // Return all rows when filterValue.content is invalid
              if (rowMoment().isBefore(filterMoment, 'day')) return true;
              if (filterMoment.isSame(rowMoment(), 'day')) return true;
              else return false;
            });
          }
          if (filterValue.type === 'After') {
            return rows.filter(row => {
              const filterMoment = moment(filterValue.content, 'YYYY-MM-DD');
              const rowMoment = () => {
                if (filterValue.columnType === 'datetime') return moment(row.values[id]);
                else if (filterValue.columnType === 'timestamp') return moment(row.values[id].toMillis ? row.values[id].toMillis() : null);
              };
              if (!filterMoment.isValid()) return true; // Return all rows when filterValue.content is invalid
              if (rowMoment().isAfter(filterMoment, 'day')) return true;
              if (filterMoment.isSame(rowMoment(), 'day')) return true;
              else return false;
            });
          }
          if (filterValue.type === 'Same') {
            return rows.filter(row => {
              const filterMoment = moment(filterValue.content, 'YYYY-MM-DD');
              const rowMoment = () => {
                if (filterValue.columnType === 'datetime') return moment(row.values[id]);
                else if (filterValue.columnType === 'timestamp') return moment(row.values[id].toMillis ? row.values[id].toMillis() : null);
              };
              if (!filterMoment.isValid()) return true; // Return all rows when filterValue.content is invalid
              if (filterMoment.isSame(rowMoment(), 'day')) return true;
              else return false;
            });
          }
        },
        Header: () => column.Header || column.accessor || '',
        disableFilters: column.filterDisable || false,
        sortType: column.type || 'alphanumeric',
      };
    });
    if (props.actionsPerRow.length > 0) {
      tableColumns.unshift({
        id: 'muiTableActions',
        disableFilters: true,
        disableSortBy: true,
        Header: 'Actions',
        actions: props.actionsPerRow,
      });
    }
    return tableColumns;
  }, [onLoadProps.columns, props.actionsPerRow]);
  const data = useMemo(() => {
    return props.data;
  }, [props.data]);
  const sortTypes = useMemo(() => {
    return {
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
        if (momentA.isValid() && !momentB.isValid()) return 1;
        if (!momentA.isValid() && momentB.isValid()) return -1;
        if (!momentA.isValid() && !momentB.isValid()) return 0;
        if (momentA.isSame(momentB)) return 0;
        if (momentA.isAfter(momentB)) return 1;
        if (momentA.isBefore(momentB)) return -1;
      },
      timestamp: (rowA, rowB, columnID) => {
        const momentA = moment(rowA.values[columnID]?.toMillis ? rowA.values[columnID]?.toMillis() : null);
        const momentB = moment(rowB.values[columnID]?.toMillis ? rowB.values[columnID]?.toMillis() : null);
        if (momentA.isValid() && !momentB.isValid()) return 1;
        if (!momentA.isValid() && momentB.isValid()) return -1;
        if (!momentA.isValid() && !momentB.isValid()) return 0;
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
        if (rowA.values[columnID] && !rowB.values[columnID]) return 1;
        if (!rowA.values[columnID] && rowB.values[columnID]) return -1;
        if (!rowA.values[columnID] && !rowB.values[columnID]) return 0;
        return rowA.values[columnID].localeCompare(rowB.values[columnID]);
      },
    };
  }, []);
  const useHooks = useCallback(hooks => {
    hooks.visibleColumns.push(columns => {
      const tableColumns = [...columns];
      if (onLoadProps.selectRows) {
        tableColumns.unshift({
          id: 'muiRowSelection',
          Header: ({getToggleAllRowsSelectedProps}) => <RowSelectCheckbox {...getToggleAllRowsSelectedProps()} selectAllHandler={props.selectAllHandler} />, //eslint-disable-line
          Cell: ({row, selectedFlatRows}) => <RowSelectCheckbox {...row.getToggleRowSelectedProps()} rowData={row.original} selectedFlatRows={selectedFlatRows} selectRowHandler={props.selectRowHandler} />, //eslint-disable-line
        });
      }
      return tableColumns;
    });
  }, [onLoadProps.selectRows, props.selectRowHandler, props.selectAllHandler]);

  const rtProps = useTable({...baseConfig, columns, data, sortTypes}, useFilters, useSortBy, usePagination, useRowSelect, useHooks);
  const bodyRows = useMemo(() => {
    if (props.paginationActive && props.paginationShowEmptyRows) {
      const sizeRowDifference = rtProps.state.pageSize - rtProps.page.length;
      if (sizeRowDifference === 0) return rtProps.page;
      else {
        const pageWithBlanks = [...rtProps.page];
        for (let blanks = sizeRowDifference; blanks > 0; blanks--) {
          pageWithBlanks.push(null);
        }
        return pageWithBlanks;
      }
    } else if (props.paginationActive && !props.paginationShowEmptyRows) {
      return rtProps.page;
    } else return rtProps.rows;
  }, [props.paginationActive, props.paginationShowEmptyRows, rtProps.page, rtProps.rows, rtProps.state.pageSize]);
  const tableHeadBodyProps = useMemo(() => ({
    disableFilters: onLoadProps.disableFilters,
    isLoading: props.isLoading,
    rowEdgePadding: onLoadProps.rowEdgePadding,
  }), [onLoadProps.disableFilters, onLoadProps.rowEdgePadding, props.isLoading]);
  const tableFooterProps = useMemo(() => {
    return {
      canPreviousPage: rtProps.canPreviousPage,
      canNextPage: rtProps.canNextPage,
      colSpan: columns.length,
      gotoPage: rtProps.gotoPage,
      nextPage: rtProps.nextPage,
      pageCount: rtProps.pageCount,
      pageOptionsLength: rtProps.pageOptions.length,
      paginationActive: onLoadProps.paginationActive,
      paginationSizes: onLoadProps.paginationSizes,
      previousPage: rtProps.previousPage,
      setPageSize: rtProps.setPageSize,
      statePageIndex: rtProps.state.pageIndex,
      statePageSize: rtProps.state.pageSize,
    };
    // eslint-disable-next-line max-len
  }, [columns.length, onLoadProps.paginationActive, onLoadProps.paginationSizes, rtProps.canNextPage, rtProps.canPreviousPage, rtProps.gotoPage, rtProps.nextPage, rtProps.pageCount, rtProps.pageOptions.length, rtProps.previousPage, rtProps.setPageSize, rtProps.state.pageIndex, rtProps.state.pageSize]);

  return (
    <div id='MuiTable' style={{position: 'relative'}}>
      <TableTitles title={onLoadProps.title} />
      <ActionBar actions={props.actionsBar} rtProps={rtProps} />
      <TableHeadBodyRows rtProps={rtProps} bodyRows={bodyRows} {...tableHeadBodyProps} />
      <TableFooterRow {...tableFooterProps} />
      <TableLoading isLoading={props.isLoading} />
    </div>
  );
};

Table.defaultProps = {
  actionsPerRow: [],
  actionsPerTable: [],
  disableFilters: false,
  paginationActive: true,
  paginationInitialIndex: 0,
  paginationInitialSize: 5,
  paginationShowEmptyRows: true,
  paginationSizes: [5, 10, 15],
  rowEdgePadding: '8px',
  selectRows: false,
  selectRowHandler: () => {},
};
Table.propTypes = {
  /** <p>Property defines action buttons to be displayed in Action Bar component above table. [If property not provided, Action Bar will not render]. Property must be an array that contains items that are either objects or callback functions.</p><p>***Object Shape:*** {icon, tooltip, onClick, buttonProps} - <ul><li><b>icon: </b> If provided, the icon that will be displayed within action button.</li><li><b>text: </b> (required) The text that will be displayed within the action button. </li><li><b>onClick:</b> (required) The function that will be triggered when the button is clicked. Signature: `({event, tableData}) => {}.</li><li><b>buttonProps: </b> If provided, object passed to property will modify default props passed to action Button component. ***Example:*** buttonProps: { size: 'small', style: {padding: '16px'} } <a href='https://material-ui.com/api/button/#props' target='_blank'>See Material UI Button Props</a></li></ul></p><p>***Function Shape: *** (rtProps) => return {icon, text, onClick, buttonProps} - <ul><li>A function must return an object that matches the shape described above.</li><li>A function should be used (instead of a plain object) when tableData is needed to modify properties of Action object.</li></ul></p> */ //eslint-disable-line
  actionsBar: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      icon: PropTypes.oneOfType([PropTypes.object]),
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      buttonProps: PropTypes.object,
    }),
  ])),
  /** <p>Property defines the actions that will be clickable on every row in the table. Property can either by an object or a callback function.</p><p>***Object Shape:*** {icon, tooltip, onClick} - <b>icon: </b> (required) The icon that will be displayed for the action. Must be a React node; <b>tooltip:</b> The tooltip that will be displayed when the user hover over the action icon. Must be a string; <b>disabled:</b> Boolean that disables action button; <b>hide:</b> boolean that hides an action button; <b>onClick:</b> (required) The function that will be triggered when the button is clicked. Signature: `({event, rowData, rowIndex}) => {}</p><p>***Function Shape: *** (rowData) => return {icon, disabled, hide, tooltip, onClick};  A function must return an object that matches the shape described above. A function should be used (instead of a plain object) when rowData is needed to modify properties of Action object.</p>*/ //eslint-disable-line
  actionsPerRow: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      disabled: PropTypes.bool,
      icon: PropTypes.oneOfType([PropTypes.object]).isRequired,
      tooltip: PropTypes.string,
      onClick: PropTypes.func.isRequired,
    }),
  ])),
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
    /** Specifies the maximum width for the column. */
    maxWidth: PropTypes.number,
    // eslint-disable-next-line max-len
    /** Controls default column formatting, sorting and filtering. Available types include: 'alphanumeric', 'boolean', 'currency', 'datetime', 'timestamp', and 'numeric'. Defaults to 'alphanumeric'. Note: type 'timestamp' works exactly like 'datetime' but allows for the passing of FireStore timestamp object. */
    type: PropTypes.string,
    /** Controls whether text will wrap inside Table's Body cell.  Defaults to 'false'. */
    wrapBodyText: PropTypes.boolean,
    /** Controls whether text will wrap inside Table's Head cell.  Defaults to 'false'. */
    wrapHeadText: PropTypes.boolean,
  })).isRequired,
  /** The data to be shown by the table. Keys must match the 'accessor' of their coresponding column. */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** If `true`, disables filtering for every column in the entire table. Defaults to `false` */
  disableFilters: PropTypes.bool,
  /** If `true`, displays a MUI CircularProgress element over the table body. */
  isLoading: PropTypes.bool,
  /**  If `false`, pagination will be turned off. Defaults to `true`. */
  paginationActive: PropTypes.bool,
  /** Index of the page that should be displayed first when pagination is active. Defaults to `0`. */
  paginationInitialIndex: PropTypes.number,
  /** The amount of rows on any given page when pagination is active. Defaults to `5`. */
  paginationInitialSize: PropTypes.number,
  /**  If `true`, pagination will show extra empty rows to fill current page size. Defaults to `true`. */
  paginationShowEmptyRows: PropTypes.bool,
  /**  An array of numbers representing the amount of rows on any given page. Default to [5, 10, 25]. */
  paginationSizes: PropTypes.arrayOf(PropTypes.number),
  /** Extra padding added to the left side of first column and the right side of last column. Defaults to '8px'. */
  rowEdgePadding: PropTypes.string,
  /**  If `true`, implements basic row selection. Defaults to `false`. Selected rows can be accessed through `actionPerTable` onClick property, which returns selectedFlatRow (an array of row objects). */ //eslint-disable-line
  selectRows: PropTypes.bool,
  /** Receives an array of numbers that correspond to the index of the object within the original data prop. This index is used internally by the table to maintain an identity to the data object passed. */ //eslint-disable-line
  selectRowsInitial: PropTypes.arrayOf(PropTypes.number),
  /** When selectRows prop is true, you can pass a function in this prop that will fire when a row is changed. ***Function Shape: *** ({event, rowData, dataOfSelectedRows, checked}) => return null; dataOfSelectedRows is an array of all selected row objects.*/ //eslint-disable-line
  selectRowHandler: PropTypes.func,
    /** When selectRows prop is true, you can pass a function in this prop that will fire when the select all rows is changed. ***Function Shape: *** ({event, checked}) => return null; */ //eslint-disable-line
  selectAllHandler: PropTypes.func,
  /** An array of objects used to perform initial sort of columns. ***Array Shape:*** [{id<string>, desc<boolean>}, ...]. Object 'id' property is used to select column to be sorted and must match column accessor. Object 'desc' if true will sort column descending. If array length > 1, multi-sorting is enabled. */ //eslint-disable-line
  sortInitial: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    desc: PropTypes.bool,
  })),
  /** <p>Property defines title(s) to be displayed above main table.<ul><li>(optional) If property not provided, Title section will not render.</li><li>Pass a single string to show primary title only. <b>example: </b> title='Current Employees'</li><li>Pass an object to define both primary and secondary titles, as well as to control title styling. <b>example: </b>title={{ primary: '...', secondary: '...', primaryProps: {...}, secondaryProps: {...}, wrapperStyle: {...} }}.</li></ul></p><p>Updating Props & Styles.<ul><li><b>primaryProps/secondaryProps: </b> Primary and secondary titles use Typography components. You may change the default props passed to Typography component by using primaryProps and secondaryProps objects. <b>example: </b>title={{ primary: 'Primary Title', primaryProps: {variant: 'h1', style: {color: 'red'}} }}</li><li><b>wrapperStyle: </b> Titles are wrapped in a `<div>` tag. You may change the default style passed to `<div>` by using wrapperStyle object. <b>example: </b> title={{ primary: 'Primary Title', wrapperStyle: {padding: '8px'} }}</li></ul></p><br /> */ //eslint-disable-line
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      primary: PropTypes.string,
      secondary: PropTypes.string,
      primaryProps: PropTypes.object,
      secondaryProps: PropTypes.object,
      wrapperStyle: PropTypes.object,
    }),
  ]),
};
export default Table;
