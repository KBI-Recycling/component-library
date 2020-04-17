How to Access:
```html
import {Formik} from '@kbi/component-library';
const {CheckboxGroup} = Formik;
```

CheckboxGroup Examples:

```js
import React from 'react'
import {Formik, Form} from 'formik';
import {Grid, Typography} from '@material-ui/core';

const basicBoxes = [
  {label: 'Gerry Blackmon', value: 'Gerry'},
  {label: 'Daniel Kinsbursky', value: 'Daniel'},
  {label: 'Chris Voss', value: 'Chris'},
];
const colorBoxes = [
  {label: 'Gerry Blackmon', value: 'Gerry'},
  {label: 'Daniel Kinsbursky', value: 'Daniel', CheckboxProps: {color: 'secondary'}},
  {label: 'Chris Voss', value: 'Chris', CheckboxProps: {color: 'default'}},
];
const hazards = [
  'Battery is warm to the touch (i.e. above room temperature).',
  'Battery has signs of heat damage, such as burn marks or warping.',
  'Battery has exposed/unprotected wires capable of causing an electric shock.',
  'Battery has signs of physical damage, such as dented, breached, or swollen components.',
  'Battery has other indicators that it may not be safe to transport as-is.',
  'None of the above.',
].map(hazard => ({value: hazard, label: hazard}));

<Formik validateOnChange={false} initialValues={{Developers: [], Hazards: [], Colors: ['Gerry', 'Daniel', 'Chris']}}>
  {formik => (
    <Form style={{width: '100%'}} noValidate method="post">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant='caption'>Basic</Typography>
          <CheckboxGroup name='Developers' id='CheckboxGroup:Basic' boxes={basicBoxes} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant='caption'>Row</Typography>
          <CheckboxGroup name='Developers' id='CheckboxGroup:Row' boxes={basicBoxes} row />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant='caption'>Colors</Typography>
          <CheckboxGroup name='Colors' label='Developers' id='CheckboxGroup:Colors' boxes={colorBoxes} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant='caption'>HelperText</Typography>
          <CheckboxGroup name='Developers' id='CheckboxGroup:HelperText' boxes={basicBoxes} row helperText='Helpful text can be placed here. NOTE: Text will be overwritten by error messages.' />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant='caption'>Required</Typography>
          <CheckboxGroup name='Developers' id='CheckboxGroup:Developers' boxes={basicBoxes} required />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant='caption'>Long Text</Typography>
          <CheckboxGroup name='Hazards' id='CheckboxGroup:LongText' boxes={hazards} />
        </Grid>
      </Grid>
    </Form>
  )}
</Formik>
```
