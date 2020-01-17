import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {Field, useField} from 'formik';
import {FormControl, FormHelperText, FormLabel} from '@material-ui/core';
import MuiRadioGroup from '@material-ui/core/RadioGroup';

/**
 * A component that wraps Material UI FormControl and RadioGroup with Formik form context. Commonly used FormControl props are described below in the PROPS & METHODS section.
 * Less common props can also be passed; see <a href='https://material-ui.com/api/form-control/' target="_blank">FormControl API</a>
 * and <a href='https://material-ui.com/api/radio/' target="_blank">Radio API</a> for details.
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
const RadioGroup = (props) => {
  const {children, disabled, helperText, id, label, margin, name, onChange, required, row, ...otherProps} = props;
  const [field, meta, helpers] = useField(name); //eslint-disable-line
  const formControlProps = useCallback((form) => {
    return {
      disabled: disabled || form.isSubmitting,
      error: Boolean(form.touched[name] && form.errors[name]),
      fullWidth: true,
      id: id || name,
      margin,
      required,
      onChange: event => {
        field.onChange(event);
        if (onChange) onChange({event, field, form, meta});
      },
    };
  }, [disabled, field, id, margin, meta, name, onChange, required]);

  return (
    <Field name={name}>
      {formik => (
        <FormControl component="fieldset" id={name} {...formControlProps(formik.form)} {...otherProps}>
          <FormLabel component="legend">{label || name}</FormLabel>
          <MuiRadioGroup {...formik.field} row={row}>{children}</MuiRadioGroup>
          {(meta.touched && meta.error) && <FormHelperText error={true}>{meta.error}</FormHelperText>}
          {helperText && !(meta.touched && meta.error) && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      )}
    </Field>
  );
};

RadioGroup.defaultProps = {
  disabled: false,
  error: false,
  margin: 'none',
  row: false,
};
RadioGroup.propTypes = {
  /** The content of the component. */
  children: PropTypes.array,
  /** If `true`, the `FormControl` element will be disabled. */
  disabled: PropTypes.bool,
  /** If `true`, the label will be displayed in an error state. */
  error: PropTypes.bool,
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
  /** Callback fired when the input's `value` is changed. ***Signature:*** `({event, field, handlers, meta}) => {}`; */
  onChange: PropTypes.func,
  /** If `true`, the label is displayed as required and the input element will be required. */
  required: PropTypes.bool,
  /** Display group of elements in a compact row. */
  row: PropTypes.bool,
};
export default RadioGroup;
