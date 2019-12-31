import React, {Fragment} from 'react';
import {render} from 'react-dom';
import {AppBar, CssBaseline, Toolbar, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Formik, TestComponent} from '../../src';
console.log({Formik, TestComponent});

const App = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            KBI Components
          </Typography>
        </Toolbar>
      </AppBar>
      <TestComponent />
    </Fragment>
  );
};

const useStyles = makeStyles(theme => ({
  title: {flexGrow: 1},
}));
render(<App />, document.getElementById('root'));
