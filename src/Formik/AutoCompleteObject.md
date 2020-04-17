How to Access:
```html
import {Formik} from '@kbi/component-library';
const {AutoCompleteObject, validateAutoObject} = Formik;
validateAutoObject();
```

AutoCompleteObject Examples:

```js
import React from 'react'
import {Formik, Form} from 'formik';
import {Grid, Typography} from '@material-ui/core';

<Formik validateOnChange={false} initialValues={{ Automatic: '', Multiple: [{name: 'Gerry', info: 789}] }}>
  {formik => {
    const AutoCompleteObjectProps1 = {
      name: 'Automatic',
      label: 'AutoCompleteObject',
      options: [{name: 'Chris', info: 123}, {name: 'Dan', info: 456}, {name: 'Gerry', info: 789}],
      optionKey: 'name',   
    }
    const AutoCompleteObjectProps2 = {
      name: 'Multiple',
      label: 'AutoCompleteObject',
      multiple: true,
      options: [{name: 'Chris', info: 123}, {name: 'Dan', info: 456}, {name: 'Gerry', info: 789}],
      optionKey: 'name',
    }
    return (
      <Form style={{width: '100%'}} noValidate method="post">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='caption'>Basic</Typography>
            <AutoCompleteObject {...AutoCompleteObjectProps1} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='caption'>Multi</Typography>
            <AutoCompleteObject {...AutoCompleteObjectProps2} /> 
          </Grid>
        </Grid>
      </Form>
    )
  }}
</Formik>
```
