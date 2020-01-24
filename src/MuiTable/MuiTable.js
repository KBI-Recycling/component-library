/* eslint-disable require-jsdoc */
import React, {useMemo, useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {TableContainer, Table} from '@material-ui/core';
import {Check, Close} from '@material-ui/icons';
import {useTable, useSortBy, usePagination, useFlexLayout, useFilters, useRowSelect} from 'react-table';
import moment from 'moment';
import {MuiHead, MuiPagination, MuiBody, DateRangeFilter, DefaultColumnFilter, startsWith, dateRange, useCreateCheckboxes} from './reactTableComponents';
// import {FixedSizeList} from 'react-window';
// import AutoSizer from 'react-virtualized-auto-sizer';
// import TablePaginationActions from './components/TablePaginationActions';
/**
 * A component that wraps <a href='https://www.npmjs.com/package/react-table target='_blank'>react-table</a> hooks
 * with <a href='https://material-ui.com/components/tables/' target='_blank'>Material UI Table</a> components. Commonly used react-table
 * props are described below in the PROPS & METHODS section. Less common props can also be passed; see
 * <a href='https://github.com/tannerlinsley/react-table/blob/HEAD/docs/api/README.md' target='_blank'>react-table API</a> for details.
 *
 * @version 1.0.0
 * @author [Gerry Blackmon](https://github.com/gblackiv)
 * @author [Daniel Kinsbursky](https://github.com/kbi-daniel)
 * @author [Chris Voss](https://github.com/ChrisJVoss)
 * @return {JSX} A react JSX component.
 * @public
 *
 */

const useStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));


const MuiTable = (props) => {
  // const classes = useStyles();
  // const theme = useTheme();
  const [stateColumns, setStateColumns] = useState([]);
  const [savedFilters, setSavedFilters] = useState({});
  const skipPageResetRef = useRef();

  useEffect(() => {
    console.log('Saved filters', savedFilters);
    const columnsWithSavedFilters = Object.keys(savedFilters);
    if (columnsWithSavedFilters.length) {
      const mergedColumns = [...props.columns];
      columnsWithSavedFilters.forEach(index => mergedColumns[index].filter = savedFilters[index]);
      skipPageResetRef.current = true;
      setStateColumns(mergedColumns);
    } else {
      skipPageResetRef.current = true;
      setStateColumns(props.columns);
    }
  }, [props.columns, savedFilters]);
  React.useEffect(() => {
    // After the table has updated, always remove the flag
    skipPageResetRef.current = false;
  }, [stateColumns]);
  const filterTypes = {
    startsWith: startsWith,
    dateRange: dateRange,
  };
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      Filter: (props) => {
        if (props.column.filter === 'dateRange') return <DateRangeFilter {...props} />;
        else return <DefaultColumnFilter {...props} />;
      },
    }),
    [],
  );

  const data = useMemo(() => {
    return props.data;
  }, [props.data]);

  const columns = useMemo(() => {
    return stateColumns.map(column => {
      if (column.type === 'boolean') {
        return {
          ...column,
          Cell: ({cell}) => cell.value ? <Check /> : <Close />, //eslint-disable-line
          sortType: column.sortType || 'basic',
          width: 75,
        };
      }
      if (column.type === 'date') {
        const basicDateSortType = (rowA, rowB, columnID, desc) => {
          const momentRowA = moment(rowA.values[columnID]);
          const momentRowB = moment(rowB.values[columnID]);
          if (momentRowA.isBefore(momentRowB)) return -1;
          else return 1;
        };
        return {
          ...column,
          Cell: ({cell}) => moment(cell.value).format(column.typeDateFormat || 'MM/DD/YYYY'),
          sortType: column.sortType || basicDateSortType,
        };
      }
      if (column.type === 'numeric') {
        return {
          ...column,
          Cell: ({cell}) => cell.value.toLocaleString(),
          sortType: column.sortType || 'alphanumeric',
        };
      }
      if (column.type === 'currency') {
        return {
          ...column,
          Cell: ({cell}) => cell.value.toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
          sortType: column.sortType || 'alphanumeric',
        };
      }
      return {...column, changeFilter: (index, filterType) => {
        const newColumn = stateColumns[index];
        newColumn.filter = filterType;
        const newColumns = [...stateColumns];
        newColumns.splice(index, 1, newColumn);
        setStateColumns(newColumns);
        setSavedFilters({...savedFilters, [index]: filterType});
      }};
    });
  }, [stateColumns, setStateColumns, savedFilters]);

  const {getTableProps, getTableBodyProps, headerGroups, page, rows, prepareRow, canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage} = useTable(
    {columns, data, defaultColumn, initalState: {pageIndex: 1}, filterTypes, autoResetPage: !skipPageResetRef,
      autoResetSortBy: !skipPageResetRef,
      autoResetFilters: !skipPageResetRef,
      autoResetSelectedRows: !skipPageResetRef},
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    useCreateCheckboxes,
  );

  return (
    <div id='top-level-table-wrapper' style={{position: 'relative'}}>
      <TableContainer>
        <Table component='div' size='small' {...getTableProps()} style={{tableLayout: 'auto'}}>
          <MuiHead headerGroups={headerGroups} />
          <MuiBody rows={page || rows} getTableBodyProps={getTableBodyProps} prepareRow={prepareRow} />
        </Table>
      </TableContainer>
      {props.includePagination && <MuiPagination {...{canNextPage, pageOptions, pageCount, gotoPage, nextPage, previousPage, canPreviousPage}} />}
    </div>
  );
};

