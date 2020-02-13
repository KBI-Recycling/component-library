import React from 'react';
import {IconButton, Tooltip} from '@material-ui/core';
import MuiCheckbox from './MuiCheckbox';
export const emptyHook = hooks => {};
export const useCreateCheckboxes = hooks => {
  hooks.flatColumns.push(columns => [
    // Let's make a column for selection
    {
      id: 'selection',
      disableSortBy: true,
      groupByBoundary: true,
      // The header can use the table's getToggleAllRowsSelectedProps method
      // to render a checkbox
      Header: (props) => {
        return (
          <div>
            <MuiCheckbox {...props.getToggleAllRowsSelectedProps()} />
          </div>
        )
        ;
      },
      // The cell can use the individual row's getToggleRowSelectedProps method
      // to the render a checkbox
      Cell: (props) => {
        return (
          <div>
            <MuiCheckbox {...props.row.getToggleRowSelectedProps()} />
          </div>
        )
        ;
      },
    },
    ...columns,
  ]);
};

export const useCreateActions = actions => hooks => {
  hooks.flatColumns.push(columns => [
    {
      id: 'actions',
      disableSortBy: true,
      groupByBoundary: true,
      Header: props => {
        return (
          <div>
            Actions
          </div>
        )
        ;
      },
      Cell: props => {
        return (
          <div>
            {actions.map((action, i) => <Tooltip key={i} title={action.tooltip}><IconButton onClick={e => action.onClick(e, props.row)}>{action.icon}</IconButton></Tooltip>)}
          </div>
        )
        ;
      },
    },
    ...columns,
  ]);
};
