import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {ButtonGroup, Button, TableCell, Tooltip, Typography} from '@material-ui/core';
import moment from 'moment';

const TableBodyCell = (props) => {
  const {cell} = props;
  const typoProps = useMemo(() => ({
    style: {whiteSpace: cell.column.wrapBodyText || 'nowrap'},
    variant: 'caption',
  }), [cell.column.wrapBodyText]);

  return (
    <TableCell {...cell.getCellProps()}>
      {cell.render((({cell}) => {
        if (cell.column.actions) return <ActionsButtonGroup cell={cell} />;
        if (cell.column.type === 'boolean') return <Typography {...typoProps}>{cell.value ? 'True' : 'False'}</Typography>;
        if (cell.column.type === 'currency') return <Typography {...typoProps}>{cell.value.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</Typography>;
        if (cell.column.type === 'datetime') return <Typography {...typoProps}>{moment(cell.value).format(cell.column?.datetimeFormat ? cell.column.datetimeFormat : 'MM/DD/YYYY')}</Typography>;
        if (cell.column.type === 'numeric') return <Typography {...typoProps}>{Number(cell.value).toLocaleString()}</Typography>;
        return <Typography {...typoProps}>{String(cell.value)}</Typography>;
      }))}
    </TableCell>
  );
};

TableBodyCell.propTypes = {
  cell: PropTypes.object.isRequired,
};
export default TableBodyCell;

const ActionsButtonGroup = ({cell}) => {
  const actionsButtonStyle = useMemo(() => ({
    border: '0px',
    padding: '0px',
  }), []);

  return (
    <ButtonGroup size='small'>
      {cell.column.actions.map((action, i) => {
        const Icon = action.icon;
        if (!action?.tooltip) return <Button style={actionsButtonStyle} onClick={event => action.onClick({event})}><Icon /></Button>;
        return (
          <Tooltip key={i} title={action.tooltip}>
            <Button style={actionsButtonStyle} onClick={event => action.onClick({event, rowData: cell.row.original, rowIndex: cell.row.index})}>
              <Icon />
            </Button>
          </Tooltip>
        );
      })}
    </ButtonGroup>
  );
};
ActionsButtonGroup.propTypes = {
  cell: PropTypes.object.isRequired,
};
