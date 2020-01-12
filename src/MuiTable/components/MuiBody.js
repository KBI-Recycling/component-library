import React from 'react';
import PropTypes from 'prop-types';
import {TableBody} from '@material-ui/core';
import MuiBodyRow from './MuiBodyRow';

const MuiBody = (props) => {
  const {columns, data} = props;
  return (
    <TableBody>
      {data.map((row, index) => <MuiBodyRow key={index} columns={columns} row={row} />)}
    </TableBody>
  );
};

MuiBody.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};
export default MuiBody;
