import React from 'react';
import PropTypes from 'prop-types';
import MuiTextField from '@material-ui/core/TextField';
import {FastField, Field} from 'formik';
import libphonenumber from 'google-libphonenumber';
const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
const PNF = libphonenumber.PhoneNumberFormat;
// eslint-disable-next-line no-useless-escape
const phoneNumChars = /^[0-9 ()+-.\[\]]*$/;

/**
 * A component that wraps Material UI TextField with Formik form context and only accepts number and phone number special character inputs.
 * Also can be validated by importing validatePhoneField, and chaining validPhoneNumber('error message here') to yup.string.
 * Commonly used TextField props are described below in the PROPS & METHODS section. Less common props can also be passed;
 * see <a href='https://material-ui.com/api/text-field/' target="_blank">TextField API</a> for details.
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
const PhoneNumberField = (props) => {
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
    formatOnBlur,
    formatType,
    ...otherProps
  } = props;

  const textFieldProps = formik => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
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
        if (!event.target.value) return;
        const number = phoneUtil.parseAndKeepRawInput(event.target.value, 'US');
        const numberFormat = phoneUtil.format(number, PNF[formatType]);
        if (phoneUtil.isValidNumber(number) && formatOnBlur) {
          form.setFieldValue(name, numberFormat);
        }
        field.onBlur(event);
        if (onBlur) onBlur({event, field, form, meta});
      },
      onChange: event => {
        if (event.target.value.match(phoneNumChars)) {
          field.onChange(event);
          if (onChange) onChange({event, field, form, meta});
        }
      },
    };
  };

  if (fast) {
    return <FastField name={name}>
      {formik => <MuiTextField {...textFieldProps(formik)} {...otherProps} />}
    </FastField>;
  }
  return <Field name={name}>
    {formik => <MuiTextField {...textFieldProps(formik)} {...otherProps} />}
  </Field>;
};

PhoneNumberField.defaultProps = {
  color: 'primary',
  disabled: false,
  error: false,
  fast: false,
  fullWidth: true,
  margin: 'dense',
  required: false,
  variant: 'standard',
  formatType: 'INTERNATIONAL',
  formatOnBlur: true,
};
PhoneNumberField.propTypes = {
  /** The color of the component. It supports those theme colors that make sense for this component. */
  color: PropTypes.oneOf(['primary', 'secondary']),
  /** If true, the input element will be disabled.*/
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
  /** Callback fired when the `input` loses focus. ***Signature:*** `({event, field, form, meta}) => {}`; */
  onBlur: PropTypes.func,
  // eslint-disable-next-line max-len
  /** The type of format the value will be set in on blur. Must be one of the valid types declared on https://ruimarinho.github.io/google-libphonenumber/#google-libphonenumber-i18nphonenumbersphonenumberformat  */
  formatType: PropTypes.oneOf(['E164', 'INTERNATIONAL', 'NATIONAL', 'RFC3966']),
  /** A boolean that controls whether the field will format the input or not. */
  formatOnBlur: PropTypes.bool,
  /** Callback fired when the input's `value` is changed. ***Signature:*** `({event, field, form, meta}) => {}`; */
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
export default PhoneNumberField;
