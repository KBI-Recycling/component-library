How to Access:
```html
import {Formik} from '@kbi/component-library';
const {AutoCompleteV3} = Formik;
```

AutoCompleteV3 Examples:

```js
import React from 'react'
import {Formik, Form} from 'formik';
import {Grid, Typography} from '@material-ui/core';

<Formik validateOnChange={false} initialValues={{ Developer: '', DeveloperMulti: [] }}>
  {formik => {
    const developerProps = {
      id: 'AutoCompleteV3:Developer',
      name: 'Developer',
      options: [{name: 'Chris'}, {name: 'Dan'}, {name: 'Gerry'}],
      optionKey: 'name',
      onChange: ({field, form, value, selected}) => console.log({field, form, value, selected}),
    }
    const developerMultiProps = {
      id: 'AutoCompleteV3:DeveloperMulti',
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
            <AutoCompleteV3 {...developerProps} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='caption'>Basic</Typography>
            <AutoCompleteV3 {...developerMultiProps} />
          </Grid>
        </Grid>
      </Form>
    )
  }}
</Formik>
```
