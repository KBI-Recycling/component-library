import React, {useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import MuiCollapse from '@material-ui/core/Collapse';

const Collapse = (props) => {
  const [collapseState, setCollapseState] = useState(false);
  const [renderState, setRenderState] = useState(false);
  const [timer, setTimer] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const timeout = useMemo(() => {
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
  }, [props.timeout]);

  useEffect(() => {
    if (timer && props.in) clearTimeout(timer);
  }, [props.in, timer]);
  useEffect(() => {
    const expandCollapse = () => {
      setRenderState(true);
      if (initialLoad) setCollapseState(true);
      else setTimeout(() => setCollapseState(true), 100);
    };
    const closeCollapse = () => {
      setTimer(setTimeout(() => setRenderState(false), timeout.exit + 100));
      setCollapseState(false);
    };
    if (props.in) expandCollapse();
    else closeCollapse();
  }, [initialLoad, props.in, timeout.exit]);
  useEffect(() => {
    setInitialLoad(false);
  }, []);

  console.log({enter: timeout.enter, exit: timeout.exit, renderState, collapseState});
  if (!renderState) return null;
  return (
    <MuiCollapse in={collapseState} timeout={timeout}>{props.children}</MuiCollapse>
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
