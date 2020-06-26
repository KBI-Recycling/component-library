import React, {useCallback, useMemo, useState} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {matchPath, useLocation} from 'react-router-dom';
import {AppBar as MuiAppBar, Toolbar, IconButton, Typography} from '@material-ui/core';
import {Menu, MoreVert} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';
// import {acSetDrawerOpen} from 'global_state/actions.js';
import {ModuleMenu} from './AppBar/';

const AppBarTitle = ({routes}) => {
  const location = useLocation();
  console.log('location', location );
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

const AppBar = ({routes}) => {
  const drawerOpen = true; // useSelector(state => state.global.drawerOpen);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  // Component Action Creators
  // const dispatch = useDispatch();
  const setDrawerOpen = useCallback((drawerOpen) => {
    // return () => dispatch(acSetDrawerOpen(drawerOpen));
  }, []);

  return (
    <MuiAppBar position='fixed' className={classes.appBar}>
      <Toolbar variant='dense' disableGutters>
        <IconButton edge='start' color='inherit' aria-label='menu' style={{marginLeft: 8}} onClick={setDrawerOpen(!drawerOpen)}>
          <Menu />
        </IconButton>
        <AppBarTitle routes={routes} />
        <IconButton color='inherit' onClick={e => setAnchorEl(e.currentTarget)}>
          <MoreVert />
        </IconButton>
        <ModuleMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      </Toolbar>
    </MuiAppBar>
  );
};

const useStyles = makeStyles(theme => ({
  appBar: {zIndex: theme.zIndex.drawer + 1},
}));

AppBar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    component: PropTypes.func.isRequired,
    exact: PropTypes.bool.isRequired,
    strict: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    pageTitle: PropTypes.string.isRequired,
  })),
};

export default React.memo(AppBar);
