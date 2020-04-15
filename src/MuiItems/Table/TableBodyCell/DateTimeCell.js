import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {TableCell, Typography} from '@material-ui/core';
import moment from 'moment';

const DateTimeCell = ({datetimeFormat, padLeft, padRight, type, value, wrapBodyText}) => {
  const tableCellProps = useMemo(() => ({
    style: {padding: '5px'},
  }), []);
  const typoProps = useMemo(() => ({
    style: {whiteSpace: wrapBodyText || 'nowrap'},
    variant: 'body2',
  }), [wrapBodyText]);
  if (typeof value === 'function') value = value();
  if (typeof value === 'object' && type === 'timestamp') value = value.toMillis();

  return (
    <TableCell {...tableCellProps}>
      <div style={{display: 'flex'}}>
        <span style={{paddingLeft: padLeft}} />
        {moment(value).isValid() && <Typography {...typoProps}>{moment(value).format(datetimeFormat || 'MM/DD/YYYY')}</Typography>}
        {!moment(value).isValid() && <Typography {...typoProps}>{''}</Typography>}
        <span style={{paddingRight: padRight}} />
      </div>
    </TableCell>
  );
};

DateTimeCell.propTypes = {
  padLeft: PropTypes.string.isRequired,
  padRight: PropTypes.string.isRequired,
  type: PropTypes.string,
  datetimeFormat: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
    PropTypes.instanceOf(Date),
  ]),
  wrapBodyText: PropTypes.bool,
};
export default React.memo(DateTimeCell);
