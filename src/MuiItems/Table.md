Table Example:

```js
import React, {Fragment, useCallback, useState} from 'react';
import sampleData from './Table/sampleData';
import {Button} from '@material-ui/core';
import {Edit, Save} from '@material-ui/icons';

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
    {accessor: 'full_name', Header: 'Name', filterDisable: true},
    {accessor: 'gender', Header: 'Gender', filterField: 'select'},
    {accessor: 'salary', Header: 'Salary', type: 'currency'},
    {accessor: 'dob', Header: 'Date of Birth', type: 'datetime', datetimeFormat: 'MM/DD/YYYY', filterField: 'datetime'},
  ]}
  actionsPerRow={[
    {
      icon: Save,
      tooltip: 'Save User',
      onClick: (action) => {
        console.log('Save Row', action);
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
  sortBy={[{id: 'full_name', desc: true}]}
/>
<Button onClick={handleAddRows}>Add 5 Rows</Button>
</Fragment>
```
