SubmitButton Example:

```js
import React, {useMemo} from 'react'
import {Formik, Form} from 'formik';
import {Grid} from '@material-ui/core';
import {Delete, Save} from '@material-ui/icons';
import TextField from './TextField';
import {object, string} from 'yup';

const formProps = useMemo(() => ({
  initialValues: {
    Company: 'KBI Recycling',
    Contact: 'Daniel Kinsbursky',
  },
  onSubmit: (values, actions) => {
    setTimeout(() => {
      actions.setSubmitting(false)
    }, 2000)
  },
  validationSchema: object().shape({
    Company: string().required(),
    Contact: string().required(),
  }),
}), []);

<Formik validateOnChange={false} {...formProps}>
  {formik => (
    <Form style={{width: '100%'}} noValidate method="post">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField name='Company' />
        </Grid>
        <Grid item xs={6}>
          <TextField name='Contact' />
        </Grid>
        <Grid item xs={12} style={{display: 'flex'}}>
          <SubmitButton />
          <div style={{paddingRight: '16px'}} />
          <SubmitButton variant='outlined'>Outlined</SubmitButton>
          <div style={{paddingRight: '16px'}} />
          <SubmitButton color='secondary'>Secondary</SubmitButton>
          <div style={{paddingRight: '16px'}} />
          <SubmitButton startIcon={<Delete />}>startIcon</SubmitButton>
          <div style={{paddingRight: '16px'}} />
          <SubmitButton endIcon={<Save />}>endIcon</SubmitButton>
        </Grid>
        <Grid item xs={12}>
          <SubmitButton fullWidth={true}>Full Width</SubmitButton>
        </Grid>
      </Grid>
    </Form>
  )}
</Formik>
```
