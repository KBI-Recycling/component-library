How to Access:
```static
import {Formik} from '@kbi/component-library';
const {AutoField} = Formik;
```

AutoField Examples:

```js
import React from 'react'
import {Formik, Form} from 'formik';
import {Grid, Typography} from '@material-ui/core';

<Formik validateOnChange={false} initialValues={{ Automatic: '' }}>
  {formik => {
    const autoFieldProps = {
      name: 'Auto',
      label: 'AutoField',
      options: [{name: 'Chris'}, {name: 'Dan'}, {name: 'Gerry'}],
      optionLabel: 'name',
      onChange: ({form, field}) => {
        form.setFieldValue('Automatic', field.value ? field.value.name : '');
      }     
    }
    return (
      <Form style={{width: '100%'}} noValidate method="post">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='caption'>Basic</Typography>
            <AutoField {...autoFieldProps} />
          </Grid>
        </Grid>
      </Form>
    )
  }}
</Formik>
```