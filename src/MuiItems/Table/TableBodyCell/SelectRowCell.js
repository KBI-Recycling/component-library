import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {TableCell} from '@material-ui/core';

const SelectRowCell = ({render}) => {
  const tableCellProps = useMemo(() => ({
    style: {padding: '0px'},
  }), []);

  return (
    <TableCell {...tableCellProps}>
      <div>{render}</div>
    </TableCell>
  );
};

SelectRowCell.propTypes = {
  render: PropTypes.func.isRequired,
};
export default React.memo(SelectRowCell);
