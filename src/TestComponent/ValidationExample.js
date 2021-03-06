import React, {useMemo} from 'react';
import {Formik, Form} from 'formik';
import {FormControlLabel, Grid, MenuItem, Radio} from '@material-ui/core';
import {AutoComplete, AutoCompleteObject, validateAutoObject, CurrencyField, DateField, NumberField, PasswordField, RadioGroup, SelectField, SwitchField, TextField, WeightField} from '../Formik';
import {object, string, date, number, boolean, array} from 'yup';

/**
 * A test component used to try out Formik components with validation.
 *
 * @version 1.0.0
 * @author [Gerry Blackmon](https://github.com/gblackiv)
 * @author [Daniel Kinsbursky](https://github.com/kbi-daniel)
 * @author [Chris Voss](https://github.com/ChrisJVoss)
 * @return {JSX} A react JSX component.
 * @public
 *
 */
validateAutoObject();
const ValidationExample = () => {
  const defaultFormik = {
    Text: '',
    Auto: '',
    AutoObject: '',
    AutoMultiple: [],
    Currency: '',
    Date: '',
    Number: '',
    Password: '',
    Radio: '',
    Select: '',
    Switch: false,
    Weight: '',
  };
  const validationSchema = object().shape({
    Text: string().required(),
    Auto: string().required(),
    AutoObject: object().exists('AutoObject is a required field.').nullable(),
    AutoMultiple: array().min(1),
    Currency: number().required().min(5).max(30),
    Date: date().required(),
    Number: number().required(),
    Password: string().required(),
    Radio: string().required(),
    Select: string().required(),
    Switch: boolean(),
    Weight: number().required(),
  });
  const handleSubmit = (values, actions) => {
    console.log(values);
  };
  const autoProps = useMemo(() => ({
    name: 'Auto',
    label: 'AutoComplete',
    options: [{name: 'Chris'}, {name: 'Dan'}, {name: 'Gerry'}],
    optionKey: 'name',
  }), []);

  const autoObjectProps = useMemo(() => ({
    name: 'AutoObject',
    label: 'AutoCompleteObject',
    options: [{name: 'Chris', info: 123}, {name: 'Dan', info: 456}, {name: 'Gerry', info: 789}],
    optionKey: 'name',
  }), []);
  const autoMultiple = {
    name: 'AutoMultiple',
    label: 'AutoCompleteObject Multiple',
    options: [{name: 'Chris', info: 123}, {name: 'Dan', info: 456}, {name: 'Gerry', info: 789}],
    optionKey: 'name',
    multiple: true,
  };
  return (
    <>
      <h1>Field Examples</h1>
      <Formik
        initialValues={{...defaultFormik}}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={true}
      >
        {formik => (
          <Form style={{width: '100%'}}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField name='Text' />
              </Grid>
              <Grid item xs={12}>
                <AutoComplete {...autoProps} />
              </Grid>
              <Grid item xs={12}>
                <AutoCompleteObject {...autoObjectProps} />
              </Grid>
              <Grid item xs={12}>
                <AutoCompleteObject {...autoMultiple} />
              </Grid>
              <Grid item xs={12}>
                <CurrencyField name='Currency' />
              </Grid>
              <Grid item xs={12}>
                <DateField name='Date' />
              </Grid>
              <Grid item xs={12}>
                <NumberField name='Number' />
              </Grid>
              <Grid item xs={12}>
                <PasswordField name='Password' />
              </Grid>
              <Grid item xs={12}>
                <SelectField name='Select'>
                  <MenuItem value={'Chris'}>Chris</MenuItem>
                  <MenuItem value={'Dan'}>Dan</MenuItem>
                  <MenuItem value={'Gerry'}>Gerry</MenuItem>
                </SelectField>
              </Grid>
              <Grid item xs={12}>
                <WeightField name='Weight' />
              </Grid>
              <Grid item xs={12}>
                <RadioGroup name='Radio' radios={[
                  {value: 'Gerry', label: 'Gerry'},
                  {value: 'Dan', label: 'Dan'},
                  {value: 'Chris', label: 'Chris'},
                ]} />
              </Grid>
              <Grid item xs={12}>
                <SwitchField name='Switch' />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ValidationExample;
