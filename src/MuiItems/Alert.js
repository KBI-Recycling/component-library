import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Collapse, Fade} from '@material-ui/core';
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
  const {closeText, color, icon, role, severity, style, variant} = props;
  const alertProps = useMemo(() => ({
    closeText,
    color,
    icon,
    role,
    severity,
    style: {
      margin: '16px 0px',
      ...style,
    },
    variant,
  }), [closeText, color, icon, role, severity, style, variant]);
  const transitionProps = useMemo(() => ({
    in: props.in,
    timeout: (() => {
      let enter = 500;
      let exit = 500;
      if (typeof props.timeout === 'number') {
        enter = props.timeout;
        exit = props.timeout;
      } else if (typeof props.timeout === 'object') {
        if (props.timeout.enter && typeof props.timeout.enter === 'number') enter = props.timeout.enter;
        if (props.timeout.exit && typeof props.timeout.exit === 'number') exit = props.timeout.exit;
      }
      return {enter, exit};
    })(),
  }), [props.in, props.timeout]);

  return (
    <Collapse {...transitionProps} style={{width: '100%'}}>
      <MuiAlert {...alertProps} onClose={props.onClose}>
        <Fade {...transitionProps}>
          <div>
            {props.title && <AlertTitle>{props.title}</AlertTitle>}
            {props.text}
          </div>
        </Fade>
      </MuiAlert>
    </Collapse>
  );
};

Alert.defaultProps = {
  closeText: 'Close',
  in: true,
  role: 'alert',
  timeout: 500,
  variant: 'standard',
};
Alert.propTypes = {
  /** Override the default label for the close popup icon button. */
  closeText: PropTypes.string,
  /** The main color for the alert. Unless provided, the value is taken from the `severity` prop. */
  color: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  /** Override the icon displayed before the children. Unless provided, the icon is mapped to the value of the `severity` prop. */
  icon: PropTypes.node,
  /** If true, the component will transition in. */
  in: PropTypes.bool.isRequired,
  /** Callback fired when the component requests to be closed. When provided and no action prop is set, a close icon button is displayed that triggers the callback when clicked. **Signature: function(event: object) => void** */ //eslint-disable-line
  onClose: PropTypes.func,
  /** The ARIA role attribute of the element. */
  role: PropTypes.string,
  /** The severity of the alert. This defines the color and icon used. */
  severity: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  /** Pass style object to Alert component. */
  style: PropTypes.object,
  /** The string content of the Alert component. */
  text: PropTypes.string.isRequired,
  /** The duration for the collapse transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object e.g. {enter: 500, exit: 1000}. */
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({enter: PropTypes.number, exit: PropTypes.number}),
  ]),
  /** You can use the `AlertTitle` component to display a formatted title above the text content. */
  title: PropTypes.string,
  /** The variant to use. */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
};
export default Alert;