MuiTable.propTypes = {
  /** Property defines the columns that will be displayed in the table and the settings that should apply to each column. */
  columns: PropTypes.arrayOf(PropTypes.shape({
    /** Property that controls the header and data to be displayed in each column. Will be used as the table header by default; but can be overwritten by more descriptive `Header` property. */
    accessor: PropTypes.string.isRequired,
    /** Overwrites default `accessor` title used in the table header. */
    Header: PropTypes.string,
    /** Defaults to `false`. If set to `true`, the sorting for this column will be disabled. */
    disableSortBy: PropTypes.bool,
    /** Used to compare 2 rows of data and order them correctly. String options include: `basic`, `datetime`, and `alphanumeric`. Defaults to `alphanumeric`. If a function is passed, it **must** be memoized. **Function signature**: `(rowA: <Row>, rowB: <Row>, columnID: String, desc: Bool) => return 1 || -1`. */ //eslint-disable-line
    sortType: PropTypes.oneOfType([
      PropTypes.oneOf(['alphanumeric', 'basic', 'datetime']),
      PropTypes.func,
    ]),
    /** Data type: 'boolean', 'numeric', 'date', 'currency' */
    type: PropTypes.string,
    /** **Default: 'MM/DD/YYYY'.** Used to format date data types. Takes a string of tokens and replaces them with their corresponding values. See <a href='https://momentjs.com/docs/#/displaying/format/' target='_blank'>Moment.js Format Docs</a> for details. */ //eslint-disable-line
    typeDateFormat: PropTypes.string,
    /** The name of the filter method to apply to the column. */
    filter: PropTypes.string,
    /** An object mimicking a circular linked list. Calling '.next()' should iterate over each filterType option cyclically */
    filterTypes: PropTypes.shape({'filter1': PropTypes.shape({next: 'filter2'}), 'filter2': PropTypes.shape({next: 'filter1'})}),
  })).isRequired,
  /** The data to be shown by the table. Keys must match the 'accessor' of their coresponding column. */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** If 'true', shows icons responsible for controlling table paging. */
  includePagination: PropTypes.bool,
};
// export default MuiTable;


