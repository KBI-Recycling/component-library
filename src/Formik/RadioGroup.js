import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {Field} from 'formik';
import {FormControl, FormHelperText, FormLabel} from '@material-ui/core';
import MuiRadioGroup from '@material-ui/core/RadioGroup';

/**
 * A component that wraps Material UI FormControl and RadioGroup with Formik form context. Commonly used FormControl props are described below in the PROPS & METHODS section.
 * Less common props can also be passed; see <a href='https://material-ui.com/api/form-control/' target="_blank">FormControl API</a> and <a href='https://material-ui.com/api/radio/' target="_blank">Radio API</a> for details.
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
  const {children, label, name, row, ...otherProps} = props;
  const formControlProps = useCallback((form) => {
    return {
      disabled: form.isSubmitting,
      error: Boolean(form.touched[name] && form.errors[name]),
      fullWidth: true,
      margin: 'dense',
      ...otherProps,
    };
  }, [name, otherProps]);

  return (
    <Field name={name}>
      {formik => (
        <FormControl component="fieldset" id={name} {...formControlProps(formik.form)}>
          <FormLabel component="legend">{label || name}</FormLabel>
          <MuiRadioGroup {...formik.field} row={row}>{children}</MuiRadioGroup>
          {formik.form.touched[name] && formik.form.errors[name] && <FormHelperText error={true}>{formik.form.errors[name]}</FormHelperText>}
        </FormControl>
      )}
    </Field>
  );
};
RadioGroup.defaultProps = {
  row: false,
};
RadioGroup.propTypes = {
  /** The content of the component. */
  children: PropTypes.array,
  /** The `label` content. If not set, `label` will default to `name` prop.  */
  label: PropTypes.string,
  /** A field's name in Formik state. Also, automatically sets the input's `id` attribute if not otherwise passed. */
  name: PropTypes.string.isRequired,
  /** Callback fired when the input's `value` is changed. */
  onChange: PropTypes.func,
  /** Display group of elements in a compact row. */
  row: PropTypes.bool,
};
export default RadioGroup;
