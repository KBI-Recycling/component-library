import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Button, CircularProgress} from '@material-ui/core';
import {useFormikContext} from 'formik';

/**
 * A component that integrates Material UI Button with Formik form context. The buttons type attribute is hardcoded to 'submit'
 * to allow for standard form functionality, such as triggering onSubmit when `enter` key pushed. Also, Material UI CircularProgress
 * has been added to indicate form is either submitting or validating (button will also be disabled). Commonly used Button props are
 * described below in the PROPS & METHODS section. Less common props can also be passed; see <a href='https://material-ui.com/api/button/' target="_blank">
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
const SubmitButton = (props) => {
  const formik = useFormikContext();
  const {
    children,
    color,
    disabled,
    endIcon,
    fullWidth,
    href,
    progressProps,
    size,
    startIcon,
    style,
    variant,
    ...otherProps
  } = props;

  const formikDisabled = useMemo(() => {
    if (formik.isSubmitting || formik.isValidating) return true;
    else return false;
  }, [formik.isSubmitting, formik.isValidating]);
  const progressSizeMemo = useMemo(() => {
    const buttonSize = size || undefined;
    if (buttonSize === 'small') return 12;
    else return 24;
  }, [size]);

  const wrapperPropsMemo = useMemo(() => ({
    // Applying margin to div wrapper ensures proper placement of CircularProgress component.
    // Hardcoding buttonPropsMemo to {margin: 0} to ensure margin style only applied in wrapperPropsMemo.
    style: {
      position: 'relative',
      display: 'inline',
      margin: style?.margin || 0,
      marginTop: style?.marginTop || 0,
      marginRight: style?.marginRight || 0,
      marginBottom: style?.marginBottom || 0,
      marginLeft: style?.marginLeft || 0,
    },
  }), [style]);
  const buttonPropsMemo = useMemo(() => ({
    color,
    disabled: disabled || formikDisabled,
    disableRipple: true,
    endIcon: endIcon,
    fullWidth,
    href,
    size,
    startIcon,
    style: {
      ...style,
      // Applying margin to div wrapper ensures proper placement of CircularProgress component.
      // Hardcoding buttonPropsMemo to {margin: 0} to ensure margin style only applied in wrapperPropsMemo.
      margin: 0,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
    },
    type: 'submit',
    variant,
  }), [color, disabled, endIcon, formikDisabled, fullWidth, href, size, startIcon, style, variant]);
  const progressPropsMemo = useMemo(() => ({
    size: progressSizeMemo,
    ...progressProps,
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -progressSizeMemo / 2,
      marginLeft: -progressSizeMemo / 2,
      ...progressProps?.style,
    },
  }), [progressProps, progressSizeMemo]);

  return (
    <div {...wrapperPropsMemo}>
      <Button {...buttonPropsMemo} {...otherProps}>
        {children}
      </Button>
      {formikDisabled && <CircularProgress {...progressPropsMemo} />}
    </div>
  );
};

SubmitButton.defaultProps = {
  children: 'Submit',
  color: 'primary',
  disabled: false,
  fullWidth: false,
  size: 'medium',
  variant: 'contained',
};
SubmitButton.propTypes = {
  /** The text of the button (e.g. `<SubmitButton>{children}</SubmitButton>`) */
  children: PropTypes.node,
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
  /** Pass props to SubmitButton's CircularProgress component. See <a href='https://material-ui.com/api/circular-progress/' target='_blank'>CircularProgress API</a> for details. */
  progressProps: PropTypes.object,
  /** The size of the button. `small` is equivalent to the dense button styling. */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Element placed before the children. */
  startIcon: PropTypes.node,
  /** An object to add CSS styles to Button component */
  style: PropTypes.object,
  /** The variant to use. */
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
};
export default SubmitButton;
