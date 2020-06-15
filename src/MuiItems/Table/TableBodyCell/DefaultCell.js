import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {TableCell, Typography} from '@material-ui/core';

const DefaultCell = ({padLeft, padRight, maxWidth, value, wrapBodyText}) => {
  const tableCellProps = useMemo(() => ({
    style: {
      maxWidth: `${maxWidth}px`,
      padding: '5px',
    },
  }), [maxWidth]);
  const typoProps = useMemo(() => ({
    style: {whiteSpace: wrapBodyText || 'nowrap'},
    variant: 'body2',
  }), [wrapBodyText]);

  return (
    <TableCell {...tableCellProps}>
      <div style={{display: 'flex'}}>
        <span style={{paddingLeft: padLeft}} />
        {!value && <Typography>{''}</Typography>}
        {value && <Typography {...typoProps}>{String(value)}</Typography>}
        <span style={{paddingRight: padRight}} />
      </div>
    </TableCell>
  );
};

DefaultCell.defaultProps = {
  maxWidth: 9007199254740991,
};
DefaultCell.propTypes = {
  maxWidth: PropTypes.string,
  padLeft: PropTypes.string.isRequired,
  padRight: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  wrapBodyText: PropTypes.bool,
};
export default React.memo(DefaultCell);
