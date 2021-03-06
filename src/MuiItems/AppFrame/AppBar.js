import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {matchPath, useLocation} from 'react-router-dom';
import {AppBar as MuiAppBar, Toolbar, IconButton, Typography} from '@material-ui/core';
import {Menu, MoreVert} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';
import {ModuleMenu} from './AppBar/';

const AppBarTitle = ({routes}) => {
  const location = useLocation();
  const currentRoute = useMemo(() => {
    return routes.find((route, index, array) => {
      return matchPath(location.pathname, {path: route.path, exact: route.exact, strict: route.strict});
    }) || '';
  }, [location.pathname, routes]);

  return useMemo(() => (
    <Typography variant='h6' color='inherit' style={{flexGrow: 1}}>
      {currentRoute.pageTitle || ''}
    </Typography>
  ), [currentRoute.pageTitle]);
};

const AppBar = ({routes, drawerOpen, setDrawerOpen, moduleMenuOptions, logoutFunction}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <MuiAppBar position='fixed' className={classes.appBar}>
      <Toolbar variant='dense' disableGutters>
        <IconButton edge='start' color='inherit' aria-label='menu' style={{marginLeft: 8}} onClick={() => setDrawerOpen(!drawerOpen)}>
          <Menu />
        </IconButton>
        <AppBarTitle routes={routes} />
        {moduleMenuOptions ? <IconButton color='inherit' onClick={e => setAnchorEl(e.currentTarget)}>
          <MoreVert />
        </IconButton>: null}
        {moduleMenuOptions ? <ModuleMenu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          logoutFunction={logoutFunction}
          moduleMenuOptions={moduleMenuOptions}
        /> : null}
      </Toolbar>
    </MuiAppBar>
  );
};

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.primary.dark,
    zIndex: theme.zIndex.drawer + 1,
  },
}));

AppBar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    component: PropTypes.func.isRequired,
    exact: PropTypes.bool.isRequired,
    strict: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    pageTitle: PropTypes.string.isRequired,
  })),
  setDrawerOpen: PropTypes.func.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  moduleMenuOptions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    pathComparisonString: PropTypes.string,
  })),
  logoutFunction: PropTypes.func,
};

export default React.memo(AppBar);
