import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Formik, Form} from 'formik';
import {FormControlLabel, Grid, MenuItem, Radio} from '@material-ui/core';
import {AutoComplete, AutoCompleteObject, CurrencyField, DateField, NumberField, PasswordField, RadioGroup, SelectField, SwitchField, TextField, WeightField} from '../Formik';
import {object, string, date, number, boolean} from 'yup';

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
const ValidationExample = () => {
  const defaultFormik = {
    Text: '',
    Auto: '',
    AutoObject: '',
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
    // AutoObject: string().required(),
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
  return (
    <>
      <h1>Field Examples</h1>
      <Formik
        initialValues={{...defaultFormik}}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
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
                <RadioGroup name='Radio'>
                  <FormControlLabel value="Gerry" control={<Radio />} label="Gerry" />
                  <FormControlLabel value="Dan" control={<Radio />} label="Dan" />
                  <FormControlLabel value="Chris" control={<Radio />} label="Chris" />
                </RadioGroup>
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

ValidationExample.defaultProps = {
  text: 'World',
};
ValidationExample.propTypes = {
};
export default ValidationExample;
