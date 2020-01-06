TextField Examples:

```js
import React from 'react'
import {Formik, Form} from 'formik';
import {Grid, Typography} from '@material-ui/core';

<Formik validateOnChange={false} initialValues={{ Company: 'KBI Recycling' }}>
  {formik => (
    <Form style={{width: '100%'}} noValidate method="post">
      <Grid container spacing={2}>

        <Grid item xs={12} sm={4}>
          <Typography variant='caption'>Basic</Typography>
          <TextField name='Company' id='TextField:Basic' />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant='caption'>Fast Field</Typography>
          <TextField name='Company' fast id='TextField:Fast' />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant='caption'>Required</Typography>
          <TextField name='Company' required id='TextField:Required' />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant='caption'>Disabled</Typography>
          <TextField name='Company' disabled id='TextField:Disabled' />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant='caption'>Modified Label</Typography>
          <TextField name='Company' label='Company Name' id='TextField:Label' />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant='caption'>Color: secondary</Typography>
          <TextField name='Company' color='secondary' id='TextField:Color' />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant='caption' style={{display: 'block'}}>Full Width: false</Typography>
          <TextField name='Company' fullWidth={false} id='TextField:FullWidth' />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant='caption' style={{display: 'block'}}>Variant: outlined</Typography>
          <TextField name='Company' variant='outlined' id='TextField:Outlined' />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant='caption' style={{display: 'block'}}>Variant: filled</Typography>
          <TextField name='Company' variant='filled' id='TextField:Filled' />
        </Grid>

      </Grid>
    </Form>
  )}
</Formik>
```
