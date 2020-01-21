import React, {useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import MuiCollapse from '@material-ui/core/Collapse';

const Collapse = (props) => {
  const [collapseState, setCollapseState] = useState(false);
  const [renderState, setRenderState] = useState(false);
  const timeout = useMemo(() => {
    let enter = 500;
    let exit = 500;
    if (typeof props.timeout === 'number') {
      enter = props.timeout;
      exit = props.timeout;
    } else if (typeof props.timeout === 'object') {
      if (props.timeout.enter === 'number') enter = props.timeout.enter;
      if (props.timeout.exit === 'number') exit = props.timeout.exit;
    }
    console.log('props.timeout', props.timeout);
    console.log({enter, exit});
    return {enter, exit};
  }, [props.timeout]);
  useEffect(() => {
    if (props.in) {
      setRenderState(true);
      setTimeout(() => setCollapseState(true), 100);
    } else {
      setTimeout(() => setRenderState(false), 650);
      setTimeout(() => setCollapseState(false), 100);
    }
  }, [props.in]);

  if (!renderState) return null;
  return (
    <MuiCollapse in={collapseState}>{props.children}</MuiCollapse>
  );
};

Collapse.defaultProps = {
  collapsedHeight: '0px',
  timeout: 500,
};
Collapse.propTypes = {
  /** The content that gets rendered by Collapse transition (e.g. `<Collapse>{children}</Collapse>`) */
  children: PropTypes.node.isRequired,
  /** The height of the container when collapsed. */
  collapsedHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** If true, the component will transition in. */
  in: PropTypes.bool.isRequired,
  /** The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. Set to 'auto' to automatically calculate transition time based on height. */ //eslint-disable-line
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({enter: PropTypes.number, exit: PropTypes.number}),
  ]),
};
export default Collapse;
