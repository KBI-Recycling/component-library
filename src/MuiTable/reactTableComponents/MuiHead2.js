import React from 'react';
import PropTypes from 'prop-types';
import {TableHead, TableRow} from '@material-ui/core';
import MuiHeadCell from './MuiHeadCell2';

const MuiHead2 = (props) => {
  const {headerGroups} = props;
  return (
    <TableHead component='div'>
      {headerGroups.map(headerGroup => (
        <TableRow component='div' {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column, index) => <MuiHeadCell key={index} column={column} />)}
        </TableRow>
      ))}
    </TableHead>
  );
};

MuiHead2.defaultProps = {
  noWrap: true,
};
MuiHead2.propTypes = {
  headerGroups: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string.isRequired,
    title: PropTypes.string,
    noWrapHead: PropTypes.bool,
    noWrapBody: PropTypes.bool,
  })).isRequired,
};
export default MuiHead2;
