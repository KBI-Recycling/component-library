import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {Switch, FormControl, FormControlLabel, FormHelperText} from '@material-ui/core';
import {Field} from 'formik';

/**
* A component that wraps Material UI Switch with Formik form context. Commonly used Switch and FormControlLabel props are described below in the PROPS & METHODS section.
 * Less common props can also be passed; see <a href='https://material-ui.com/api/form-control-label/' target="_blank">FormControlLabel API</a> for details.
 *
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
const SwitchField = ({name, onChange, margin, labelPlacement, ...otherProps}) => {
  const switchFieldProps = useCallback(({field, form}) => {
    return {
      labelPlacement,
      label: name,
      ...otherProps,
      control: (
        <Switch
          checked={form.values[name]}
          onChange={e => {
            field.onChange(e);
            if (onChange) {
              onChange({
                field: {...field, value: e.target.value},
                form: {...form, values: {...form.values, [name]: e.target.value}},
              });
            }
          }}
          color="primary"
        />
      ),
    };
  }, [labelPlacement, name, onChange, otherProps]);
  return (
    <Field name={name}>
      {({field, form, meta}) => (
        <FormControl margin={margin}>
          <FormControlLabel {...field} {...switchFieldProps({field, form})} />
          {meta.touched && meta.error && <FormHelperText error={true}>{meta.error}</FormHelperText>}
        </FormControl>
      )}
    </Field>
  );
};

SwitchField.defaultProps = {
  labelPlacement: 'top',
  margin: 'dense',
};

SwitchField.propTypes = {
  /** The `label` content. If not set, `label` will default to `name` prop.  */
  label: PropTypes.string,
  /** Sets the location of the label relative to the Switch.  */
  labelPlacement: PropTypes.oneOf(['end', 'start', 'top', 'bottom']),
  /** If `dense` or `normal`, will adjust vertical spacing of this and contained components. */
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
  /** A field's name in Formik state. Also, automatically sets the input's `id` attribute if not otherwise passed. */
  name: PropTypes.string.isRequired,
  /** Callback fired when the input's `value` is changed. ***Signature:*** `({event, field, handlers, meta}) => {}`; */
  onChange: PropTypes.func,
};
export default SwitchField;
