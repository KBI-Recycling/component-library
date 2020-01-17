How to Access:
```html
import {Formik} from '@kbi/component-library';
const {VinField} = Formik;
```

NumberField Examples:

```js
import React from 'react'
import {Formik, Form} from 'formik';
import {Grid, Typography} from '@material-ui/core';

<Formik validateOnChange={false} initialValues={{ Blank: '', Value: '19UUA8F52BA004274' }}>
  {formik => (
    <Form style={{width: '100%'}} noValidate method="post">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='caption'>Blank</Typography>
          <VinField name='Blank' id='VinField:Blank' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='caption'>Filled Value</Typography>
          <VinField name='Value' id='VinField:Value' />
        </Grid>
      </Grid>
    </Form>
  )}
</Formik>
```
