import React from 'react';
import PropTypes from 'prop-types';
import {TableCell} from '@material-ui/core';


const TableHeadFilter = (props) => {
  const {column} = props;
  return (
    <TableCell {...column.getHeaderProps()} style={{padding: '0px'}}>
      {column.canFilter ? column.render('Filter') : null}
    </TableCell>
  );
};

TableHeadFilter.propTypes = {
  column: PropTypes.object.isRequired,
};
export default TableHeadFilter;
