import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {ButtonGroup, Button, TableCell, Tooltip} from '@material-ui/core';

const ActionsCell = ({cell, padLeft, padRight}) => {
  const actionsButtonStyle = useMemo(() => ({
    border: '0px',
    padding: '4px 0px 0px 0px',
  }), []);
  const tableCellProps = useMemo(() => ({
    style: {padding: '0px'},
  }), []);

  return (
    <TableCell {...tableCellProps}>
      <span style={{paddingLeft: padLeft}} />
      <ButtonGroup size='small'>
        {cell.column.actions.map((action, i) => {
          if (typeof action === 'function') action = action(cell.row.original);
          const Icon = action.icon;
          if (action?.hide) return null;
          if (action?.disabled) return <Button key={action.tooltip} style={actionsButtonStyle} disabled onClick={event => action.onClick({event})}><Icon /></Button>;
          if (!action?.tooltip) return <Button key={action.tooltip} style={actionsButtonStyle} onClick={event => action.onClick({event})}><Icon /></Button>;
          return (
            <Tooltip key={action.tooltip} title={action.tooltip}>
              <Button style={actionsButtonStyle} onClick={event => action.onClick({event, rowData: cell.row.original, rowIndex: cell.row.index})}>
                <Icon />
              </Button>
            </Tooltip>
          );
        })}
      </ButtonGroup>
      <span style={{paddingRight: padRight}} />
    </TableCell>
  );
};

ActionsCell.propTypes = {
  cell: PropTypes.object.isRequired,
  padLeft: PropTypes.string.isRequired,
  padRight: PropTypes.string.isRequired,
};
export default React.memo(ActionsCell);
