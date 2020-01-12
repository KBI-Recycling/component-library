import React from 'react';
import PropTypes from 'prop-types';
import {Typography, TableCell} from '@material-ui/core';

const MuiHeadCell = (props) => {
  const {field, title, noWrapHead} = props;
  return (
    <TableCell>
      <Typography noWrap={noWrapHead}>{title || field}</Typography>
    </TableCell>
  );
};

MuiHeadCell.defaultProps = {
  noWrapHead: true,
};
MuiHeadCell.propTypes = {
  field: PropTypes.string.isRequired,
  title: PropTypes.string,
  noWrapHead: PropTypes.bool,
};
export default React.memo(MuiHeadCell);
