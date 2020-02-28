import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {TableCell, Typography} from '@material-ui/core';

const NumericCell = ({padLeft, padRight, value, wrapBodyText}) => {
  const tableCellProps = useMemo(() => ({
    style: {padding: '5px'},
  }), []);
  const typoProps = useMemo(() => ({
    style: {whiteSpace: wrapBodyText || 'nowrap'},
    variant: 'body2',
  }), [wrapBodyText]);

  return (
    <TableCell {...tableCellProps}>
      <div style={{display: 'flex'}}>
        <span style={{paddingLeft: padLeft}} />
        <Typography {...typoProps}>{Number(value).toLocaleString()}</Typography>
        <span style={{paddingRight: padRight}} />
      </div>
    </TableCell>
  );
};

NumericCell.propTypes = {
  padLeft: PropTypes.string.isRequired,
  padRight: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  wrapBodyText: PropTypes.bool,
};
export default React.memo(NumericCell);
