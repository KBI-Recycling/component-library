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

<Formik validateOnChange={false} initialValues={{ Auto: '' }}>
  {formik => (
    <Form style={{width: '100%'}} noValidate method="post">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='caption'>Basic</Typography>
          <AutoField name='Auto' label='AutoField' options={[{name: 'Chris'}, {name: 'Dan'}, {name: 'Gerry'}]}     optionLabel='name' onChange={({form, field}) => {
            form.setFieldValue('Auto', field.value ? field.value.name : '');
          }
        }
        />
        </Grid>
      </Grid>
    </Form>
  )}
</Formik>
```