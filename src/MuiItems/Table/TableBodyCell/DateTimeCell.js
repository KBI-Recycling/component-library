import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {TableCell, Typography} from '@material-ui/core';
import moment from 'moment';

const DateTimeCell = ({datetimeFormat, value, wrapBodyText}) => {
  const tableCellProps = useMemo(() => ({
    style: {padding: '5px'},
  }), []);
  const typoProps = useMemo(() => ({
    style: {whiteSpace: wrapBodyText || 'nowrap'},
    variant: 'body2',
  }), [wrapBodyText]);

  return (
    <TableCell {...tableCellProps}>
      <Typography {...typoProps}>
        {moment(value).format(datetimeFormat || 'MM/DD/YYYY')}
      </Typography>
    </TableCell>
  );
};

DateTimeCell.propTypes = {
  datetimeFormat: PropTypes.string,
  value: PropTypes.string.isRequired,
  wrapBodyText: PropTypes.bool,
};
export default React.memo(DateTimeCell);
