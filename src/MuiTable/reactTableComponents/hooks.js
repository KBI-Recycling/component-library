import React from 'react';
import MuiCheckbox from './MuiCheckbox';
export const useCreateCheckboxes = hooks => {
  hooks.flatColumns.push(columns => [
    // Let's make a column for selection
    {
      id: 'selection',
      // The header can use the table's getToggleAllRowsSelectedProps method
      // to render a checkbox
      Header: ({getToggleAllRowsSelectedProps}) => (
        <div>
          <MuiCheckbox {...getToggleAllRowsSelectedProps()} />
        </div>
      ),
      // The cell can use the individual row's getToggleRowSelectedProps method
      // to the render a checkbox
      Cell: ({row}) => (
        <div>
          <MuiCheckbox {...row.getToggleRowSelectedProps()} />
        </div>
      ),
    },
    ...columns,
  ]);
};
