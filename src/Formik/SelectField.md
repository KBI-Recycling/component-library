How to Access:
```static
import {Formik} from '@kbi/component-library';
const {SelectField} = Formik;
```

SelectField Examples:

```js
import React from 'react'
import {Formik, Form} from 'formik';
import {Grid, Typography, MenuItem} from '@material-ui/core';

<Formik validateOnChange={false} initialValues={{ Select: ''}}>
  {formik => (
    <Form style={{width: '100%'}} noValidate method="post">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='caption'>Basic</Typography>
          <SelectField name='Select'>
            <MenuItem value={'Chris'}>Chris</MenuItem>
            <MenuItem value={'Dan'}>Dan</MenuItem>
            <MenuItem value={'Gerry'}>Gerry</MenuItem>
          </SelectField>
        </Grid>
      </Grid>
    </Form>
  )}
</Formik>
```