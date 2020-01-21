import React, {useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import MuiCollapse from '@material-ui/core/Collapse';

/**
 * A component that enhances Material UI Collapse by only rendering JSX within an expanded Collapse.
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
      if (!initialLoad) setTimer(setTimeout(() => setRenderState(false), timeout.exit + 100));
      setCollapseState(false);
    };
    if (props.in) expandCollapse();
    else closeCollapse();
  }, [initialLoad, props.in, timeout.exit]);
  useEffect(() => {
    setInitialLoad(false);
  }, []);

  if (!renderState) return null;
  return (
    <MuiCollapse in={collapseState} timeout={timeout}>{props.children}</MuiCollapse>
  );
};

Collapse.defaultProps = {
  timeout: 500,
};
Collapse.propTypes = {
  /** The content that gets rendered by Collapse transition (e.g. `<Collapse>{children}</Collapse>`) */
  children: PropTypes.node.isRequired,
  /** If true, the component will transition in. */
  in: PropTypes.bool.isRequired,
  /** The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. Set to 'auto' to automatically calculate transition time based on height. */ //eslint-disable-line
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({enter: PropTypes.number, exit: PropTypes.number}),
  ]),
};
export default Collapse;
