import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';
import {useFormikContext} from 'formik';

/**
 * A component that integrates Material UI Button with Formik form context. The button will automatically be
 * disabled on form submission or validation. Commonly used Button props are described below in the PROPS & METHODS
 * section. Less commonly used props can also be passed; see <a href='https://material-ui.com/api/button/' target="_blank">
 * Button API</a> for details.
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
const FormButton = (props) => {
  const formik = useFormikContext();
  const {
    children,
    color,
    disabled,
    endIcon,
    fullWidth,
    href,
    size,
    startIcon,
    variant,
    ...otherProps
  } = props;
  console.log({size, otherProps});
  const buttonPropsMemo = useMemo(() => ({
    color,
    disabled: disabled || formik.isSubmitting || formik.isValidating,
    endIcon,
    fullWidth,
    href,
    size,
    startIcon,
    variant,
  }), [color, disabled, endIcon, formik.isSubmitting, formik.isValidating, fullWidth, href, size, startIcon, variant]);

  return <Button {...buttonPropsMemo} {...otherProps}>{children}</Button>;
};

FormButton.defaultProps = {
  color: 'default',
  disabled: false,
  fullWidth: false,
  size: 'medium',
  variant: 'contained',
};
FormButton.propTypes = {
  /** The text of the button (e.g. `<Button>{children}</Button>`) */
  children: PropTypes.node.isRequired,
  /** The color of the component. It supports those theme colors that make sense for this component. */
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  /** If `true`, the button will be disabled. */
  disabled: PropTypes.bool,
  /** Element placed after the children */
  endIcon: PropTypes.node,
  /** If `true`, the button will take up the full width of its container. */
  fullWidth: PropTypes.bool,
  /** The URL to link to when the button is clicked. If defined, an `<a>` element will be used as the root node. */
  href: PropTypes.string,
  /** The size of the button. `small` is equivalent to the dense button styling. */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Element placed before the children. */
  startIcon: PropTypes.node,
  /** The variant to use. */
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
};
export default FormButton;
