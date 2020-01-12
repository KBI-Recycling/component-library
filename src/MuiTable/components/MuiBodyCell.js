import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Typography, TableCell} from '@material-ui/core';
import {Check, Close} from '@material-ui/icons';
import moment from 'moment';

const MuiBodyCell = (props) => {
  const {field, type} = props;
  const typographyProps = useMemo(() => ({
    align: 'left',
    noWrap: true,
    variant: 'body1',
    style: {
      lineHeight: 1,
    },
  }), []);
  if (type === 'boolean') {
    return <TableCell>
      {field ? <Check /> : <Close />}
    </TableCell>;
  }
  if (type === 'numeric') {
    return <TableCell>
      <Typography {...typographyProps}>{field.toLocaleString()}</Typography>
    </TableCell>;
  }
  if (type === 'date') {
    return <TableCell>
      <Typography {...typographyProps}>{moment(field).format('MM/DD/YYYY')}</Typography>
    </TableCell>;
  }
  if (type === 'currency') {
    return <TableCell>
      <Typography {...typographyProps}>{field.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</Typography>
    </TableCell>;
  }
  return (
    <TableCell>
      <Typography {...typographyProps}>{field}</Typography>
    </TableCell>
  );
};

MuiBodyCell.propTypes = {
  field: PropTypes.string,
  type: PropTypes.oneOf(['boolean', 'numeric', 'date', 'currency']),
};
export default MuiBodyCell;
