How to Access:
```html
import {Formik} from '@kbi/component-library';
const {AutoCompleteValue} = Formik;
```

AutoCompleteValue Examples:

```js
import React from 'react'
import {Formik, Form} from 'formik';
import {Grid, Typography} from '@material-ui/core';

<Formik validateOnChange={false} initialValues={{ Developer: '', DeveloperMulti: [] }}>
  {formik => {
    const developerProps = {
      id: 'AutoCompleteValue:Developer',
      name: 'Developer',
      options: [{name: 'Chris'}, {name: 'Dan'}, {name: 'Gerry'}],
      optionKey: 'name',
      onChange: ({field, form, value, selected}) => console.log({field, form, value, selected}),
    }
    const developerMultiProps = {
      id: 'AutoCompleteValue:DeveloperMulti',
      name: 'DeveloperMulti',
      label: 'Developers',
      multiple: true,
      options: [{name: 'Chris'}, {name: 'Dan'}, {name: 'Gerry'}],
      optionKey: 'name',
      onChange: ({field, form, value, selected}) => console.log({field, form, value, selected}),
    }

    return (
      <Form style={{width: '100%'}} noValidate method="post">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='caption'>Basic</Typography>
            <AutoCompleteValue {...developerProps} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='caption'>Basic</Typography>
            <AutoCompleteValue {...developerMultiProps} />
          </Grid>
        </Grid>
      </Form>
    )
  }}
</Formik>
```
