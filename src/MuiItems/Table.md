Table Example:

```js
import React, {Fragment, useCallback, useState} from 'react';
import sampleData from './Table/sampleData';
import {Button} from '@material-ui/core';
import {Delete, Save, Edit} from '@material-ui/icons';

const [rows, setRows] = useState(25);
const [data, setData] = useState(sampleData.filter((row, index) => {
    if (index < rows) return true;
    return false;
  }))
const handleAddRows = useCallback(() => {
  setRows(rows + 5);
}, [rows]);

<Fragment>
<Table
  data={data}
  columns={[
    {accessor: 'id', Header: 'Id', type: 'numeric'},
    {accessor: 'active', Header: 'Active', type: 'boolean'},
    {accessor: 'full_name', Header: 'Name', filterDisable: false},
    {accessor: 'gender', Header: 'Gender', filterField: 'select'},
    {accessor: 'salary', Header: 'Salary', type: 'currency'},
    {accessor: 'dob', Header: 'Date of Birth', type: 'datetime', datetimeFormat: 'MM/DD/YYYY', filterField: 'datetime'},
  ]}
  actionsPerRow={[
    {
      icon: Delete,
      tooltip: 'Save User',
      onClick: ({event, rowData, rowIndex}) => {
        setData([...data.slice(0, rowIndex),...data.slice(rowIndex + 1)])
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
  paginationActive={true}
  paginationSizes={[5, 10, 25, 50]}
  paginationInitialSize={10}
  paginationInitialIndex={0}
  rowEdgePadding={'16px'}
  selectRows={true}
  sortInitial={[{id: 'full_name', desc: false}]}
  isLoading={false}
/>
<Button onClick={handleAddRows} disabled>Add 5 Rows</Button>
</Fragment>
```
