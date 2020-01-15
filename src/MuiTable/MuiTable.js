import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Table, TableHead, TableBody, TableRow, TableCell} from '@material-ui/core';
import {Check, Close} from '@material-ui/icons';
// import MuiHead from './components/MuiHead';
// import MuiBody from './components/MuiBody';
import {useTable} from 'react-table';
import moment from 'moment';

/**
 * A test component used to try out Formik components with validation.
 *
 * @version 1.0.0
 * @author [Gerry Blackmon](https://github.com/gblackiv)
 * @author [Daniel Kinsbursky](https://github.com/kbi-daniel)
 * @author [Chris Voss](https://github.com/ChrisJVoss)
 * @return {JSX} A react JSX component.
 * @public
 *
 */

const MuiTable = (props) => {
  const data = useMemo(() => {
    return props.data;
  }, [props.data]);
  const columns = useMemo(() => {
    return props.columns.map(column => {
      if (column.type === 'boolean') {
        return {...column, Cell: ({cell}) => cell.value ? <Check /> : <Close />}; //eslint-disable-line
      }
      if (column.type === 'date') {
        return {...column, Cell: ({cell}) => moment(cell.value).format(column.typeDateFormat || 'MM/DD/YYYY')};
      }
      if (column.type === 'numeric') {
        return {...column, Cell: ({cell}) => cell.value.toLocaleString()};
      }
      if (column.type === 'currency') {
        return {...column, Cell: ({cell}) => cell.value.toLocaleString('en-US', {style: 'currency', currency: 'USD'})};
      }
      return column;
    });
  }, [props.columns]);
  const {getTableProps, headerGroups, rows, prepareRow} = useTable({columns, data});

  return (
    <Table size='small' {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map(cell => (
                <TableCell {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
      {/*
      <MuiHead columns={columns} />
      <MuiBody columns={columns} data={data} />
      */}
    </Table>
  );
};

MuiTable.propTypes = {
  /** Property defines the columns that will be displayed in the table and the settings that should apply to each column. */
  columns: PropTypes.arrayOf(PropTypes.shape({
    /** Property that controls the header and data to be displayed in each column. Will be used in the table header by default; but can be overwritten by more descriptive `title` property. */
    field: PropTypes.string.isRequired,
    /** Overwrites default `field` text used in the table header. */
    title: PropTypes.string,
    /** Data type: 'boolean', 'numeric', 'date', 'currency' */
    type: PropTypes.string,
    /** **Default: 'MM/DD/YYYY'.** Used to format date data types. Takes a string of tokens and replaces them with their corresponding values. See <a href='https://momentjs.com/docs/#/displaying/format/' target='_blank'>Moment.js Format Docs</a> for details. */ //eslint-disable-line
    typeDateFormat: PropTypes.string,
    /** **Default: `true`.** If `true`, longer text will NOT be wrapped in the column's header cell. If `false`, longer text will be wrapped, per standard browser rules. */
    noWrapHead: PropTypes.bool,
    /** **Default: `false`.** If `true`, longer text will NOT be wrapped in the column's body cell. If `false`, longer text will be wrapped, per standard browser rules. */
    noWrapBody: PropTypes.bool,
  })).isRequired,
  data: PropTypes.array.isRequired,
};
export default MuiTable;
