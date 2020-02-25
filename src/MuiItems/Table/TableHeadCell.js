import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {TableCell, TableSortLabel, Typography} from '@material-ui/core';


const TableHeadCell = (props) => {
  const {column} = props;
  const tableCellProps = useMemo(() => ({
    style: {
      cursor: column.canSort ? 'pointer' : 'inherit',
      lineHeight: 1,
      padding: '5px',
      whiteSpace: column.wrapHeadText || 'nowrap',
    },
  }), [column.canSort, column.wrapHeadText]);
  const typographyProps = useMemo(() => ({
    style: {display: 'inline', fontWeight: 600},
    variant: 'subtitle2',
  }), []);
  const sortLabelProps = useMemo(() => ({
    active: column.isSorted,
    direction: column.isSortedDesc ? 'desc' : 'asc',
  }), [column.isSorted, column.isSortedDesc]);
  if (column.id === 'muiRowSelection') {
    return (
      <TableCell {...column.getHeaderProps()} {...tableCellProps}>
        {column.render('Header')}
      </TableCell>
    );
  }
  return (
    <TableCell {...column.getHeaderProps(column.getSortByToggleProps())} {...tableCellProps}>
      <Typography {...typographyProps}>{column.render('Header')}</Typography>
      {column.canSort && <TableSortLabel {...sortLabelProps} />}
    </TableCell>
  );
};

TableHeadCell.propTypes = {
  column: PropTypes.object.isRequired,
};
export default TableHeadCell;
