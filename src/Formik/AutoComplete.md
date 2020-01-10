How to Access:
```html
import {Formik} from '@kbi/component-library';
const {AutoComplete} = Formik;
```

AutoComplete Examples:

```js
import React from 'react'
import {Formik, Form} from 'formik';
import {Grid, Typography} from '@material-ui/core';

<Formik validateOnChange={false} initialValues={{ Automatic: '' }}>
  {formik => {
    const AutoCompleteProps = {
      name: 'Auto',
      label: 'AutoComplete',
      options: [{name: 'Chris'}, {name: 'Dan'}, {name: 'Gerry'}],
      optionKey: 'name',    
    }
    return (
      <Form style={{width: '100%'}} noValidate method="post">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='caption'>Basic</Typography>
            <AutoComplete {...AutoCompleteProps} />
          </Grid>
        </Grid>
      </Form>
    )
  }}
</Formik>
```
