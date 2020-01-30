import React from 'react';
import PropTypes from 'prop-types';
import {TableCell} from '@material-ui/core';


const TableHeadCell = (props) => {
  const {column} = props;
  return (
    <TableCell {...column.getHeaderProps()}>
      {column.render('Header')}
    </TableCell>
  );
};

TableHeadCell.propTypes = {
  column: PropTypes.object.isRequired,
};
export default TableHeadCell;
