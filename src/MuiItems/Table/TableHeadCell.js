import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {TableCell, TableSortLabel} from '@material-ui/core';


const TableHeadCell = (props) => {
  const {column} = props;
  const tableCellProps = useMemo(() => ({
    style: {
      cursor: column.canSort ? 'pointer' : 'inherit',
      whiteSpace: column.wrapHeadText || 'nowrap',
    },
  }), [column.canSort, column.wrapHeadText]);

  return (
    <TableCell {...column.getHeaderProps(column.getSortByToggleProps())} {...tableCellProps}>
      {column.render('Header')}
      {column.canSort && <TableSortLabel active={column.isSorted} direction={column.isSortedDesc ? 'desc' : 'asc'} />}
    </TableCell>
  );
};

TableHeadCell.propTypes = {
  column: PropTypes.object.isRequired,
};
export default TableHeadCell;
