import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {TableCell} from '@material-ui/core';

const SelectRowCell = ({padLeft, padRight, render}) => {
  const tableCellProps = useMemo(() => ({
    style: {padding: '5px'},
  }), []);

  return (
    <TableCell {...tableCellProps}>
      <div style={{display: 'flex'}}>
        <span style={{paddingLeft: padLeft}} />
        <div>{render}</div>
        <span style={{paddingRight: padRight}} />
      </div>
    </TableCell>
  );
};

SelectRowCell.propTypes = {
  padLeft: PropTypes.string.isRequired,
  padRight: PropTypes.string.isRequired,
  render: PropTypes.object.isRequired,
};
export default React.memo(SelectRowCell);
