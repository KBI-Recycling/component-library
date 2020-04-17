import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Autocomplete} from '@material-ui/lab';
import {Field} from 'formik';

/**
 * A component that wraps Material UI Autocomplete with Formik form context. This component returns the string value associated with the selected
 * option's "optionKey" property. Commonly used props are described below in the PROPS & METHODS section. Less common props can also be passed;
 * see <a href='https://material-ui.com/api/autocomplete/' target="_blank">AutoComplete API</a>. Underlying TextField component can be modified through
 * the "textFieldProps" prop; see <a href='https://material-ui.com/api/text-field/' target="_blank"> TextField API</a> for details.
 *
 * @version 1.0.1
 * @author [Gerry Blackmon](https://github.com/gblackiv)
 * @author [Daniel Kinsbursky](https://github.com/kbi-daniel)
 * @author [Chris Voss](https://github.com/ChrisJVoss)
 * @param {object} props Properties passed down from parent component.
 * @return {JSX} A react JSX component.
 * @public
 *
 */
const AutoCompleteValue = props => {
  const {disabled, fast, label, name, onBlur, onChange, options, optionKey, required, autoSelect, textFieldProps, ...otherProps} = props;
  const classes = useStyles();
  const optionsMemo = useMemo(() => {
    const valueSet = new Set();
    const valueRefs = {};
    options.forEach(option => {
      const currentOption = option[optionKey];
      if (!valueSet.has(currentOption)) {
        valueSet.add(currentOption);
        valueRefs[currentOption] = option;
      }
    });
    if (!valueSet.has('')) valueSet.add(''); // Add empty string to set to ensure no MUI getOptionSelected warning when passing '' from Formik
    return {values: [...valueSet], refs: {...valueRefs}};
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const autoCompleteProps = (form, field) => ({
    ...field,
    autoHighlight: true,
    autoSelect,
    classes: {tagSizeSmall: classes.tagSizeSmall},
    clearOnEscape: true,
    disabled: form.isSubmitting || form.isValidating || disabled,
    filterOptions: (options, state) => {
      return options.filter(option => {
        if (option === '') return false; // Remove empty string to ensure no MUI getOptionSelected warning
        else if (option.toLowerCase().indexOf(state.inputValue.toLowerCase()) === -1) return false;
        return true;
      });
    },
    id: name,
    ListboxProps: {style: {maxHeight: '200px'}},
    options: optionsMemo.values,
    onBlur: e => {
      form.setFieldTouched(field.name, true);
      if (onBlur) onBlur({field, form});
    },
    onChange: (e, value) => {
      if (!value) form.setFieldValue(field.name, '');
      else form.setFieldValue(field.name, value);
      if (onChange) {
        if (!value) onChange({field, form, value, selected: null});
        if (typeof value === 'string') onChange({field, form, value, selected: optionsMemo.refs[value]});
        if (Array.isArray(field.value)) onChange({field, form, value, selected: value.map(item => optionsMemo.refs[item])});
      }
    },
    size: 'small',
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
          <Autocomplete {...autoCompleteProps(form, field)} renderInput={params => <TextField {...renderInputProps(form, field, params)} />} />
        )}
      </Field>
    );
  }
  return (
    <Field name={name}>
      {({form, field}) => (
        <Autocomplete {...autoCompleteProps(form, field)} renderInput={params => <TextField {...renderInputProps(form, field, params)} />} />
      )}
    </Field>
  );
};

const useStyles = makeStyles({
  tagSizeSmall: {
    backgroundColor: 'white',
    border: '1px solid lightskyblue',
    borderRadius: '5px',
  },
});
AutoCompleteValue.defaultProps = {
  autoSelect: false,
  disabled: false,
  fast: false,
  multiple: false,
  required: false,
};
AutoCompleteValue.propTypes = {
  /** If `true`, the selected option becomes the value of the input when the Autocomplete loses focus unless the user chooses a different option or changes the character string in the input. */
  autoSelect: PropTypes.bool,
  /** If `true`, the `input` element will be disabled. */
  disabled: PropTypes.bool,
  /** If `true` component uses `<FastField />` as an optimized version of `<Field />`. Should only be used on large forms (~30+ fields) or when a field has very expensive validation requirements. `<FastField />` has the same exact API as `<Field>`, but implements `shouldComponentUpdate()` internally to block all additional re-renders unless there are direct updates to the `<FastField />'s` relevant parts/slice of Formik state. */ //eslint-disable-line
  fast: PropTypes.bool,
  /** The `label` content. If not set, `label` will default to `name` prop.  */
  label: PropTypes.string,
  /** If true, formik value must be an array and the input will support multiple selections. */
  multiple: PropTypes.bool,
  /** A field's name in Formik state. Also, automatically sets the input's `id` attribute if not otherwise passed. */
  name: PropTypes.string.isRequired,
  /** Callback fired when the `input` loses focus. ***Signature:*** `({event, field, handlers, meta}) => {}`; */
  onBlur: PropTypes.func,
  /** Callback fired when the input's `value` is changed. ***Signature:*** `({event, field, handlers, meta}) => {}`; */
  onChange: PropTypes.func,
  /** String name of options object property. */
  optionKey: PropTypes.string.isRequired,
  /** Array of objects. These are referenced by the 'optionKey' prop. */
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** If `true`, the label is displayed as required and the input element will be required. */
  required: PropTypes.bool,
  /** Object to pass props to underlying MUI TextField component.  */
  textFieldProps: PropTypes.object,
};
export default AutoCompleteValue;
