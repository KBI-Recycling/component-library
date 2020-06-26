import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Redirect, Route} from 'react-router-dom';

const MainView = ({routes, redirectTo}) => {
  return (
    <div style={{padding: '24px 0'}}>
      <Switch>
        {routes.map(({component, exact, path, strict}) => {
          return <Route key={path} exact={exact} path={path} strict={strict} component={component} />;
        })}
        <Redirect exact to={redirectTo} />
      </Switch>
    </div>
  );
};

MainView.propTypes = {
  redirectTo: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.shape({
    component: PropTypes.func.isRequired,
    exact: PropTypes.bool.isRequired,
    strict: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    pageTitle: PropTypes.string.isRequired,
  })),
};

export default MainView;
