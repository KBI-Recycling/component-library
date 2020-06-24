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

<Formik validateOnChange={false} initialValues={{ Developer: '', DeveloperMulti: [], DeveloperFreeSolo: '' }}>
  {formik => {
    const developerProps = {
      id: 'Developer',
      name: 'Developer',
      options: [{name: 'Chris'}, {name: 'Dan'}, {name: 'Gerry'}],
      optionKey: 'name',
    }
    const developerMultiProps = {
      id: 'DeveloperMulti',
      name: 'DeveloperMulti',
      label: 'Developers',
      multiple: true,
      options: [{name: 'Chris'}, {name: 'Dan'}, {name: 'Gerry'}],
      optionKey: 'name',
    }
    const developerFreeSoloProps = {
      id: 'DeveloperFreeSolo',
      name: 'DeveloperFreeSolo',
      label: 'Developers',
      freeSolo: true,
      options: [{name: 'Chris'}, {name: 'Dan'}, {name: 'Gerry'}],
      optionKey: 'name',
    }

    return (
      <Form style={{width: '100%'}} noValidate method="post">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant='caption'>Basic</Typography>
            <AutoComplete {...developerProps} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant='caption'>multiple</Typography>
            <AutoComplete {...developerMultiProps} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant='caption'>freeSolo</Typography>
            <AutoComplete {...developerFreeSoloProps} />
          </Grid>
        </Grid>
      </Form>
    )
  }}
</Formik>
```
