import React from 'react';
import {render} from 'react-dom';
import {TestComponent} from '../../src';

const App = () => (
  <TestComponent />
);
render(<App />, document.getElementById('root'));
