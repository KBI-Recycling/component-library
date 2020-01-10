/* eslint-disable react/display-name */
/* eslint-disable no-invalid-this */
import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {Autocomplete} from '@material-ui/lab';
import {createFilterOptions} from '@material-ui/lab/Autocomplete';
import {Field, FastField} from 'formik';
import get from 'lodash.get';
import {TextField} from '@material-ui/core';
import * as Yup from 'yup';

/**
 * A component that wraps @material-ui/lab Autocomplete with Formik form context. Underlying TextField component can be modified through the "textFieldProps" prop;
 * see <a href='https://material-ui.com/api/text-field/' target="_blank"> TextField API</a> for details. This component returns the object associated with the
 * selected option and requires special validation via the use of the "exists" method added to Yup validation.
 *
 * To add validation to AutoCompleteObject, include 'validateAutoObject' in the import statement and call it before defining the React component.
 *
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
// eslint-disable-next-line max-len
export const AutoCompleteObject = ({options, loadingText, optionKey, autoHighlight, fast, noOptionsText, name, onBlur, onChange, loading, filterSelectedOptions, autoSelect, clearOnEscape, freeSolo, multiple, disableClearable, ...otherProps}) => {
  const [shrunkLabel, setShrunkLabel] = useState(false);
  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: option => get(option, optionKey, ''),
  });

  const textFieldProps = useCallback((formik) => {
    const {field, form, meta} = formik;
    return {
      ...field,
      disabled: form.isSubmitting,
      error: meta.touched && meta.error,
      fullWidth: true,
      helperText: (() => {
        if (meta.touched && meta.error) return meta.error;
        else return '';
      })(),
      id: name,
      label: name,
      name: name,
      margin: 'dense',
      value: field.value,
      ...otherProps,
    };
  }, [name, otherProps]);
  const autocompleteProps = useCallback((formik) => {
    const {field, form} = formik;
    return ({
      options,
      autoSelect,
      autoHighlight,
      multiple,
      freeSolo,
      loading,
      filterSelectedOptions,
      loadingText,
      filterOptions,
      disableClearable,
      disableCloseOnSelect: multiple ? true : false,
      value: !multiple ? field.value : field.value || [],
      noOptionsText: noOptionsText,
      disabled: form.isSubmitting || otherProps.disabled,
      getOptionLabel: option => get(option, optionKey, ''),
      renderInput: params => {
      // eslint-disable-next-line max-len
        return (<TextField {...{...params, InputLabelProps: {...params.InputLabelProps, shrink: !!field.value || shrunkLabel}, inputProps: {...params.inputProps, autoComplete: 'off'}}}
          {...textFieldProps(formik)}
        />);
      },
      onChange: (e, value) => {
        form.setFieldValue(field.name, value );
        if (value) setShrunkLabel(true);
        if (onChange) {
          onChange({
            field: {...field, value: value},
            form: {...form, values: {...form.values, [name]: value}},
          });
        }
      },
      onBlur: e => {
        e.persist();
        setTimeout(() => {
        // this timeout is set in order to allow the autocomplete autoSelect property to fire properly
        // both the validation on the field, and the select fire on blur,
        // and it was causing validation to throw an error on the field even with a value assigned to it
          field.onBlur(e);
        }, 50);
        if (onBlur) onBlur(e);
        if (!field.value) setShrunkLabel(false);
      },
      onFocus: e => setShrunkLabel(true),
    });
  }, [autoHighlight, autoSelect, disableClearable, filterOptions, filterSelectedOptions, freeSolo, loading, loadingText, multiple, name, noOptionsText, onBlur, onChange, optionKey, options, otherProps.disabled, shrunkLabel, textFieldProps]); //eslint-disable-line

  if (fast) {
    return (
      <FastField name={name}>
        {(formik) => (
          <Autocomplete {...autocompleteProps(formik)} />
        )}
      </FastField>
    );
  }
  return (
    <Field name={name}>
      {(formik) => (
        <Autocomplete {...autocompleteProps(formik)} />
      )}
    </Field>
  );
};

AutoCompleteObject.defaultProps = {
  autoHighlight: true,
  autoSelect: true,
  clearOnEscape: true,
  disableClearable: false,
  fast: false,
  filterSelectedOptions: false,
  freeSolo: false,
  loading: false,
  loadingText: 'Loading...',
  multiple: false,
  noOptionsText: 'No Options',
  optionKey: 'value',
};
AutoCompleteObject.propTypes = {
  /** Auto Highlight (incomplete) */
  autoHighlight: PropTypes.bool,
  /** Auto Select (incomplete) */
  autoSelect: PropTypes.bool,
  /** (incomplete) */
  clearOnEscape: PropTypes.bool,
  /** (incomplete) */
  disableClearable: PropTypes.bool,
  /** If `true` component uses `<FastField />` as an optimized version of `<Field />`. Should only be used on large forms (~30+ fields) or when a field has very expensive validation requirements. `<FastField />` has the same exact API as `<Field>`, but implements `shouldComponentUpdate()` internally to block all additional re-renders unless there are direct updates to the `<FastField />'s` relevant parts/slice of Formik state. */ //eslint-disable-line
  fast: PropTypes.bool,
  /** (incomplete) */
  filterSelectedOptions: PropTypes.bool,
  /** (incomplete) */
  freeSolo: PropTypes.bool,
  /** (incomplete) */
  loading: PropTypes.bool,
  /** (incomplete) */
  loadingText: PropTypes.string,
  /** Allows the component to accept multiple options */
  multiple: PropTypes.bool,
  /** A field's name in Formik state. Also, automatically sets the input's `id` attribute if not otherwise passed. */
  name: PropTypes.string.isRequired,
  /** Message to display when no matching options exist */
  noOptionsText: PropTypes.string,
  /** Callback fired when the `input` loses focus. ***Signature:*** `({event, field, handlers, meta}) => {}`; */
  onBlur: PropTypes.func,
  /** Callback fired when the input's `value` is changed. ***Signature:*** `({event, field, handlers, meta}) => {}`; */
  onChange: PropTypes.func,
  /** String name of options object property. */
  optionKey: PropTypes.string,
  /** Array of objects. These are referenced by the 'optionKey' prop. */
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// eslint-disable-next-line require-jsdoc
export function validateAutoObject() {
  Yup.addMethod(Yup.object, 'exists', function(message) {
    return this.test('not empty string', message, function(value) {
      if (!value && value !== null) {
        throw this.createError({
          path: `${this.path}`,
        });
      }
      return true;
    });
  });
}
