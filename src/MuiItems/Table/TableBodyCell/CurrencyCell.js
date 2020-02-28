import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {TableCell, Typography} from '@material-ui/core';

const CurrencyCell = ({value, wrapBodyText}) => {
  const tableCellProps = useMemo(() => ({
    style: {padding: '5px'},
  }), []);
  const typoProps = useMemo(() => ({
    style: {whiteSpace: wrapBodyText || 'nowrap'},
    variant: 'body2',
  }), [wrapBodyText]);

  return (
    <TableCell {...tableCellProps}>
      <Typography {...typoProps}>{value.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</Typography>
    </TableCell>
  );
};

CurrencyCell.propTypes = {
  value: PropTypes.number.isRequired,
  wrapBodyText: PropTypes.bool,
};
export default React.memo(CurrencyCell);
