How to Access:
```html
import {Formik} from '@kbi/component-library';
const {SwitchField} = Formik;
```

SwitchField Examples:

```js
import React from 'react'
import {Formik, Form} from 'formik';
import {Grid, Typography, FormControlLabel, Radio} from '@material-ui/core';

<Formik validateOnChange={false} initialValues={{ Gerry: false, Gerry2: false, Dan: false, Chris: false}}>
  {formik => {
        console.log(formik.values)
    return (
    <Form style={{width: '100%'}} noValidate method="post">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='caption'>Basic</Typography>
          <SwitchField name='Gerry' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='caption'>Lable Placement</Typography>
          <SwitchField name='Gerry2' label='Gerry' labelPlacement='start' />
          <SwitchField name='Dan' labelPlacement='bottom' />
          <SwitchField name='Chris' labelPlacement='end' />
        </Grid>
      </Grid>
    </Form>
  )}}
</Formik>
```
