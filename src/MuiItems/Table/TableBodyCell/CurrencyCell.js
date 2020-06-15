import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {TableCell, Typography} from '@material-ui/core';

const CurrencyCell = ({maxWidth, padLeft, padRight, value, wrapBodyText}) => {
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
        <Typography {...typoProps}>{value.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</Typography>
        <span style={{paddingRight: padRight}} />
      </div>
    </TableCell>
  );
};

CurrencyCell.defaultProps = {
  maxWidth: 9007199254740991,
};
CurrencyCell.propTypes = {
  maxWidth: PropTypes.string,
  padLeft: PropTypes.string.isRequired,
  padRight: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  wrapBodyText: PropTypes.bool,
};
export default React.memo(CurrencyCell);