const MuiExample = () => {
  const [mockData, setData] = useState([
    {'id': 1, 'active': true, 'name': 'Chloette Manton', 'dateCreated': new Date('12/24/2019'), 'gender': 'Female', 'income': 23463.64},
    {'id': 2, 'active': true, 'name': 'Brnaby Elvins', 'dateCreated': new Date('10/22/2019'), 'gender': 'Male', 'income': 19518.39},
    {'id': 3, 'active': true, 'name': 'Ruben Ledstone', 'dateCreated': new Date('2/10/2019'), 'gender': 'Male', 'income': 37733.55},
    {'id': 4, 'active': true, 'name': 'Hetty Schafer', 'dateCreated': new Date('12/9/2019'), 'gender': 'Female', 'income': 76929.64},
    {'id': 5, 'active': true, 'name': 'Alix Temblett', 'dateCreated': new Date('7/10/2019'), 'gender': 'Male', 'income': 63880.22},
    {'id': 6, 'active': false, 'name': 'Finlay Percifer', 'dateCreated': new Date('2/20/2019'), 'gender': 'Male', 'income': 36163.74},
    {'id': 7, 'active': true, 'name': 'Huberto Ilyin', 'dateCreated': new Date('8/1/2019'), 'gender': 'Male', 'income': 88836.8},
    {'id': 8, 'active': true, 'name': 'Noah Dawtre', 'dateCreated': new Date('2/1/2019'), 'gender': 'Male', 'income': 73037.63},
    {'id': 9, 'active': false, 'name': 'Barby Dunnet', 'dateCreated': new Date('8/29/2019'), 'gender': 'Female', 'income': 11481.06},
    {'id': 10, 'active': true, 'name': 'Christian Sapey', 'dateCreated': new Date('8/5/2019'), 'gender': 'Male', 'income': 40824.28},
    {'id': 11, 'active': true, 'name': 'Elaina Dibnah', 'dateCreated': new Date('5/18/2019'), 'gender': 'Female', 'income': 18682.23},
    {'id': 12, 'active': false, 'name': 'Cristy Lacaze', 'dateCreated': new Date('10/26/2019'), 'gender': 'Female', 'income': 69895.22},
    {'id': 13, 'active': false, 'name': 'Alfonso Bayley', 'dateCreated': new Date('6/7/2019'), 'gender': 'Male', 'income': 89453.11},
    {'id': 14, 'active': false, 'name': 'Bronny Turvey', 'dateCreated': new Date('9/13/2019'), 'gender': 'Male', 'income': 76313.46},
    {'id': 15, 'active': false, 'name': 'Durand Belly', 'dateCreated': new Date('6/25/2019'), 'gender': 'Male', 'income': 59854.94},
    {'id': 16, 'active': true, 'name': 'Petr Southouse', 'dateCreated': new Date('9/26/2019'), 'gender': 'Male', 'income': 9186.34},
    {'id': 17, 'active': false, 'name': 'Carmelia Bigley', 'dateCreated': new Date('7/28/2019'), 'gender': 'Female', 'income': 2153.78},
    {'id': 18, 'active': true, 'name': 'Leonanie Mohammad', 'dateCreated': new Date('10/25/2019'), 'gender': 'Female', 'income': 42177.98},
    {'id': 19, 'active': false, 'name': 'Genevra Bezemer', 'dateCreated': new Date('4/26/2019'), 'gender': 'Female', 'income': 77570.29},
    {'id': 20, 'active': false, 'name': 'Marlane Gaisford', 'dateCreated': new Date('9/11/2019'), 'gender': 'Female', 'income': 50463.95},
  ]);
  return (
    <>
      <button onClick={() => setData([...mockData, {'id': mockData.length + 1, 'active': true, 'name': 'Chloette Manton', 'dateCreated': new Date('12/24/2019'), 'gender': 'Female', 'income': 23463.64}])}>Add Row</button>
      <MuiTable
        data={mockData}
        columns={[
          {accessor: 'id', Header: 'Id', type: 'numeric'},
          {accessor: 'active', Header: 'Active', type: 'boolean', disableFilters: true},
          {accessor: 'name', Header: 'Name', type: 'string', filter: 'startsWith', filterTypes: {
            text: {next: 'startsWith'},
            startsWith: {next: 'text'},
          }},
          {accessor: 'dateCreated', Header: 'Date Created', type: 'date', typeDateFormat: 'YYYY/MM/DD', sortType: 'datetime', filter: 'dateRange'},
          {accessor: 'dateCreated', id: 'Day', Header: 'Day', type: 'date', typeDateFormat: 'dddd', disableSortBy: true},
          {accessor: 'gender', Header: 'Gender', type: 'string'},
          {accessor: 'income', Header: 'Income', type: 'currency'},
        ]}
        includePagination={true}
      />
    </>
  );
}
;
export default MuiExample
;
