import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {TableCell, Typography} from '@material-ui/core';

const DefaultCell = ({value, wrapBodyText}) => {
  const tableCellProps = useMemo(() => ({
    style: {padding: '5px'},
  }), []);
  const typoProps = useMemo(() => ({
    style: {whiteSpace: wrapBodyText || 'nowrap'},
    variant: 'body2',
  }), [wrapBodyText]);

  return (
    <TableCell {...tableCellProps}>
      <Typography {...typoProps}>{String(value)}</Typography>
    </TableCell>
  );
};

DefaultCell.propTypes = {
  value: PropTypes.string.isRequired,
  wrapBodyText: PropTypes.bool,
};
export default React.memo(DefaultCell);
