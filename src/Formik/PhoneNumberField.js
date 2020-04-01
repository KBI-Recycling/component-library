import React, {useState} from 'react';
import PropTypes from 'prop-types';
import MuiTextField from '@material-ui/core/TextField';
import {FastField, Field} from 'formik';
import libphonenumber from 'google-libphonenumber';
const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
const PNF = libphonenumber.PhoneNumberFormat;
const alphaChars = /[a-zA-Z]+/;

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
    const [lastKeyPress, setLastKeyPress] = useState(null);
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
        if (event.target.value.match(alphaChars)) return;
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
        field.onChange(event);
        if (onChange) onChange({event, field, form, meta});
      },
      onKeyDown: event => {
        // eslint-disable-next-line max-len
        const persistKeyCodes = [8, 9, 13, 37, 39, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 189, 109, 16, 187, 32];
        setLastKeyPress(event.keyCode);
        if (event.keyCode === 86 && lastKeyPress === 17) event.persist();
        else if (persistKeyCodes.includes(event.keyCode)) event.persist();
        else event.preventDefault();
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
  /** If true, text field will be disabled. */
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

const countryCodes = [
  '+1',
  '+7',
  '+20',
  '+27',
  '+30',
  '+31',
  '+32',
  '+33',
  '+34',
  '+36',
  '+39',
  '+40',
  '+41',
  '+43',
  '+44',
  '+45',
  '+46',
  '+47',
  '+48',
  '+49',
  '+51',
  '+52',
  '+53',
  '+54',
  '+55',
  '+56',
  '+57',
  '+58',
  '+60',
  '+61',
  '+62',
  '+63',
  '+64',
  '+65',
  '+66',
  '+81',
  '+82',
  '+84',
  '+86',
  '+90',
  '+91',
  '+92',
  '+93',
  '+94',
  '+95',
  '+98',
  '+211',
  '+212',
  '+213',
  '+216',
  '+218',
  '+220',
  '+221',
  '+222',
  '+223',
  '+224',
  '+225',
  '+226',
  '+227',
  '+228',
  '+229',
  '+230',
  '+231',
  '+232',
  '+233',
  '+234',
  '+235',
  '+236',
  '+237',
  '+238',
  '+239',
  '+240',
  '+241',
  '+242',
  '+243',
  '+244',
  '+245',
  '+246',
  '+248',
  '+249',
  '+250',
  '+251',
  '+252',
  '+253',
  '+254',
  '+255',
  '+256',
  '+257',
  '+258',
  '+260',
  '+261',
  '+262',
  '+263',
  '+264',
  '+265',
  '+266',
  '+267',
  '+268',
  '+269',
  '+290',
  '+291',
  '+297',
  '+298',
  '+299',
  '+350',
  '+351',
  '+352',
  '+353',
  '+354',
  '+355',
  '+356',
  '+357',
  '+358',
  '+359',
  '+370',
  '+371',
  '+372',
  '+373',
  '+374',
  '+375',
  '+376',
  '+377',
  '+378',
  '+379',
  '+380',
  '+381',
  '+382',
  '+383',
  '+385',
  '+386',
  '+387',
  '+389',
  '+420',
  '+421',
  '+423',
  '+500',
  '+501',
  '+502',
  '+503',
  '+504',
  '+505',
  '+506',
  '+507',
  '+508',
  '+509',
  '+590',
  '+591',
  '+592',
  '+593',
  '+595',
  '+597',
  '+598',
  '+599',
  '+670',
  '+672',
  '+673',
  '+674',
  '+675',
  '+676',
  '+677',
  '+678',
  '+679',
  '+680',
  '+681',
  '+682',
  '+683',
  '+685',
  '+686',
  '+687',
  '+688',
  '+689',
  '+690',
  '+691',
  '+692',
  '+850',
  '+852',
  '+853',
  '+855',
  '+856',
  '+880',
  '+886',
  '+960',
  '+961',
  '+962',
  '+963',
  '+964',
  '+965',
  '+966',
  '+967',
  '+968',
  '+970',
  '+971',
  '+972',
  '+973',
  '+974',
  '+975',
  '+976',
  '+977',
  '+992',
  '+993',
  '+994',
  '+995',
  '+996',
  '+998',
];
