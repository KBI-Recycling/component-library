import React from 'react';
import PropTypes from 'prop-types';
import {TableContainer, Table} from '@material-ui/core';
import MuiHead from './components/MuiHead';
import MuiBody from './components/MuiBody';

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
  const {columns, data} = props;
  return (
    <TableContainer>
      <Table size="small">
        <MuiHead columns={columns} />
        <MuiBody columns={columns} data={data} />
      </Table>
    </TableContainer>
  );
};

MuiTable.propTypes = {
  /** Property defines the columns that will be displayed in the table and the settings that should apply to each column. */
  columns: PropTypes.arrayOf(PropTypes.shape({
    /** Property that controls the header and data to be displayed in each column. Will be used in the table header by default; but can be overwritten by more descriptive `title` property. */
    field: PropTypes.string.isRequired,
    /** Overwrites default `field` text used in the table header. */
    title: PropTypes.string,
    /** Default: `true`. If `true`, longer text will NOT be wrapped in the column's header cell. If `false`, longer text will be wrapped, per standard browser rules. */
    noWrapHead: PropTypes.bool,
    /** Default: `false`. If `true`, longer text will NOT be wrapped in the column's body cell. If `false`, longer text will be wrapped, per standard browser rules. */
    noWrapBody: PropTypes.bool,
  })).isRequired,
  data: PropTypes.array.isRequired,
};
export default MuiTable;
