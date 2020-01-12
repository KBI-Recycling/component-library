MuiTable example:

```js
import React, {useMemo} from 'react';

const mockData = [
  {"id":1,"active":true,"name":"Chloette Manton","dateCreated":"12/24/2019","gender":"Female","income":23463.64},
  {"id":2,"active":true,"name":"Brnaby Elvins","dateCreated":"10/22/2019","gender":"Male","income":19518.39},
  {"id":3,"active":true,"name":"Ruben Ledstone","dateCreated":"2/10/2019","gender":"Male","income":37733.55},
  {"id":4,"active":true,"name":"Hetty Schafer","dateCreated":"12/9/2019","gender":"Female","income":76929.64},
  {"id":5,"active":true,"name":"Alix Temblett","dateCreated":"7/10/2019","gender":"Male","income":63880.22},
  {"id":6,"active":false,"name":"Finlay Percifer","dateCreated":"2/20/2019","gender":"Male","income":36163.74},
  {"id":7,"active":true,"name":"Huberto Ilyin","dateCreated":"8/1/2019","gender":"Male","income":88836.8},
  {"id":8,"active":true,"name":"Noah Dawtre","dateCreated":"2/1/2019","gender":"Male","income":73037.63},
  {"id":9,"active":false,"name":"Barby Dunnet","dateCreated":"8/29/2019","gender":"Female","income":11481.06},
  {"id":10,"active":true,"name":"Christian Sapey","dateCreated":"8/5/2019","gender":"Male","income":40824.28},
  {"id":11,"active":true,"name":"Elaina Dibnah","dateCreated":"5/18/2019","gender":"Female","income":18682.23},
  {"id":12,"active":false,"name":"Cristy Lacaze","dateCreated":"10/26/2019","gender":"Female","income":69895.22},
  {"id":13,"active":false,"name":"Alfonso Bayley","dateCreated":"6/7/2019","gender":"Male","income":89453.11},
  {"id":14,"active":false,"name":"Bronny Turvey","dateCreated":"9/13/2019","gender":"Male","income":76313.46},
  {"id":15,"active":false,"name":"Durand Belly","dateCreated":"6/25/2019","gender":"Male","income":59854.94},
  {"id":16,"active":true,"name":"Petr Southouse","dateCreated":"9/26/2019","gender":"Male","income":9186.34},
  {"id":17,"active":false,"name":"Carmelia Bigley","dateCreated":"7/28/2019","gender":"Female","income":2153.78},
  {"id":18,"active":true,"name":"Leonanie Mohammad","dateCreated":"10/25/2019","gender":"Female","income":42177.98},
  {"id":19,"active":false,"name":"Genevra Bezemer","dateCreated":"4/26/2019","gender":"Female","income":77570.29},
  {"id":20,"active":false,"name":"Marlane Gaisford","dateCreated":"9/11/2019","gender":"Female","income":50463.95}
];

<MuiTable
  data={mockData}
  columns={[
    {field: 'id', title: 'Id', type: 'numeric'},
    {field: 'active', title: 'Active', type: 'boolean'},
    {field: 'name', title: 'Name', type: 'string'},
    {field: 'dateCreated', title: 'Date Created', type: 'date', noWrap: false},
    {field: 'gender', title: 'Gender', type: 'string'},
    {field: 'income', title: 'Income', type: 'currency'},
  ]}
/>
```
