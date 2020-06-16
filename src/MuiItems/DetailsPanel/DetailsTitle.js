import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {List, ListItem, Typography} from '@material-ui/core';

const DetailsTitle = props => {
  const listStyle = {
    width: '100%',
    ...props.listStyle,
  };

  return (
    <List style={{...listStyle}}>
      <ListItem style={{flexDirection: 'column'}}>
        <Typography variant={props.titleVariant} style={{lineHeigt: '.9', textAlign: 'center', ...props.titleStyle}}>
          {props.title}
        </Typography>
        {!props.subtitleLink && props.subtitle ? <Typography variant={props.subtitleVariant} style={{lineHeigt: '.9', textAlign: 'center', ...props.subtitleStyle}}>
          {props.subtitle}
        </Typography> : null}
        {props.subtitleLink && <Link to={props.subtitleLink}>
          <Typography variant='body2' style={{lineHeigt: '.9', textAlign: 'center'}}>{props.subtitle}</Typography>
        </Link>}
      </ListItem>
    </List>
  );
};

DetailsTitle.defaultProps = {
  titleVariant: 'h6',
  subtitleVariant: 'body2',
  subtitleLink: null,
  subtitle: null,
};
DetailsTitle.propTypes = {
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
export default DetailsTitle;
