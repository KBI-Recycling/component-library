import React from 'react';
import PropTypes from 'prop-types';
import {TableRow} from '@material-ui/core';
import DefaultCell from './TableBodyCell/DefaultCell';
import NumericCell from './TableBodyCell/DefaultCell';
import DateTimeCell from './TableBodyCell/DateTimeCell';
import CurrencyCell from './TableBodyCell/CurrencyCell';
import BooleanCell from './TableBodyCell/BooleanCell';
import ActionsCell from './TableBodyCell/ActionsCell';
import SelectRowCell from './TableBodyCell/SelectRowCell';

const TableBodyRow = ({row}) => {
  return (
    <TableRow {...row.getRowProps()}>
      {row.cells.map(cell => {
        const {key} = cell.getCellProps();
        if (cell.column.id === 'muiRowSelection') return <SelectRowCell key={key} render={cell.render('Cell')} />;
        if (cell.column.id === 'muiTableActions') return <ActionsCell key={key} cell={cell} />;
        if (cell.column.type === 'boolean') return <BooleanCell key={key} value={cell.value} wrapBodyText={cell.column.wrapBodyText} />;
        if (cell.column.type === 'currency') return <CurrencyCell key={key} value={cell.value} wrapBodyText={cell.column.wrapBodyText} />;
        if (cell.column.type === 'datetime') return <DateTimeCell key={key} datetimeFormat={cell.column?.datetimeFormat} value={cell.value} wrapBodyText={cell.column.wrapBodyText} />;
        if (cell.column.type === 'numeric') return <NumericCell key={key} value={cell.value} wrapBodyText={cell.column.wrapBodyText} />;
        return <DefaultCell key={key} value={cell.value} wrapBodyText={cell.column.wrapBodyText} />;
      })}
    </TableRow>
  );
};

TableBodyRow.propTypes = {
  rtProps: PropTypes.object.isRequired,
  row: PropTypes.object,
};
export default TableBodyRow;
