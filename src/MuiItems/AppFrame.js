import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Drawer, MainView} from './AppFrame/';

const AppFrame = ({routes, menuItems, moduleTitle, redirectTo}) => {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.root} >
        <div className={classes.hidePrint}>
          {/* <AppBar routes={routes} /> */}
          <Drawer menuItems={menuItems} moduleTitle={moduleTitle} />
        </div>
        <main className={classes.content}>
          {/* <MainView routes={routes} redirectTo={redirectTo} /> */}
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
  routes: PropTypes.arrayOf(PropTypes.shape({
    component: PropTypes.func.isRequired,
    exact: PropTypes.bool.isRequired,
    strict: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    pageTitle: PropTypes.string.isRequired,
  })),
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    selectedLinkComparison: PropTypes.string,
  })),
  moduleTitle: PropTypes.string.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default AppFrame;
