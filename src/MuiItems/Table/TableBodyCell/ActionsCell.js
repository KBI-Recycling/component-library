import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {ButtonGroup, Button, TableCell, Tooltip} from '@material-ui/core';

const ActionsCell = ({cell}) => {
  const actionsButtonStyle = useMemo(() => ({
    border: '0px',
    padding: '4px 0px 0px 0px',
  }), []);
  const tableCellProps = useMemo(() => ({
    style: {padding: '0px'},
  }), []);

  return (
    <TableCell {...tableCellProps}>
      <ButtonGroup size='small'>
        {cell.column.actions.map((action, i) => {
          const Icon = action.icon;
          if (!action?.tooltip) return <Button style={actionsButtonStyle} onClick={event => action.onClick({event})}><Icon /></Button>;
          return (
            <Tooltip key={action.tooltip} title={action.tooltip}>
              <Button style={actionsButtonStyle} onClick={event => action.onClick({event, rowData: cell.row.original, rowIndex: cell.row.index})}>
                <Icon />
              </Button>
            </Tooltip>
          );
        })}
      </ButtonGroup>
    </TableCell>
  );
};

ActionsCell.propTypes = {
  cell: PropTypes.object.isRequired,
};
export default React.memo(ActionsCell);
