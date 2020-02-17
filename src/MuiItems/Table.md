Table Example:

```js
import sampleData from './Table/sampleData';
import {Edit, Save} from '@material-ui/icons';

<Table
  data={sampleData}
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
    {
      icon: Edit,
      tooltip: 'Edit User',
      onClick: (action) => {
        console.log('Edit Row', action);
      },
    },
  ]}
  paginationActive={true}
  paginationSizes={[5, 10, 25, 50]}
  paginationInitialSize={5}
  paginationInitialIndex={0}
/>
```
