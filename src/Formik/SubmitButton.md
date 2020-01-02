SubmitButton Example:

```js
import React, {Fragment, useMemo} from 'react'
import {Formik, Form} from 'formik';
import {Grid} from '@material-ui/core';
import TextField from './TextField';

const initialValues = {
  Company: 'KBI Recycling',
  Contact: 'Daniel Kinsbursky',
};

<Formik validateOnChange={false} initialValues={initialValues}>
  {formik => (
    <Form style={{width: '100%'}} noValidate method="post">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField name='Company' />
        </Grid>
        <Grid item xs={6}>
          <TextField name='Contact' />
        </Grid>
        <Grid item>
          <SubmitButton>Submit</SubmitButton>
        </Grid>
      </Grid>
    </Form>
  )}
</Formik>
```
