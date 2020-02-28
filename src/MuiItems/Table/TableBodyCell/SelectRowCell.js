import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {TableCell} from '@material-ui/core';

const SelectRowCell = ({render}) => {
  const tableCellProps = useMemo(() => ({
    style: {padding: '5px'},
  }), []);

  return (
    <TableCell {...tableCellProps}>
      <div>{render}</div>
    </TableCell>
  );
};

SelectRowCell.propTypes = {
  render: PropTypes.object.isRequired,
};
export default React.memo(SelectRowCell);
