import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import MuiTextField from '@material-ui/core/TextField';
import {FastField, useField, useFormikContext} from 'formik';

/**
 * A wrapper to seamlessly merge Material UI TextField with Formik form context.
 *
 * @version 1.0.0
 * @author [Daniel Kinsbursky](https://github.com/kbi-daniel)
 * @author [Chris Voss](https://github.com/ChrisJVoss)
 * @author [Gerry Blackmon](https://github.com/gblackiv)
 * @param {object} props Properties passed down from parent component.
 * @return {JSX} A react JSX component.
 * @public
 *
 */
const TextField = (props) => {
  const {autoComplete, autoFocus, classes, color, disabled, error, fast, FormHelperTextProps} = props;
  const {fullWidth, helperText, id, InputLabelProps, inputProps, inputRef, label, margin, multiline} = props;
  const {name, onBlur, onChange, placeholder, required, rows, rowsMax, size, variant} = props;

  const form = useFormikContext();
  const [field, meta] = useField(name);
  const formProps = {
    disabled: disabled || form.isSubmitting,
    onBlur: event => {
      field.onBlur(event);
      if (onBlur) onBlur({event, field, form, meta});
    },
    onChange: event => {
      field.onChange(event);
      if (onChange) onChange({event, field, form, meta});
    },
  };
  const metaProps = useMemo(() => ({
    error: error || (meta.touched && meta.error) ? true : false,
    helperText: (() => {
      if (meta.touched && meta.error) return meta.error;
      else if (helperText) return helperText;
    })(),
  }), [error, helperText, meta.error, meta.touched]);
  const textFieldProps = {
    ...field,
    autoComplete,
    autoFocus,
    classes,
    color,
    FormHelperTextProps,
    fullWidth,
    id: id || name,
    InputLabelProps,
    inputProps,
    inputRef,
    label: label || name,
    margin,
    multiline,
    placeholder,
    required,
    rows,
    rowsMax,
    size,
    variant,
  };

  if (fast) {
    return (
      <FastField name={name}>
        {() => <MuiTextField {...textFieldProps} {...metaProps} {...formProps} />}
      </FastField>
    );
  }
  return <MuiTextField {...textFieldProps} {...metaProps} {...formProps} />;
};

TextField.defaultProps = {
  autoFocus: false,
  color: 'primary',
  disabled: false,
  error: false,
  fast: false,
  fullWidth: true,
  margin: 'dense',
  multiline: false,
  required: false,
  variant: 'standard',
};
TextField.propTypes = {
  /** This prop helps users to fill forms faster, especially on mobile devices. The name can be confusing, as it's more like an autofill. You can learn more about it <a href='https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill'>following the specification.</a> */ //eslint-disable-line
  autoComplete: PropTypes.string,
  /** If `true`, the `input` element will be focused during the first mount. */
  autoFocus: PropTypes.bool,
  /** Override or extend the styles applied to the component. See <a href='https://material-ui.com/api/text-field/#css'>CSS API</a> below for more details. */
  classes: PropTypes.object,
  /** The color of the component. It supports those theme colors that make sense for this component. */
  color: PropTypes.oneOf(['primary', 'secondary']),
  /** If `true`, the `input` element will be disabled. */
  disabled: PropTypes.bool,
  /** If `true`, the label will be displayed in an error state. */
  error: PropTypes.bool,
  /** If `true` component uses `<FastField />` as an optimized version of `<Field />`. Should only be used on large forms (~30+ fields) or when a field has very expensive validation requirements. `<FastField />` has the same exact API as `<Field>`, but implements `shouldComponentUpdate()` internally to block all additional re-renders unless there are direct updates to the `<FastField />'s` relevant parts/slice of Formik state. */ //eslint-disable-line
  fast: PropTypes.bool,
  /** Props applied to the <a href='https://material-ui.com/api/form-helper-text/'>FormHelperText</a> element. */
  FormHelperTextProps: PropTypes.object,
  /** If `true`, the input will take up the full width of its container. */
  fullWidth: PropTypes.bool,
  /** The helper text content. ***Note:*** Formik error messages take priority over hardcoded helper text content. */
  helperText: PropTypes.node,
  /** The id of the input element. Use this prop to make label and helperText accessible for screen readers. Should probably never use, since Formik will manage internally by using field name. */
  id: PropTypes.string,
  /** Props applied to the `InputLabel` element. */
  InputLabelProps: PropTypes.object,
  /** Object of <a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes'>Attributes</a> applied to the `input` element. */
  inputProps: PropTypes.object,
  /** Pass a ref to the `input` element. */
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({current: PropTypes.elementType})]),
  /** The label content. */
  label: PropTypes.string,
  /** If `dense` or `normal`, will adjust vertical spacing of this and contained components. */
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
  /** if true, a `textarea` element will be rendered instead of an input. */
  multiline: PropTypes.bool,
  /** A field's name in Formik state. Also, automatically set to the input's `id` attribute. */
  name: PropTypes.string.isRequired,
  /** Callback fired when the `input` loses focus. ***Signature:*** `({event, field, form}) => {}`; */
  onBlur: PropTypes.func,
  /** Callback fired when the input's `value` is changed. ***Signature:*** `({event, field, form}) => {}`; */
  onChange: PropTypes.func,
  /** The short hint displayed in the input before the user enters a value. */
  placeholder: PropTypes.string,
  /** If `true`, the label is displayed as required and the input element will be required. */
  required: PropTypes.bool,
  /** Number of rows to display when multiline option is set to true. */
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Maximum number of rows to display when multiline option is set to true. */
  rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** The size of the text field. */
  size: PropTypes.oneOf(['small', 'medium']),
  /** The variant to use. */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};
export default TextField;
