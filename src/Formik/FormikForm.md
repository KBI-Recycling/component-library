FormikForm Example:

```js
import React from 'react'
import {Grid} from '@material-ui/core';
import TextField from './TextField';

<FormikForm initialValues={{ Company: 'KBI Recycling', Contact: 'Daniel Kinsbursky' }}>
  {formik => (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField name='Company' id='FormikForm:Company' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField name='Contact' id='FormikForm:Contact' />
      </Grid>
    </Grid>
  )}
</FormikForm>
```
