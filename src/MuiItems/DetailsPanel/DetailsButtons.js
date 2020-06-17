import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {List, ListItem, Button} from '@material-ui/core';

const DetailsButtons = props => {
  const buttonProps = useCallback(button => {
    const {onClick, disabled=false, otherProps} = button;
    return {
      variant: 'outlined',
      color: 'primary',
      fullWidth: true,
      disabled,
      onClick: (e) => onClick(e),
      ...otherProps,
    };
  }, []);
  const listStyle = {
    width: '100%',
  };

  return (
    <List style={{...listStyle}}>
      <ListItem style={{flexDirection: 'column'}}>
        {props.buttons.map((button, index) => {
          const {visible = true} = button;
          if (visible) return <Button key={`Button${index}`} {...buttonProps(button)}>{button.text}</Button>;
          else return null;
        })}
      </ListItem>
    </List>
  );
};

DetailsButtons.defaultProps = {
  buttons: [],
};
DetailsButtons.propTypes = {
  /** An array of objects mapped over for each of the sections in the list. any props not specified here that are passed will be attached to the MaterialUI Button component  */
  buttons: PropTypes.arrayOf(PropTypes.shape({
  /** The label for the button */
    text: PropTypes.string.isRequired,
    /** The function ran on click of the button */
    onClick: PropTypes.func.isRequired,
    /** A boolean to disabled the button. defaults to false */
    disabled: PropTypes.bool,
    /** A boolean to hide or show the button */
    visable: PropTypes.bool,
  })).isRequired,
};
export default DetailsButtons;
