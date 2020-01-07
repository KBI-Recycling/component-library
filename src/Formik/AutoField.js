import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';
import {Field} from 'formik';

/**
 * A component that wraps @material-ui/lab Autocomplete with Formik form context. Underlying TextField component can be modified through the "textFieldProps" prop; see <a href='https://material-ui.com/api/text-field/' target="_blank">
 * TextField API</a> for details.
 *
 * @version 1.0.0
 * @author [Gerry Blackmon](https://github.com/gblackiv)
 * @author [Daniel Kinsbursky](https://github.com/kbi-daniel)
 * @author [Chris Voss](https://github.com/ChrisJVoss)
 * @param {object} props Properties passed down from parent component.
 * @return {JSX} A react JSX component.
 * @public
 *
 */
const AutoField = props => {
  const {disabled, fast, label, name, onBlur, onChange, options, optionLabel, required, autoSelect, textFieldProps, ...otherProps} = props;
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

AutoField.defaultProps = {
  fast: false,
  autoSelect: false,
};
AutoField.propTypes = {
  /** Auto Select (incomplete) */
  autoSelect: PropTypes.bool,
  /** If `true`, the `input` element will be disabled. */
  disabled: PropTypes.bool,
  /** If `true` component uses `<FastField />` as an optimized version of `<Field />`. Should only be used on large forms (~30+ fields) or when a field has very expensive validation requirements. `<FastField />` has the same exact API as `<Field>`, but implements `shouldComponentUpdate()` internally to block all additional re-renders unless there are direct updates to the `<FastField />'s` relevant parts/slice of Formik state. */ //eslint-disable-line
  fast: PropTypes.bool,
  /** The `label` content. If not set, `label` will default to `name` prop.  */
  label: PropTypes.string,
  /** A field's name in Formik state. Also, automatically sets the input's `id` attribute if not otherwise passed. */
  name: PropTypes.string.isRequired,
  /** Callback fired when the `input` loses focus. ***Signature:*** `({event, field, handlers, meta}) => {}`; */
  onBlur: PropTypes.func,
  /** Callback fired when the input's `value` is changed. ***Signature:*** `({event, field, handlers, meta}) => {}`; */
  onChange: PropTypes.func,
  /** String name of options object property. */
  optionLabel: PropTypes.string.isRequired,
  /** Array of objects. These are referenced by the 'optionLabel' prop. */
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** If `true`, the label is displayed as required and the input element will be required. */
  required: PropTypes.bool,
  /** Object to stylize the underlying MUI TextField component.  */
  textFieldProps: PropTypes.object,
};
export default AutoField;
