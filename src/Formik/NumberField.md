How to Access:
```html
import {Formik} from '@kbi/component-library';
const {NumberField} = Formik;
```

NumberField Examples:

```js
import React from 'react'
import {Formik, Form} from 'formik';
import {Grid, Typography} from '@material-ui/core';

<Formik validateOnChange={false} initialValues={{ Amount: '25', AmountDecimal: '25.431' }}>
  {formik => (
    <Form style={{width: '100%'}} noValidate method="post">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='caption'>Basic</Typography>
          <NumberField name='Amount' id='NumberField:Basic' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='caption'>Custom Decimal</Typography>
          <NumberField name='AmountDecimal' decimal={3} label='Amount' id='NumberField:Decimal' />
        </Grid>
      </Grid>
    </Form>
  )}
</Formik>
```
