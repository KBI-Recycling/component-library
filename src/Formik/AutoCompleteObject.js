import React, {useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Autocomplete} from '@material-ui/lab';
import {makeStyles} from '@material-ui/core/styles';
import {Field, FastField} from 'formik';
import get from 'lodash.get';
import {TextField} from '@material-ui/core';
import matchSorter from 'match-sorter';

/**
 * A component that wraps @material-ui/lab Autocomplete with Formik form context. Underlying TextField component can be modified through the "textFieldProps" prop;
 * see <a href='https://material-ui.com/api/text-field/' target="_blank"> TextField API</a> for details. This component returns the object associated with the
 * selected option and requires special validation via the use of the "exists" method added to Yup validation.
 *
 * To add validation to AutoCompleteObject, include 'validateAutoObject' in the import statement and call it before defining the React component.
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
const AutoCompleteObject = ({disabled, options, loadingText, optionKey, autoHighlight, fast, fuzzy, noOptionsText, name, onBlur, onChange, loading, filterSelectedOptions, autoSelect, clearOnEscape, freeSolo, multiple, disableClearable, ...otherProps}) => {
  const [shrunkLabel, setShrunkLabel] = useState(false);
  const classes = useStyles();

  const filterOptions = (options, {inputValue}) => {
    if (fuzzy) {
      const fuzzyOptions = matchSorter(options, inputValue, {keys: [optionKey]});
      return fuzzyOptions.filter(option => option === '' ? false : true);
    }
    return options.filter(option => {
      if (option === '') return false; // Remove empty string to ensure no MUI getOptionSelected warning
      else if (get(option, optionKey, '').toLowerCase().indexOf(inputValue.toLowerCase()) === -1) return false;
      return true;
    });
  };

  const optionsWithEmptyString = useMemo(() => {
    const returnOptions = [...options];
    returnOptions.push('');
    return returnOptions;
  }, [options]);

  const textFieldProps = ({field, form, params}) => {
    return {
      ...params,
      error: get(form.touched, name) && get(form.errors, name) ? true : false,
      fullWidth: true,
      helperText: get(form.touched, name) && get(form.errors, name),
      id: name,
      label: name,
      name: name,
      margin: 'dense',
      value: field.value,
      ...otherProps,
    };
  };

  const autocompleteProps = ({field, form}) => {
    return ({
      options: optionsWithEmptyString,
      autoSelect,
      autoHighlight,
      multiple,
      freeSolo,
      loading,
      filterSelectedOptions,
      loadingText,
      filterOptions,
      disableClearable,
      classes: {tagSizeSmall: classes.tagSizeSmall},
      size: 'small',
      disableCloseOnSelect: multiple ? true : false,
      value: !multiple ? field.value : field.value || [],
      noOptionsText: noOptionsText,
      disabled: form.isSubmitting || form.isValidating || disabled,
      getOptionSelected: (option, inputValue) => {
        if (inputValue === '' && option === '') {
          return true;
        } else if (get(option, optionKey, '') === get(inputValue, optionKey, '')) {
          return true;
        }
      },
      getOptionLabel: option => get(option, optionKey, ''),
      renderInput: params => {
        // eslint-disable-next-line max-len
        return (<TextField {...{...params, InputLabelProps: {...params.InputLabelProps, shrink: !!field.value || shrunkLabel}, inputProps: {...params.inputProps, autoComplete: 'off'}}}
          {...textFieldProps({form, field, params})}
        />);
      },
      onChange: (e, value) => {
        const valueToSet = value === null ? '' : value;
        form.setFieldValue(field.name, valueToSet );
        if (value) setShrunkLabel(true);
        if (onChange) {
          onChange({
            field: {...field, value: valueToSet},
            form: {...form, values: {...form.values, [name]: valueToSet}},
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
    })
    ;
  };

  if (fast) {
    return (<FastField name={name}>
      {({field, form}) => <Autocomplete {...field} {...autocompleteProps({field, form})} />}
    </FastField>);
  }
  return (<Field name={name}>
    {({field, form}) => <Autocomplete {...field} {...autocompleteProps({field, form})} />}
  </Field>);
};

const useStyles = makeStyles({
  tagSizeSmall: {
    backgroundColor: 'white',
    border: '1px solid lightskyblue',
    borderRadius: '5px',
  },
});
AutoCompleteObject.defaultProps = {
  autoHighlight: true,
  autoSelect: false,
  clearOnEscape: true,
  disabled: false,
  disableClearable: false,
  fast: false,
  filterSelectedOptions: false,
  fuzzy: false,
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
  /** If `true`, the `input` element will be disabled. */
  disabled: PropTypes.bool,
  /** If `true` component uses `<FastField />` as an optimized version of `<Field />`. Should only be used on large forms (~30+ fields) or when a field has very expensive validation requirements. `<FastField />` has the same exact API as `<Field>`, but implements `shouldComponentUpdate()` internally to block all additional re-renders unless there are direct updates to the `<FastField />'s` relevant parts/slice of Formik state. */ //eslint-disable-line
  fast: PropTypes.bool,
  /** (incomplete) */
  filterSelectedOptions: PropTypes.bool,
  /** (incomplete) */
  freeSolo: PropTypes.bool,
  /** If `true` component will use fuzzy searching to return close (but not exact) options based on user entered value (e.g. "CT" will return "Cat"). */
  fuzzy: PropTypes.bool,
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
export default AutoCompleteObject;
