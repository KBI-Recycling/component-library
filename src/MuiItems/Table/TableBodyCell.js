import React from 'react';
import PropTypes from 'prop-types';
import {TableCell} from '@material-ui/core';
import {Check, Close} from '@material-ui/icons';
import moment from 'moment';


const TableBodyCell = (props) => {
  const {cell} = props;
  return (
    <TableCell {...cell.getCellProps()}>
      {cell.render((({cell}) => {
        if (cell.column.type === 'boolean') {
          return cell.value ? <Check /> : <Close />;
        }
        if (cell.column.type === 'currency') {
          return cell.value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        }
        if (cell.column.type === 'datetime') {
          const datetimeFormat = cell.column?.datetimeFormat ? cell.column.datetimeFormat : 'MM/DD/YYYY';
          return moment(cell.value).format(datetimeFormat);
        }
        if (cell.column.type === 'numeric') {
          return Number(cell.value).toLocaleString();
        }
        return String(cell.value);
      }))}
    </TableCell>
  );
};

TableBodyCell.propTypes = {
  cell: PropTypes.object.isRequired,
};
export default TableBodyCell;
