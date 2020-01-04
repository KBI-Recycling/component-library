import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Button, CircularProgress} from '@material-ui/core';
import {useFormikContext} from 'formik';

const SubmitButton = (props) => {
  const {children, progressProps} = props;
  const {classes, color, component, disabled, disableFocusRipple, disableRipple, endIcon, fullWidth, href, size, startIcon, style, variant} = props;
  const formik = useFormikContext();

  const formikDisabled = useMemo(() => {
    if (formik.isSubmitting || formik.isValidating) return true;
    else return false;
  }, [formik.isSubmitting, formik.isValidating]);
  const progressSizeMemo = useMemo(() => {
    const buttonSize = size || undefined;
    if (buttonSize === 'small') return 12;
    else return 24;
  }, [size]);
  const getButtonMargin = useCallback((element) => {
    // Apply margin styles to wrapper div element and hardcode Button MUI component to a {margin: 0}
    // Applying margin to wrappr div ensures proper placement of CircularProgress component with position of 'absolute'
    if (element === 'Button') return {margin: 0};
    else if (element === 'Wrapper') {
      const SubmitButtonMargin = {
        margin: style?.margin || 0,
        marginTop: style?.marginTop,
        marginRight: style?.marginRight,
        marginBottom: style?.marginBottom,
        marginLeft: style?.marginLeft,
      };
      return SubmitButtonMargin;
    }
  }, [style]);

  const wrapperPropsMemo = useMemo(() => {
    return {
      style: {
        ...getButtonMargin('Wrapper'),
        position: 'relative',
      },
    };
  }, [getButtonMargin]);
  const buttonPropsMemo = useMemo(() => ({
    classes: classes,
    color: color,
    component: component,
    disabled: disabled || formikDisabled,
    disableFocusRipple: disableFocusRipple,
    disableRipple: disableRipple || true,
    endIcon: endIcon,
    fullWidth: fullWidth,
    href: href,
    size: size,
    startIcon: startIcon,
    style: {
      ...style,
      ...getButtonMargin('Button'),
    },
    type: 'submit',
    variant: variant,
  }), [classes, color, component, disableFocusRipple, disableRipple, disabled, endIcon, formikDisabled, fullWidth, getButtonMargin, href, size, startIcon, style, variant]);
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
      <Button {...buttonPropsMemo}>
        {children || 'Submit'}
      </Button>
      {formikDisabled && <CircularProgress {...progressPropsMemo} />}
    </div>
  );
};
SubmitButton.defaultProps = {
  color: 'primary',
  variant: 'contained',
};
SubmitButton.propTypes = {
  children: PropTypes.node.isRequired,
  progressProps: PropTypes.object,
  classes: PropTypes.object,
  color: PropTypes.string,
  component: PropTypes.node,
  disabled: PropTypes.bool,
  disableFocusRipple: PropTypes.bool,
  disableRipple: PropTypes.bool,
  endIcon: PropTypes.node,
  fullWidth: PropTypes.bool,
  href: PropTypes.string,
  size: PropTypes.string,
  startIcon: PropTypes.node,
  style: PropTypes.object,
  variant: PropTypes.string,
};
export default SubmitButton;
