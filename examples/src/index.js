import React, {Fragment} from 'react';
import {render} from 'react-dom';
import {AppBar, CssBaseline, Divider, Drawer, ListItem, ListItemText, Toolbar, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {TestComponent} from '../../src';

const App = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar />
      </AppBar>
      <Drawer className={classes.drawer} variant='permanent' classes={{paper: classes.drawerPaper}} anchor='left'>
        <Toolbar>
          <Typography variant='h6'>
            material-formik-ui
          </Typography>
        </Toolbar>
        <Divider />
        <ListItem button>
          <ListItemText primary='Checkbox' />
        </ListItem>
      </Drawer>
      <TestComponent />
    </Fragment>
  );
};

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));
render(<App />, document.getElementById('root'));
