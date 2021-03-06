import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {TableCell, Typography} from '@material-ui/core';

const BooleanCell = ({padLeft, padRight, value, wrapBodyText}) => {
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
        <Typography {...typoProps}>{value ? 'True' : 'False'}</Typography>
        <span style={{paddingRight: padRight}} />
      </div>
    </TableCell>
  );
};

BooleanCell.propTypes = {
  padLeft: PropTypes.string.isRequired,
  padRight: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  wrapBodyText: PropTypes.bool,
};
export default React.memo(BooleanCell);
