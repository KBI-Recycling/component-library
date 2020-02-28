import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {TableCell} from '@material-ui/core';


const TableHeadFilter = ({column, headers, rowEdgePadding}) => {
  const tableCellProps = useMemo(() => ({
    style: {padding: '5px'},
  }), []);

  return (
    <TableCell {...column.getHeaderProps()} {...tableCellProps}>
      <div style={{display: 'flex'}}>
        <span style={{paddingLeft: column.index === 0 ? rowEdgePadding : '0px'}} />
        {column.canFilter ? column.render('Filter') : null}
        <span style={{paddingRight: column.index + 1 === headers.length ? rowEdgePadding : '0px'}} />
      </div>
    </TableCell>
  );
};

TableHeadFilter.propTypes = {
  column: PropTypes.object.isRequired,
  headers: PropTypes.object.isRequired,
  rowEdgePadding: PropTypes.string.isRequired,
};
export default TableHeadFilter;
