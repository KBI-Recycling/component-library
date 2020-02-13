import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Typography, TableCell} from '@material-ui/core';

const MuiBodyCell = ({cell}) => {
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
      <Typography component='div' {...typographyProps}>{cell.render('Cell')}</Typography>
    </TableCell>
  );
};

MuiBodyCell.propTypes = {
  cell: PropTypes.shape({
    getCellProps: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
  }).isRequired,
};
export default React.memo(MuiBodyCell);
