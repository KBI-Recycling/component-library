import React from 'react';
import PropTypes from 'prop-types';
import {TableContainer, Table, TableFooter, TableRow, TablePagination} from '@material-ui/core';
import MuiHead from '../MuiTable/components/MuiHead';
import MuiBodyRow from '../MuiTable/components/MuiBody';
import TablePaginationActions from '../MuiTable/components/TablePaginationActions';

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

const MobileTable = (props) => {
  const {columns, data, height} = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  console.log('MobileTable');
  return (

    <TableContainer style={{height}}>
      <Table component='div' size='small'>
        <MuiHead columns={columns} />
        <MuiBodyRow columns={columns} data={(rowsPerPage > 0 ?
          data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :
          data
        )} />
        <TablePaginationActions
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
        />
      </Table>
    </TableContainer>

  );
};

MobileTable.propTypes = {
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
  /** Default: 'medium'. Affects the height and padding of table cells. */
  size: PropTypes.oneOf(['small', 'medium']),
};
export default MobileTable;

/*
<TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, {label: 'All', value: -1}]}
              colSpan={3}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {'aria-label': 'rows per page'},
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
        */
