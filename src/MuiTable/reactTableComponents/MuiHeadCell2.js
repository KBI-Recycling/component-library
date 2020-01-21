import React from 'react';
import PropTypes from 'prop-types';
import {Typography, TableCell, TableSortLabel} from '@material-ui/core';

const MuiHeadCell = (props) => {
  const {noWrapHead, column} = props;
  return (
    <TableCell component='div' {...column.getHeaderProps(column.getSortByToggleProps())}>
      <Typography noWrap={noWrapHead}>
        {column.render('Header')}
      </Typography>
      {!column.disableSortBy && <TableSortLabel active={column.isSorted} direction={column.isSortedDesc ? 'desc' : 'asc'} />}
    </TableCell>
  );
};

MuiHeadCell.defaultProps = {
  noWrapHead: false,
};
MuiHeadCell.propTypes = {
  column: PropTypes.object,
  noWrapHead: PropTypes.bool,
};
export default React.memo(MuiHeadCell);
