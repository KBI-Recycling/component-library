/* eslint-disable max-len */
import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles, useMediaQuery} from '@material-ui/core';
import {AppBar, Drawer, MainView} from './AppFrame/';

const AppFrame = ({routes, menuItems, moduleTitle, redirectTo, currentUserEmail, moduleMenuOptions, logoutFunction}) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [smallDevice, setSmallDevice] = useState(false);
  const deviceIsSmall = useMediaQuery('(max-width:1280px)');

  useEffect(() => {
    if (deviceIsSmall) {
      setDrawerOpen(false);
      setSmallDevice(true);
    } else {
      setDrawerOpen(true);
      setSmallDevice(false);
    }
  }, [deviceIsSmall]);

  return (
    <Fragment>
      <div className={classes.root}>
        <div className={classes.hidePrint}>
          <AppBar routes={routes} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} logoutFunction={logoutFunction} moduleMenuOptions={moduleMenuOptions} />
          <Drawer menuItems={menuItems}
            moduleTitle={moduleTitle}
            smallDevice={smallDevice}
            drawerOpen={drawerOpen}
            setDrawerOpen={bool => setDrawerOpen(bool)}
            currentUserEmail={currentUserEmail}
          />
        </div>
        <main className={classes.content}>
          <MainView routes={routes} redirectTo={redirectTo} smallDevice={smallDevice} drawerOpen={drawerOpen} />
        </main>
      </div>
    </Fragment>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  hidePrint: {
    '@media print': {
      display: 'none',
    },
  },
  content: {
    [theme.breakpoints.down('xs')]: {
      'paddingLeft': theme.spacing(6),
    },
    [theme.breakpoints.up('sm')]: {
      'paddingLeft': theme.spacing(6) + 300,
    },
    'flexGrow': 1,
    'backgroundColor': theme.palette.background.default,
    'padding': theme.spacing(6),
    'paddingLeft': theme.spacing(6) + 300,
    'minWidth': 0, // So the Typography noWrap works
    '@media print': {
      backgroundColor: '#FFFFFF',
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.between('sm', 'md')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
    },
  },
}));

AppFrame.propTypes = {
  /** The routes that will be used to navigate throughout the page. Will be passed to react-router-dom Route components. */
  routes: PropTypes.arrayOf(PropTypes.shape({
    /** A function that returns the component that is to be rendered for any given route. Signature: '() => &lt;MyViewComponent /&gt;' */
    component: PropTypes.func.isRequired,
    /** The 'exact' prop that Route takes */
    exact: PropTypes.bool.isRequired,
    /** The 'strict' prop that Route takes */
    strict: PropTypes.bool.isRequired,
    /** The 'path' prop that Route takes */
    path: PropTypes.string.isRequired,
    /** The title that is displayed on the AppBar for the page */
    pageTitle: PropTypes.string.isRequired,
  })),
  /** Used by the Drawer component. Maps over this array to create the list items to navigate throughout the site. */
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    /** A function that returns the icon component that is to be rendered for the item. Signature: '() => &lt;MyIcon /&gt;' */
    icon: PropTypes.func.isRequired,
    /** The title of the list item */
    text: PropTypes.string.isRequired,
    /** A link that matches one of the route paths. Where the menu item send the user on click  */
    link: PropTypes.string.isRequired,
    /** Used in the check for the currently selected menu item. It is required when a menu item has subroutes that would cause the url to be different than the 'link' prop. i.e. '/view/process-form/form-id/selected-item-id'
     */
    selectedLinkComparison: PropTypes.string,
  })),
  /** The title that will display on the Drawer */
  moduleTitle: PropTypes.string.isRequired,
  /** The path that will be passed to react-router-dom Redirect 'to' prop */
  redirectTo: PropTypes.string.isRequired,
  /** The email of the current user. Displayed on the app frame */
  currentUserEmail: PropTypes.string.isRequired,
  /** The list of ooptions that will be provided to the hamburger menu on the AppBar */
  moduleMenuOptions: PropTypes.arrayOf(PropTypes.shape({
    /** The string that will be shown to the user on the MenuItem */
    title: PropTypes.string.isRequired,
    /** The path that the user will open in a new tab when clicked */
    path: PropTypes.string.isRequired,
    /** The string that is passed to String.includes() in order to eliminate options from the list shown by the menu */
    pathComparisonString: PropTypes.string,
  })).isRequired,
  /** The function that is ran from the hamburger menu Logout option. Should be a fetch request to the logout endpoint from app-engine, but has the option of being whatever function that is ran to logout and redirect the user */
  logoutFunction: PropTypes.func.isRequired,
};

export default AppFrame;
