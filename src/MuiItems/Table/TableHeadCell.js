import React from 'react';
import PropTypes from 'prop-types';
import {TableCell, TableSortLabel} from '@material-ui/core';


const TableHeadCell = (props) => {
  const {column} = props;
  return (
    <TableCell {...column.getHeaderProps(column.getSortByToggleProps())} style={{cursor: 'pointer', whiteSpace: 'nowrap'}}>
      {column.render('Header')}
      <TableSortLabel active={column.isSorted} direction={column.isSortedDesc ? 'desc' : 'asc'} />
    </TableCell>
  );
};

TableHeadCell.propTypes = {
  column: PropTypes.object.isRequired,
};
export default TableHeadCell;
