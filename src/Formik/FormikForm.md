FormikForm Example:

```jsx
import React from 'react'
import {Formik, Form} from 'formik';
import {Grid} from '@material-ui/core';
import TextField from './TextField';

<FormikForm initialValues={{ Company: 'KBI Recycling', Contact: 'Daniel Kinsbursky' }}>
  {/* FormikForm child elements are wrapped in a IIFE. This is not required in production*/}
  {/* IIFE is only used in this example to properly execute render using native styleguidist */}
  {((formik) => (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField name='Company' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField name='Contact' />
      </Grid>
    </Grid>
  ))()}
</FormikForm>
```