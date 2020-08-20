import React from 'react';
import PropTypes from 'prop-types';
import {useDrawer} from './MainView/';
import {makeStyles} from '@material-ui/core/styles';
import {Switch, Redirect, Route} from 'react-router-dom';

const MainView = ({routes, redirectTo, smallDevice, drawerOpen}) => {
  const {drawerMargin} = useDrawer({smallDevice, drawerOpen});
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div style={drawerMargin}>
        <Switch>
          {routes.map(({component, exact, path, strict}) => {
            return <Route key={path} exact={exact} path={path} strict={strict} component={component} />;
          })}
          <Redirect exact to={redirectTo} />
        </Switch>
      </div>
    </main>

  );
};

const useStyles = makeStyles(theme => ({
  content: {
    'flexGrow': 1,
    'backgroundColor': theme.palette.background.default,
    'minWidth': 0, // So the Typography noWrap works
    '@media print': {
      backgroundColor: '#FFFFFF',
    },
  },
}));

MainView.propTypes = {
  redirectTo: PropTypes.string.isRequired,
  smallDevice: PropTypes.bool.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  routes: PropTypes.arrayOf(PropTypes.shape({
    component: PropTypes.func.isRequired,
    exact: PropTypes.bool.isRequired,
    strict: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    pageTitle: PropTypes.string.isRequired,
  })),
};

export default MainView;
