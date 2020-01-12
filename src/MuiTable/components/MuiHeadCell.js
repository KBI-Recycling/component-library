import React from 'react';
import PropTypes from 'prop-types';
import {Typography, TableCell} from '@material-ui/core';

const MuiHeadCell = (props) => {
  const {field, title, noWrap} = props;
  return (
    <TableCell key={field}>
      <Typography noWrap={noWrap}>{title || field}</Typography>
    </TableCell>
  );
};

MuiHeadCell.defaultProps = {
  noWrap: true,
};
MuiHeadCell.propTypes = {
  field: PropTypes.string.isRequired,
  title: PropTypes.string,
  noWrap: PropTypes.bool,
};
export default MuiHeadCell;
