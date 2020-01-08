How to Access:
```static
import {Formik} from '@kbi/component-library';
const {DateField} = Formik;
```

DateField Examples:

```js
import React from 'react'
import {Formik, Form} from 'formik';
import {Grid, Typography} from '@material-ui/core';

<Formik validateOnChange={false} initialValues={{ BasicDate: '', FilledDate: '2020-01-01'}}>
  {formik => (
    <Form style={{width: '100%'}} noValidate method="post">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='caption'>Basic</Typography>
          <DateField name='BasicDate' label='Date' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='caption'>Pre-filled</Typography>
          <DateField name='FilledDate' label='Date' />
        </Grid>
      </Grid>
    </Form>
  )}
</Formik>
```