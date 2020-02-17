import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {ButtonGroup, Button, TableCell, Tooltip} from '@material-ui/core';
import {Check, Close} from '@material-ui/icons';
import moment from 'moment';


const TableBodyCell = (props) => {
  const {cell} = props;
  const actionsButtonStyle = useMemo(() => ({
    border: '0px',
    padding: '0px',
  }), []);
  return (
    <TableCell {...cell.getCellProps()}>
      {cell.render((({cell}) => {
        if (cell.column.actions) {
          return (
            <ButtonGroup size='small'>
              {cell.column.actions.map((action, i) => {
                if (!action?.tooltip) return <Button style={actionsButtonStyle} onClick={event => action.onClick({event})}>{action.icon}</Button>;
                return (
                  <Tooltip key={i} title={action.tooltip}>
                    <Button style={actionsButtonStyle} onClick={event => action.onClick({event, rowData: cell.row.original, rowIndex: cell.row.index})}>
                      {action.icon}
                    </Button>
                  </Tooltip>
                );
              })}
            </ButtonGroup>
          );
        }
        if (cell.column.type === 'boolean') {
          return cell.value ? <Check /> : <Close />;
        }
        if (cell.column.type === 'currency') {
          return cell.value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        }
        if (cell.column.type === 'datetime') {
          const datetimeFormat = cell.column?.datetimeFormat ? cell.column.datetimeFormat : 'MM/DD/YYYY';
          return moment(cell.value).format(datetimeFormat);
        }
        if (cell.column.type === 'numeric') {
          return Number(cell.value).toLocaleString();
        }
        return String(cell.value);
      }))}
    </TableCell>
  );
};

TableBodyCell.propTypes = {
  cell: PropTypes.object.isRequired,
};
export default TableBodyCell;
