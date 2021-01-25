import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Typography} from '@material-ui/core';
import {NotInterested} from '@material-ui/icons';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: this.props.hasErrorProp ? this.props.hasErrorProp : false,
    };
  }

  componentDidCatch(error, info) {
    this.setState({hasError: true});
    this.props.errorHandlerFunction(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Grid container spacing={4} style={{textAlign: 'center', paddingTop: '24px'}}>
          <Grid item xs={12}>
            <NotInterested style={{fontSize: '10em', fill: 'slategray'}} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Oops!</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1'>We encountered an error. Please reload the page.</Typography>
          </Grid>
        </Grid>);
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  /** The content that gets rendered when there is no error. Wrap whatever you want to be caught by this ErrorBoundary */
  children: PropTypes.object.isRequired,
  /** The function that triggers in the componentDidCatch. For example, trigger email to devs for error. */
  errorHandlerFunction: PropTypes.func.isRequired,
  /** this is used just for the demo version. It could be used by component, but it breaks the use case for it */
  hasErrorProp: PropTypes.bool,
};

export default ErrorBoundary;
