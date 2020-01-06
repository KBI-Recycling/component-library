How to Access:
```static
import {Formik} from '@kbi/component-library';
const {CurrencyField} = Formik;
```

CurrencyField Examples:

```js
import React from 'react'
import {Formik, Form} from 'formik';
import {Grid, Typography} from '@material-ui/core';

<Formik validateOnChange={false} initialValues={{ Amount: '2.50', AmountDecimal: '2.500' }}>
  {formik => (
    <Form style={{width: '100%'}} noValidate method="post">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='caption'>Basic</Typography>
          <CurrencyField name='Amount' id='CurrencyField:Basic' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='caption'>Custom Decimal</Typography>
          <CurrencyField name='AmountDecimal' decimal={3} label='Amount' id='CurrencyField:Decimal' />
        </Grid>
      </Grid>
    </Form>
  )}
</Formik>
```
