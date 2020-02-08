import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Typography, TableCell} from '@material-ui/core';
import {Check, Close} from '@material-ui/icons';
import moment from 'moment';

const MuiBodyCell = (props) => {
  const {field, type, typeDateFormat, cell} = props;
  const typographyProps = useMemo(() => ({
    align: 'left',
    noWrap: true,
    variant: 'body1',
    style: {
      lineHeight: 1,
    },
  }), []);
  return (
    <TableCell component='div' {...cell.getCellProps()}>
      <Typography {...typographyProps}>{cell.render('Cell')}</Typography>
    </TableCell>
  );
};

MuiBodyCell.propTypes = {
  field: PropTypes.string,
  type: PropTypes.oneOf(['boolean', 'numeric', 'date', 'currency']),
  typeDateFormat: PropTypes.string,
};
export default React.memo(MuiBodyCell);