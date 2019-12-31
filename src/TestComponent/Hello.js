import React from 'react';
import PropTypes from 'prop-types';

/**
 * A test component used to try out <a href="https://react-styleguidist.js.org/" target="_blank">React Styleguidist</a>.
 *
 * @version 1.0.0
 * @author [Daniel Kinsbursky](https://github.com/kbi-daniel)
 * @return {JSX} A react JSX component.
 * @public
 *
 */
const Hello = ({text}) => (
  <h1>Hello {text}</h1>
);

Hello.defaultProps = {
  text: 'World',
};
Hello.propTypes = {
  /** A string stating to whom the App is saying "Hello ..." */
  text: PropTypes.string,
};
export default Hello;
