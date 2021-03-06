import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import MuiTextField from '@material-ui/core/TextField';
import {FastField, Field} from 'formik';

/**
 * A component that wraps Material UI TextField with Formik form context and default to standard Vehicle Identification Number (VIN) requirements;
 * i.e. no more than 17 characters and always updated to uppercase on blur. Commonly used TextField props are described below in the PROPS & METHODS section.
 * Less common props can also be passed; see <a href='https://material-ui.com/api/text-field/' target="_blank">TextField API</a> for details.
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
const VinField = (props) => {
  const {
    color,
    disabled,
    error,
    fast,
    fullWidth,
    helperText,
    id,
    label,
    margin,
    name,
    onBlur,
    onChange,
    placeholder,
    required,
    size,
    variant,
    ...otherProps
  } = props;
  const textFieldProps = useCallback(formik => {
    const {field, form, meta} = formik;
    return {
      ...field,
      color,
      disabled: disabled || form.isSubmitting,
      error: error || (meta.touched && meta.error) ? true : false,
      fullWidth,
      helperText: (() => {
        if (meta.touched && meta.error) return meta.error;
        else if (helperText) return helperText;
        else return '';
      })(),
      id: id || name,
      label: label || name,
      margin,
      placeholder,
      required,
      size,
      variant,
      onBlur: event => {
        field.onBlur(event);
        const uppercaseVIN = form.values[field.name].toUpperCase();
        form.setFieldValue(name, uppercaseVIN);
        if (onBlur) onBlur({event, field, form, meta});
      },
      onChange: event => {
        if (event.target.value.length <= 17) field.onChange(event);
        if (onChange) onChange({event, field, form, meta});
      },
    };
  }, [color, disabled, error, fullWidth, helperText, id, label, margin, name, onBlur, onChange, placeholder, required, size, variant]);

  if (fast) {
    return <FastField name={name}>
      {formik => <MuiTextField {...textFieldProps(formik)} {...otherProps} />}
    </FastField>;
  }
  return <Field name={name}>
    {formik => <MuiTextField {...textFieldProps(formik)} {...otherProps} />}
  </Field>;
};

VinField.defaultProps = {
  color: 'primary',
  disabled: false,
  error: false,
  fast: false,
  fullWidth: true,
  margin: 'dense',
  required: false,
  variant: 'standard',
};
VinField.propTypes = {
  /** The color of the component. It supports those theme colors that make sense for this component. */
  color: PropTypes.oneOf(['primary', 'secondary']),
  /** If `true`, the `input` element will be disabled. */
  disabled: PropTypes.bool,
  /** If `true`, the label will be displayed in an error state. */
  error: PropTypes.bool,
  /** If `true` component uses `<FastField />` as an optimized version of `<Field />`. Should only be used on large forms (~30+ fields) or when a field has very expensive validation requirements. `<FastField />` has the same exact API as `<Field>`, but implements `shouldComponentUpdate()` internally to block all additional re-renders unless there are direct updates to the `<FastField />'s` relevant parts/slice of Formik state. */ //eslint-disable-line
  fast: PropTypes.bool,
  /** If `true`, the input will take up the full width of its container. */
  fullWidth: PropTypes.bool,
  /** The helper text content. ***Note:*** Formik error messages take priority over hardcoded helper text content. */
  helperText: PropTypes.node,
  /** The `id` of the input element. Use this prop to make label and helperText accessible for screen readers. If not set, `id` will default to `name` prop. */
  id: PropTypes.string,
  /** The `label` content. If not set, `label` will default to `name` prop.  */
  label: PropTypes.string,
  /** If `dense` or `normal`, will adjust vertical spacing of this and contained components. */
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
  /** A field's name in Formik state. Also, automatically sets the input's `id` attribute if not otherwise passed. */
  name: PropTypes.string.isRequired,
  /** Callback fired when the `input` loses focus. ***Signature:*** `({event, field, handlers, meta}) => {}`; */
  onBlur: PropTypes.func,
  /** Callback fired when the input's `value` is changed. ***Signature:*** `({event, field, handlers, meta}) => {}`; */
  onChange: PropTypes.func,
  /** The short hint displayed in the input before the user enters a value. */
  placeholder: PropTypes.string,
  /** If `true`, the label is displayed as required and the input element will be required. */
  required: PropTypes.bool,
  /** The size of the text field. */
  size: PropTypes.oneOf(['small', 'medium']),
  /** The variant to use. */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};
export default VinField;
