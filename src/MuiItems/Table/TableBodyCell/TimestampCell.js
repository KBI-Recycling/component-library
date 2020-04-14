import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {TableCell, Typography} from '@material-ui/core';
import moment from 'moment';

const TimestampCell = ({datetimeFormat, padLeft, padRight, value, wrapBodyText}) => {
  const typoProps = useMemo(() => ({
    style: {whiteSpace: wrapBodyText || 'nowrap'},
    variant: 'body2',
  }), [wrapBodyText]);

  return (
    <TableCell style={{padding: '5px'}}>
      <div style={{display: 'flex'}}>
        <span style={{paddingLeft: padLeft}} />
        {
          typeof value === 'number' && moment.unix(value).isValid() ? // Check for type 'number' else all falsey values convert to unix epoch
            <Typography {...typoProps}>{moment.unix(value).format(datetimeFormat || 'MM/DD/YYYY')}</Typography> :
            <Typography {...typoProps}>{''}</Typography>
        }
        <span style={{paddingRight: padRight}} />
      </div>
    </TableCell>
  );
};

TimestampCell.propTypes = {
  padLeft: PropTypes.string.isRequired,
  padRight: PropTypes.string.isRequired,
  datetimeFormat: PropTypes.string,
  value: PropTypes.number,
  wrapBodyText: PropTypes.bool,
};
export default React.memo(TimestampCell);
