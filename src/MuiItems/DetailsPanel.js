import React from 'react';
import PropTypes from 'prop-types';
import {DetailsFieldList, DetailsTitle, DetailsButtons} from './DetailsPanel/';
import {Paper, makeStyles} from '@material-ui/core';

const DetailsPanel = props => {
  // this splits up the style props passed to iconProps from the other props. this allows for correct spreading of props to icon component
  const {style: iconStyle, ...otherIconProps} = props.iconProps;
  const styles = useStyles();
  const titleProps = {
    title: props.title,
    titleVariant: props.titleVariant,
    titleStyle: props.titleStyle,
    subtitle: props.subtitle,
    subtitleStyle: props.subtitleStyle,
    subtitleLink: props.subtitleLink,
    subtitleVariant: props.subtitleVariant,
  };
  const IconComponent = props.icon ? props.icon : null;

  return <Paper className={styles.paper} {...props.paperProps}>
    {IconComponent !== null ? <IconComponent style={{fontSize: '10em', fill: 'slategray', width: '100%', marginTop: '25px', ...iconStyle}} {...otherIconProps} /> : null}
    <DetailsTitle {...titleProps} />
    {props.fields && props.fields.length ? <DetailsFieldList fields={props.fields} /> : null}
    {props.buttons && props.buttons.length ? <DetailsButtons buttons={props.buttons} /> : null}
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

DetailsPanel.defaultProps = {
  buttons: [],
  fields: [],
  titleVariant: 'h6',
  subtitleVariant: 'body2',
  subtitleLink: null,
  subtitle: null,
};

DetailsPanel.propTypes = {
  /** Any props you want to be passeed to the surrounding Paper component */
  paperProps: PropTypes.string.isRequired,
  /** An array of objects mapped over for each of the sections in the list. any props not specified here that are passed will be attached to the MaterialUI Button component  */
  buttons: PropTypes.arrayOf(PropTypes.shape({
    /** The label for the button */
    text: PropTypes.string.isRequired,
    /** The function ran on click of the button */
    onClick: PropTypes.string.isRequired,
    /** A boolean to disabled the button. defaults to false */
    disabled: PropTypes.bool,
    /** A boolean to hide or show the button */
    visable: PropTypes.bool,
  })),
  fields: PropTypes.arrayOf(PropTypes.shape({
    /** The label for the field */
    label: PropTypes.string.isRequired,
    /** The value for the field */
    value: PropTypes.string.isRequired,
    /** A boolean to hide or show the field */
    visable: PropTypes.bool,
    /** any field specific props to pass to the TextField component */
    textFieldProps: PropTypes.object,
  })).isRequired,
  /** The title of the section */
  title: PropTypes.string.isRequired,
  /** Any one of the typography variants of MaterialUI to be applied to the title */
  titleVariant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2']),
  /** Any styling that will be applied to the title Typography */
  titleStyle: PropTypes.object,
  /** The sting displayed as a subtitle */
  subtitle: PropTypes.string,
  /** Any styling that will be applied to the subtitle Typography */
  subtitleStyle: PropTypes.object,
  /** Any one of the typography variants of MaterialUI to be applied to the subtitle */
  subtitleVariant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2']),
  /** If the subtitle is a link, this holds the url */
  subtitleLink: PropTypes.string,
  /** The icon to be used above the title */
  icon: PropTypes.elementType,
  /** Props that you want passed to the icon */
  iconProps: PropTypes.object,
};

export default DetailsPanel;
