import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';
import {Field} from 'formik';

const AutocompleteField = ({disabled, fast, label, name, onBlur, onChange, options, optionLabel, required, autoSelect, textFieldProps, ...otherProps}) => {
  const autoCompleteProps = (form, field) => ({
    ...field,
    autoHighlight: true,
    autoSelect,
    clearOnEscape: true,
    disabled: form.isSubmitting || form.isValidating || disabled,
    disableOpenOnFocus: true,
    id: name,
    getOptionLabel: (option, state) => {
      if (typeof option === 'string') return option;
      else if (typeof option === 'number') return option.toString(10);
      else if (typeof option === 'object') return option[optionLabel];
      else return '';
    },
    options,
    onBlur: e => {
      form.setFieldTouched(field.name, true);
      if (onBlur) onBlur({field, form});
    },
    onChange: (e, value) => {
      if (value) form.setFieldValue(field.name, value[optionLabel]);
      else form.setFieldValue(field.name, '');
      if (onChange) {
        onChange({
          field: {...field, value: value},
          form: {...form, values: {...form.values, [name]: value}},
        });
      }
    },
    value: field.value,
    ...otherProps,
  });
  const renderInputProps = (form, field, params) => ({
    ...params,
    error: form.touched[name] && form.errors[name] ? true : false,
    fullWidth: true,
    helperText: form.touched[name] && form.errors[name],
    label: label ? label : name,
    margin: 'dense',
    required,
    ...textFieldProps,
  });

  if (fast) {
    return (
      <Field name={name}>
        {({form, field}) => (
          <Autocomplete
            {...autoCompleteProps(form, field)}
            renderInput={params => <TextField {...renderInputProps(form, field, params)} />}
          />
        )}
      </Field>
    );
  }
  return (
    <Field name={name}>
      {({form, field}) => (
        <Autocomplete
          {...autoCompleteProps(form, field)}
          renderInput={params => <TextField {...renderInputProps(form, field, params)} />}
        />
      )}
    </Field>
  );
};

AutocompleteField.defaultProps = {
  fast: false,
  autoSelect: false,
};
AutocompleteField.propTypes = {
  disabled: PropTypes.bool,
  fast: PropTypes.bool,
  optionLabel: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  required: PropTypes.bool,
  textFieldProps: PropTypes.object,
  autoSelect: PropTypes.bool,
};
export default AutocompleteField;
