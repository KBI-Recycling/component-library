import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {TableCell} from '@material-ui/core';


const TableHeadFilter = (props) => {
  const {column} = props;
  const tableCellProps = useMemo(() => ({
    style: {padding: '5px'},
  }), []);
  return (
    <TableCell {...column.getHeaderProps()} {...tableCellProps}>
      {column.canFilter ? column.render('Filter') : null}
    </TableCell>
  );
};

TableHeadFilter.propTypes = {
  column: PropTypes.object.isRequired,
};
export default TableHeadFilter;
