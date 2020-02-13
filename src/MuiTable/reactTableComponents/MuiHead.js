import React from 'react';
import PropTypes from 'prop-types';
import {TableHead, TableRow} from '@material-ui/core';
import MuiHeadCell from './MuiHeadCell';

const MuiHead2 = (props) => {
  const {headerGroups} = props;
  console.log(headerGroups);
  return (
    <TableHead component='div'>
      {headerGroups.map(headerGroup => {
        // console.log('headerGroup', headerGroup);
        return (
          <TableRow component='div' {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => {
              // console.log('column', column);
              return (<MuiHeadCell key={index} column={column} />)
              ;
            })}
          </TableRow>
        )
        ;
      })}
    </TableHead>
  );
};

MuiHead2.defaultProps = {
  noWrap: true,
};
MuiHead2.propTypes = {
  headerGroups: PropTypes.arrayOf(PropTypes.shape({
    getHeaderGroupProps: PropTypes.func.isRequired,
  })).isRequired,
};
export default MuiHead2;
