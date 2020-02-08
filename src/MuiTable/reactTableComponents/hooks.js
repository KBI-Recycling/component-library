import React from 'react';
import {IconButton, Tooltip} from '@material-ui/core';
import MuiCheckbox from './MuiCheckbox';
export const emptyHook = hooks => {};
export const useCreateCheckboxes = hooks => {
  hooks.flatColumns.push(columns => [
    // Let's make a column for selection
    {
      id: 'selection',
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
        // console.log(props.selectedFlatRows, props.row);
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
  console.log(actions);
  console.log(hooks);
  hooks.flatColumns.push(columns => [
    {
      id: 'actions',
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
            {actions.map(action => <Tooltip title={action.tooltip}><IconButton onClick={e => action.onClick(e, props.row)}>{action.icon}</IconButton></Tooltip>)}
          </div>
        )
        ;
      },
    },
    ...columns,
  ]);
};
