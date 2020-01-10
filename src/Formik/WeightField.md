How to Access:
```static
import {Formik} from '@kbi/component-library';
const {WeightField} = Formik;
```

WeightField Examples:

```js
import React from 'react'
import {Formik, Form} from 'formik';
import {Grid, Typography} from '@material-ui/core';

<Formik validateOnChange={false} initialValues={{ Amount: '25' }}>
  {formik => (
    <Form style={{width: '100%'}} noValidate method="post">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='caption'>Basic</Typography>
          <WeightField name='Amount' id='WeightField:Basic' />
        </Grid>
      </Grid>
    </Form>
  )}
</Formik>
```