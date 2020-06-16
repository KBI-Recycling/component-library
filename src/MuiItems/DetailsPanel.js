import React from 'react';
import PropTypes from 'prop-types';
import {DetailsFieldList, DetailsTitle} from './DetailsPanel/';
import {Paper, makeStyles} from '@material-ui/core';

const DetailsPanel = props => {
  const styles = useStyles();

  return <Paper className={styles.paper}>
    <DetailsTitle title='A Section Title' />
    <DetailsFieldList fields={[
      {label: 'field 1', value: 'value 1'},
      {label: 'field 2', value: 'value 2'},
    ]} />
  </Paper>;
};

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
    justifyContent: 'center',
  },
}));


DetailsPanel.propTypes = {
  /** The title of the section */
  title: PropTypes.string.isRequired,
  /** Any one of the typography variants of MaterialUI to be applied to the title */
  titleVariant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2']),
  /** Any styling that will be applied to the title Typography */
  titleStyle: PropTypes.object,
  /** Any styling that will be applied to the list */
  listStyle: PropTypes.object,
  /** The sting displayed as a subtitle */
  subtitle: PropTypes.string,
  /** Any styling that will be applied to the subtitle Typography */
  subtitleStyle: PropTypes.object,
  /** Any one of the typography variants of MaterialUI to be applied to the subtitle */
  subtitleVariant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2']),
  /** If the subtitle is a link, this holds the url */
  subtitleLink: PropTypes.string,
};

export default DetailsPanel;
