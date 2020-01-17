import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, Typography} from '@material-ui/core';
import {Check, Close} from '@material-ui/icons';
import {useTable, useSortBy, useBlockLayout, useFlexLayout} from 'react-table';
import moment from 'moment';
import {FixedSizeList} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
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
let height = window.innerHeight;
let width = window.innerWidth;
const reportWindowSize = () => {
  console.log('Height: ', window.innerHeight);
  console.log('Width: ', window.innerWidth);
  height = window.innerHeight;
  width = window.innerWidth;
};

window.onresize = reportWindowSize;

const MuiTable = (props) => {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
    }),
    [],
  );
  const data = useMemo(() => {
    return props.data;
  }, [props.data]);
  const columns = useMemo(() => {
    return props.columns.map(column => {
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
      return column;
    });
  }, [props.columns]);
  const {getTableProps, getTableBodyProps, headerGroups, rows, totalColumnsWidth, prepareRow} = useTable({columns, data, defaultColumn}, useSortBy, useFlexLayout);

  const RenderRow = React.useCallback(
    ({index, style}) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <TableRow component='div' {...row.getRowProps({style})}>
          {row.cells.map(cell => (
            <TableCell component='div' {...cell.getCellProps()}>
              <Typography noWrap={true}>{cell.render('Cell')}</Typography>  {/* noWrap === {text-overflow: ellipsis}  */}
            </TableCell>
          ))}
        </TableRow>
      );
    },
    [prepareRow, rows],
  );
  // console.log(document.getElementById('top-level-table-wrapper')?.offsetWidth);
  console.log(height, width); // Where does column width come from? header cells and body cells seemingly do not share a width.
  return (
    <div id='top-level-table-wrapper' style={{overflowX: 'scroll'}}>
      <Table size='small' {...getTableProps()} style={{tableLayout: 'auto'}}>
        <TableHead component='div'>
          {headerGroups.map(headerGroup => (
            <TableRow component='div' {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell component='div' {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {!column.disableSortBy && <TableSortLabel active={column.isSorted} direction={column.isSortedDesc ? 'desc' : 'asc'} />}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody component='div' {...getTableBodyProps()}>
          <FixedSizeList
            height={400}
            itemCount={rows.length}
            itemSize={35}
            width={totalColumnsWidth} // this is the total width of the table (duh)
          >
            {RenderRow}
          </FixedSizeList>
        </TableBody>
      </Table>
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

  })).isRequired,
  data: PropTypes.array.isRequired,
};
export default MuiTable;
