TextField Examples:

```js
import React, {Fragment, useMemo} from 'react'
import {Formik, Form} from 'formik';
import {object, string} from 'yup';
import {Grid, Typography} from '@material-ui/core';

<Formik validateOnChange={false} initialValues={{ Company: 'KBI Recycling' }}>
  {formik => (
    <Form style={{width: '100%'}} noValidate method="post">
      <Grid container spacing={2}>

        <Grid item xs={12} sm={4}>
          <Typography variant='caption'>Basic</Typography>
          <TextField name='Company' id='Basic' />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant='caption'>Fast Field</Typography>
          <TextField name='Company' id='Fast' fast />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant='caption'>Required</Typography>
          <TextField name='Company' id='Required' required />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant='caption'>Disabled</Typography>
          <TextField name='Company' id='Disabled' disabled />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant='caption'>Modified Label</Typography>
          <TextField name='Company' id='Label' label='Company Name' />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant='caption'>Color: secondary</Typography>
          <TextField name='Company' id='Color' color='secondary' />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant='caption' style={{display: 'block'}}>Full Width: false</Typography>
          <TextField name='Company' id='FullWidth' fullWidth={false} />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant='caption' style={{display: 'block'}}>Variant: outlined</Typography>
          <TextField name='Company' id='Outlined' variant='outlined' />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant='caption' style={{display: 'block'}}>Variant: filled</Typography>
          <TextField name='Company' id='Filled' variant='filled' />
        </Grid>

      </Grid>
    </Form>
  )}
</Formik>
```
