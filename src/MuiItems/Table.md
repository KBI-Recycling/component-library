Table Example:

```js
import React, {Fragment, useCallback, useMemo, useState} from 'react';
import sampleData from './Table/sampleData';
import {Button} from '@material-ui/core';
import {Add, DeleteForever, Save, Edit} from '@material-ui/icons';

const [rows, setRows] = useState(25);
const [data, setData] = useState(sampleData.filter((row, index) => {
  if (index < rows) return true;
  return false;
}));
const handleAddRows = useCallback(() => {
  setData(sampleData.filter((row, index) => {
    if (index < rows + 5) return true;
    return false;
  }));
  setRows(rows + 5);
}, [data, rows]);

<Fragment>
<Table
  data={data}
  columns={[
    {accessor: 'id', Header: 'Id', type: 'numeric'},
    {accessor: 'active', Header: 'Active', type: 'boolean'},
    {accessor: 'full_name', Header: 'Name', filterDisable: false},
    {accessor: 'gender', Header: 'Gender', filterField: 'select'},
    {accessor: 'salary', Header: 'Salary', type: 'currency'},
    {accessor: 'dob', Header: 'Date of Birth', type: 'datetime', datetimeFormat: 'MM/DD/YYYY'},
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
        icon: DeleteForever,
        text: 'Delete Selected Employees',
        buttonProps: {disabled:  rtProps.selectedFlatRows.length !== 0 ? false : true},
        onClick: ({event, tableData}) => {
          const selectedIndexes = tableData.selectedRows.sort((a, b) => b.index - a.index).map(row => row.index);
          const newData = [...data];
          selectedIndexes.forEach(selectedIndex => newData.splice(selectedIndex, 1));
          setData([...newData]);
          tableData.toggleAllRowsSelected(false);
        },
      }
    },
  ]}
  actionsPerRow={[
    {
      icon: Save,
      tooltip: 'Save User',
      onClick: ({event, rtProps, rowData, rowIndex}) => {
        console.log('Save User', event, rtProps, rowData, rowIndex)
      },
    },
    {
      icon: DeleteForever,
      tooltip: 'Delete Forever',
      onClick: ({event, rtProps, rowData, rowIndex}) => {
        const newData = [...data];
        newData.splice(rowIndex, 1);
        rtProps.toggleAllRowsSelected(false)
        setData([...newData]);
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
