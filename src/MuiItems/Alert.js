import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Collapse} from '@material-ui/core';
import {Alert as MuiAlert, AlertTitle} from '@material-ui/lab';

/**
 * A component that enhances Material UI Alert by collapsing when no message to display.
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
const Alert = (props) => {
  const {closeText, color, icon, role, severity, variant} = props;
  const alertProps = useMemo(() => ({
    closeText,
    color,
    icon,
    role,
    severity,
    variant,
  }), [closeText, color, icon, role, severity, variant]);
  return (
    <Collapse in={props.text}>
      <MuiAlert {...alertProps} onClose={props.onClose}>
        {props.title && <AlertTitle>{props.title}</AlertTitle>}
        {props.text}
      </MuiAlert>
    </Collapse>
  );
};

Alert.defaultProps = {
  closeText: 'Close',
  role: 'alert',
  variant: 'standard',
};
Alert.propTypes = {
  /** Override the default label for the close popup icon button. */
  closeText: PropTypes.string,
  /** The main color for the alert. Unless provided, the value is taken from the `severity` prop. */
  color: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  /** Override the icon displayed before the children. Unless provided, the icon is mapped to the value of the `severity` prop. */
  icon: PropTypes.node,
  /** Callback fired when the component requests to be closed. When provided and no action prop is set, a close icon button is displayed that triggers the callback when clicked. **Signature: function(event: object) => void** */ //eslint-disable-line
  onClose: PropTypes.func,
  /** The ARIA role attribute of the element. */
  role: PropTypes.string,
  /** The severity of the alert. This defines the color and icon used. */
  severity: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  /** The string content of the Alert component. */
  text: PropTypes.string.isRequired,
  /** You can use the `AlertTitle` component to display a formatted title above the text content. */
  title: PropTypes.string,
  /** The variant to use. */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
};
export default Alert;
