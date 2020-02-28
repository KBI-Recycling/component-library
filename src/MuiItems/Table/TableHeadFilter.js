import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {TableCell} from '@material-ui/core';


const TableHeadFilter = ({column, columnIndex, headers, rowEdgePadding}) => {
  const tableCellProps = useMemo(() => ({
    style: {padding: '5px'},
  }), []);

  return (
    <TableCell {...column.getHeaderProps()} {...tableCellProps}>
      <div style={{display: 'flex'}}>
        <span style={{paddingLeft: columnIndex === 0 ? rowEdgePadding : '0px'}} />
        {column.canFilter ? column.render('Filter') : null}
        <span style={{paddingRight: columnIndex + 1 === headers.length ? rowEdgePadding : '0px'}} />
      </div>
    </TableCell>
  );
};

TableHeadFilter.propTypes = {
  column: PropTypes.object.isRequired,
  columnIndex: PropTypes.number.isRequired,
  headers: PropTypes.array.isRequired,
  rowEdgePadding: PropTypes.string.isRequired,
};
export default TableHeadFilter;
