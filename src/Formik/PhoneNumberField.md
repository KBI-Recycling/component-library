How to Access:
```html
import {Formik} from '@kbi/component-library';
const {PhoneNumberField, validatePhoneField} = Formik;
```

PhoneNumberField Examples:

```js
import React from 'react'
import {Formik, Form} from 'formik';
import {Grid, Typography} from '@material-ui/core';

<Formik initialValues={{PhoneNumber: ''}} validateOnChange={false}>
  {formik => (
    <Form style={{width: '100%'}} noValidate method="post">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='caption'>Basic</Typography>
          <PhoneNumberField name='PhoneNumber' label='Phone Number' />
        </Grid>
      </Grid>
    </Form>
  )}
</Formik>
```
