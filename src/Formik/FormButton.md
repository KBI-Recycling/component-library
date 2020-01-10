How to Access:
```html
import {Formik} from '@kbi/component-library';
const {FormButton} = Formik;
```

FormButton Example:

```js
import React, {useMemo} from 'react'
import {Formik, Form} from 'formik';
import {Grid} from '@material-ui/core';
import {Delete, Save} from '@material-ui/icons';
import TextField from './TextField';
import SubmitButton from './SubmitButton';
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
          <TextField name='Company' id='SubmitButton:Company' />
        </Grid>
        <Grid item xs={6}>
          <TextField name='Contact' id='SubmitButton:Contact' />
        </Grid>
        <Grid item xs={12} style={{display: 'flex'}}>
          <SubmitButton />
          <div style={{paddingRight: '16px'}} />
          <FormButton>FormButton</FormButton>
          <div style={{paddingRight: '16px'}} />
          <FormButton variant='outlined'>outlined</FormButton>
          <div style={{paddingRight: '16px'}} />
          <FormButton color='secondary'>secondary</FormButton>
          <div style={{paddingRight: '16px'}} />
          <FormButton startIcon={<Delete />}>startIcon</FormButton>
        </Grid>
      </Grid>
    </Form>
  )}
</Formik>
```
