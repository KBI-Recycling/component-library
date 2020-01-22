import React from 'react';
import PropTypes from 'prop-types';
import {Typography, TableCell, TableSortLabel, TextField, InputAdornment} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

const MuiHeadCell = (props) => {
  const {noWrapHead, column} = props;
  return (
    <TableCell component='div' {...column.getHeaderProps(column.getSortByToggleProps())}>
      <Typography noWrap={noWrapHead}>
        {column.render('Header')}
        {!column.disableSortBy && <TableSortLabel active={column.isSorted} direction={column.isSortedDesc ? 'desc' : 'asc'} />}
      </Typography>
      <div>{column.canFilter ? column.render('Filter') : null}</div>
    </TableCell>
  );
};

MuiHeadCell.defaultProps = {
  noWrapHead: true,
};
MuiHeadCell.propTypes = {
  column: PropTypes.object,
  noWrapHead: PropTypes.bool,
};
export default MuiHeadCell;
