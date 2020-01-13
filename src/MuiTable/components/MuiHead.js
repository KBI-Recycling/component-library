import React from 'react';
import PropTypes from 'prop-types';
import {TableHead, TableRow} from '@material-ui/core';
import MuiHeadCell from './MuiHeadCell';

const MuiHead = (props) => {
  const {columns} = props;
  return (
    <TableHead component='div'>
      <TableRow component='div'>
        {columns.map((column, index) => <MuiHeadCell key={index} {...column} />)}
      </TableRow>
    </TableHead>
  );
};

MuiHead.defaultProps = {
  noWrap: true,
};
MuiHead.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string.isRequired,
    title: PropTypes.string,
    noWrapHead: PropTypes.bool,
    noWrapBody: PropTypes.bool,
  })).isRequired,
};
export default MuiHead;
