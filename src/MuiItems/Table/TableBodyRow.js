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

const TableBodyRow = ({row, rowEdgePadding}) => {
  return (
    <TableRow {...row.getRowProps()}>
      {row.cells.map((cell, index) => {
        const {key} = cell.getCellProps();
        const padLeft = index === 0 ? rowEdgePadding : '0px';
        const padRight = index + 1 === row.cells.length ? rowEdgePadding : '0px';
        if (cell.column.id === 'muiRowSelection') return <SelectRowCell key={key} render={cell.render('Cell')} padLeft={padLeft} padRight={padRight} />;
        if (cell.column.id === 'muiTableActions') return <ActionsCell key={key} cell={cell} padLeft={padLeft} padRight={padRight} />;
        if (cell.column.type === 'boolean') return <BooleanCell key={key} value={cell.value} wrapBodyText={cell.column.wrapBodyText} padLeft={padLeft} padRight={padRight} />;
        if (cell.column.type === 'currency') return <CurrencyCell key={key} value={cell.value} wrapBodyText={cell.column.wrapBodyText} padLeft={padLeft} padRight={padRight} />;
        if (cell.column.type === 'datetime') return <DateTimeCell key={key} datetimeFormat={cell.column?.datetimeFormat} value={cell.value} wrapBodyText={cell.column.wrapBodyText} padLeft={padLeft} padRight={padRight} />; //eslint-disable-line
        if (cell.column.type === 'numeric') return <NumericCell key={key} value={cell.value} wrapBodyText={cell.column.wrapBodyText} padLeft={padLeft} padRight={padRight} />;
        return <DefaultCell key={key} value={cell.value} wrapBodyText={cell.column.wrapBodyText} padLeft={padLeft} padRight={padRight} />;
      })}
    </TableRow>
  );
};

TableBodyRow.propTypes = {
  row: PropTypes.object.isRequired,
  rowEdgePadding: PropTypes.string.isRequired,
};
export default TableBodyRow;