Table Example:

```js
import sampleData from './Table/sampleData';

<Table
  data={sampleData}
  columns={[
    {accessor: 'id', Header: 'Id', type: 'numeric'},
    {accessor: 'active', Header: 'Active', type: 'boolean'},
    {accessor: 'full_name', Header: 'Name', type: 'string'},
    {accessor: 'gender', Header: 'Gender', type: 'string'},
    {accessor: 'salary', Header: 'Salary', type: 'currency'},
    {accessor: 'dob', Header: 'Date of Birth', type: 'datetime', datetimeFormat: 'M/D/YYYY'},
  ]}
/>
```
