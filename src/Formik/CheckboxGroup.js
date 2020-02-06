import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Field, useField, useFormikContext} from 'formik';
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

/**
 * A component that wraps Material UI FormControl, FormGroup and Checkbox with Formik form context. Commonly used FormControl props are described below in the PROPS & METHODS
 * section. Less common props can also be passed; see <a href='https://material-ui.com/api/form-control/' target='_blank'>FormControl API</a> for details.
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

const CheckboxGroup = (props) => {
  const {boxes, disabled, error, helperText, id, label, margin, name, onChange, required, row, ...otherProps} = props;
  const [field, meta, helpers] = useField(name); //eslint-disable-line
  const form = useFormikContext();
  const formControlProps = useMemo(() => ({
    component: 'fieldset',
    disabled: disabled || form.isSubmitting,
    error: error || (meta.touched && meta.error) ? true : false,
    id: id || name,
    margin,
    required,
    style: {display: 'block'},
    onChange: event => {
      field.onChange(event);
      if (onChange) onChange({event, field, form, meta});
    },
  }), [disabled, error, field, form, id, margin, meta, name, onChange, required]);
  console.log({row});

  return (
    <FormControl {...formControlProps} {...otherProps}>
      <FormLabel component='legend'>{label || name}</FormLabel>
      <FormGroup row={row}>
        {boxes.map((box, index) => <CheckField name={name} {...box} key={index} row={row} />)}
      </FormGroup>
      {(meta.touched && meta.error) && <FormHelperText error={true}>{meta.error}</FormHelperText>}
      {helperText && !(meta.touched && meta.error) && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

CheckboxGroup.defaultProps = {
  disabled: false,
  error: false,
  fullWidth: true,
  margin: 'none',
  row: false,
};
CheckboxGroup.propTypes = {
  /** Prop describing the checkboxes to be rendered */
  boxes: PropTypes.arrayOf(PropTypes.shape({
    /** The text to be used in each individual checkboxes enclosing label element. */
    label: PropTypes.string.isRequired,
    /** The value of the Checkbox component. */
    value: PropTypes.string.isRequired,
    /** An object of props to be passed to Checkbox component; see <a href='https://material-ui.com/api/checkbox/' target='_blank'>Checkbox API</a> for details. */
    CheckboxProps: PropTypes.object,
  })).isRequired,
  /** If `true`, the `FormControl` element will be disabled. */
  disabled: PropTypes.bool,
  /** If `true`, the label will be displayed in an error state. */
  error: PropTypes.bool,
  /** The helper text content. ***Note:*** Formik error messages take priority over hardcoded helper text content. */
  helperText: PropTypes.node,
  /** The `id` of the input element. Use this prop to make label and helperText accessible for screen readers. If not set, `id` will default to `name` prop. */
  id: PropTypes.string,
  /** The `label` content for the parent FormControl component. If not set, `label` will default to `name` prop.*/
  label: PropTypes.string,
  /** If `dense` or `normal`, will adjust vertical spacing of this and contained components. */
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
  /** A field's name in Formik state. Also, automatically sets the input's `id` attribute if not otherwise passed. */
  name: PropTypes.string.isRequired,
  /** Callback fired when the input's `value` is changed. ***Signature:*** `({event, field, handlers, meta}) => {}`; */
  onChange: PropTypes.func,
  /** If `true`, the label is displayed as required and the input element will be required. */
  required: PropTypes.bool,
  /** Display group of checkboxes in a compact row. */
  row: PropTypes.bool,
};

const CheckField = (props) => {
  const classes = useStyles();
  const {CheckboxProps, label, name, row, value} = props;
  const formControlProps = useMemo(() => ({
    label,
    classes: {root: classes.root, label: classes.label},
  }), [classes.label, classes.root, label]);
  const checkboxProps = {
    color: 'primary',
    disableRipple: true,
    style: {
      marginTop: '0px',
      marginBottom: row ? '8px' : '0px',
      marginLeft: '0px',
      marginRight: '8px',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
    },
    ...CheckboxProps,
  };

  return (
    <Field type='checkbox' name={name} value={value} key={label}>
      {({field}) => (
        <FormControlLabel {...field} {...formControlProps} control={<Checkbox {...checkboxProps} />} />
      )}
    </Field>
  );
};
CheckField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  row: PropTypes.bool,
  value: PropTypes.string,
  CheckboxProps: PropTypes.object,
};

const useStyles = makeStyles({
  root: {
    alignItems: 'start',
    display: 'flex',
    margin: '5px 0px',
  },
  label: {
    lineHeight: 1.2,
    marginTop: '2px',
    marginRight: '16px',
  },
});
export default CheckboxGroup;
