Table Example:

```js
import React, {Fragment, useCallback, useState} from 'react';
import sampleData from './Table/sampleData';
import {Button} from '@material-ui/core';
import {Add, GetApp, Save, Edit} from '@material-ui/icons';

const [rows, setRows] = useState(25);
const handleAddRows = useCallback(() => {
  setRows(rows + 5);
}, [rows]);

<Fragment>
<Table
  data={sampleData.filter((row, index) => {
    if (index < rows) return true;
    return false;
  })}
  columns={[
    {accessor: 'id', Header: 'Id', type: 'numeric'},
    {accessor: 'active', Header: 'Active', type: 'boolean'},
    {accessor: 'full_name', Header: 'Name', filterDisable: false},
    {accessor: 'gender', Header: 'Gender', filterField: 'select'},
    {accessor: 'salary', Header: 'Salary', type: 'currency'},
    {accessor: 'dob', Header: 'Date of Birth', type: 'datetime', datetimeFormat: 'MM/DD/YYYY', filterField: 'datetime'},
  ]}
  actionsBar={[
    {
        icon: Add,
        text: 'Add New Employee',
        onClick: ({event, tableData}) => {
          console.log('New Employee', {event, tableData});
        },
      },
    (rtProps) => {
      return {
        icon: GetApp,
        text: 'Export Employee List',
        buttonProps: {disabled:  rtProps.selectedFlatRows.length !== 0 ? false : true},
        onClick: ({event, tableData}) => {
          console.log('Export Employee', {event, tableData});
        },
      }
    },
  ]}
  actionsPerRow={[
    {
      icon: Save,
      tooltip: 'Save User',
      onClick: ({event, rowData, rowIndex}) => {
        console.log('Save User', event, rowData, rowIndex)
      },
    },
    rowData => {
      return {
        disabled: rowData.active ? true : false,
        hide: rowData.active ? false : true,
        icon: Edit,
        tooltip: `Edit ${rowData.full_name}`,
        onClick: (action) => {
          console.log('Edit Row', action);
        },
      }
    },
  ]}
  paginationActive={true}
  paginationSizes={[5, 10, 25, 50]}
  paginationInitialSize={10}
  paginationInitialIndex={0}
  rowEdgePadding={'16px'}
  selectRows={true}
  sortInitial={[{id: 'full_name', desc: false}]}
  isLoading={false}
  title={{
    primary: 'Current Employees',
    secondary: 'View all information related to current employees',
    secondaryProps: {style: {color: 'red'}},
    wrapperStyle: {padding: '8px'}
  }}
  /*
  actionsPerTable={[
    {
      icon: Save,
      tooltip: 'New User',
      onClick: (action) => {
        console.log('New User', action);
      },
    },
    {
      icon: Edit,
      tooltip: 'New Pencil',
      onClick: (action) => {
        console.log('New Pencil', action);
      },
    },
  ]}
  */
/>
<Button onClick={handleAddRows}>Add 5 Rows</Button>
</Fragment>
```
