import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {TableCell, TableSortLabel, Typography} from '@material-ui/core';


const TableHeadCell = ({column, headers, rowEdgePadding}) => {
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
        <div style={{display: 'flex'}}>
          <span style={{paddingLeft: column.index === 0 ? rowEdgePadding : '0px'}} />
          {column.render('Header')}
          <span style={{paddingRight: column.index + 1 === headers.length ? rowEdgePadding : '0px'}} />
        </div>
      </TableCell>
    );
  }
  return (
    <TableCell {...column.getHeaderProps(column.getSortByToggleProps())} {...tableCellProps}>
      <div style={{display: 'flex'}}>
        <span style={{paddingLeft: column.index === 0 ? rowEdgePadding : '0px'}} />
        <Typography {...typographyProps}>{column.render('Header')}</Typography>
        {column.canSort && <TableSortLabel {...sortLabelProps} />}
        <span style={{paddingRight: column.index + 1 === headers.length ? rowEdgePadding : '0px'}} />
      </div>
    </TableCell>
  );
};

TableHeadCell.propTypes = {
  column: PropTypes.object.isRequired,
  headers: PropTypes.object.isRequired,
  rowEdgePadding: PropTypes.string.isRequired,
};
export default TableHeadCell;
