import React, {Fragment, useState} from 'react';
import {render} from 'react-dom';
import {AppBar, CssBaseline, Divider, Drawer, IconButton, ListItem, ListItemText, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {FormikForm, SubmitButton, TestComponent} from '../../src';

const App = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <Fragment>
      <CssBaseline />
      <AppBar position='fixed' className={clsx(classes.appBar, {[classes.appBarShift]: open})}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setOpen(!open)} edge="start" className={clsx(classes.menuButton, open && classes.hide)}>
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            material-formik-ui
          </Typography>
        </Toolbar>
      </AppBar>
      <TestComponent />
      <FormikForm>
        <SubmitButton>Submit</SubmitButton>
      </FormikForm>
    </Fragment>
  );
};

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));
render(<App />, document.getElementById('root'));
