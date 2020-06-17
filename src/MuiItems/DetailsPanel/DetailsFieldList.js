import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {Grid, List, ListItem, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const DetailsFieldList = props => {
  const styles = useStyles();

  const textFieldProps = useCallback((field) => ({
    className: styles.disabled,
    fullWidth: true,
    inputProps: {
      style: {
        cursor: field.link ? 'pointer' : 'default',
        color: field.link ? '#3f51b5' : 'inherit',
        pointerEvents: field.link ? 'auto' : 'none',
      },
    },
    InputProps: {
      readOnly: true,
      style: {
        backgroundColor: 'white',
        cursor: field.link ? 'pointer' : 'default',
        fontSize: '.9rem',
        pointerEvents: field.link ? 'auto' : 'none',
      },
    },
    label: field.label,
    margin: 'dense',
    multiline: true,
    onClick: field.onClick ? e => field.onClick(e) : () => { },
    value: field.value,
    variant: 'outlined',
    ...field.textFieldProps,
  }), [styles.disabled]);
  const listStyle = {
    width: '100%',
  };

  return (
    <List style={{...listStyle}}>
      <ListItem style={{flexDirection: 'column'}}>
        <Grid container spacing={2} className={styles.menu}>
          {props.fields.map((field, index) => {
            const {visible = true} = field;
            if (visible) return <Grid item key={`field${index}`}><TextField {...textFieldProps(field)} /></Grid>;
            else return null;
          })}
        </Grid>
      </ListItem>
    </List>
  );
};

const useStyles = makeStyles(theme => ({
  menu: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'ghostwhite',
    border: '1px solid darkgray',
  },
}));
DetailsFieldList.defaultProps = {
  fields: [],
};
DetailsFieldList.propTypes = {
  /** An array of objects mapped over for each of the sections in the list */
  fields: PropTypes.arrayOf(PropTypes.shape({
  /** The label for the field */
    label: PropTypes.string.isRequired,
    /** The value for the field */
    value: PropTypes.string.isRequired,
    /** This boolean will change the field to act like a link. */
    link: PropTypes.bool,
    /** The click handler for the field */
    onClick: PropTypes.func,
    /** A boolean to hide or show the field */
    visable: PropTypes.bool,
    /** any field specific props to pass to the TextField component */
    textFieldProps: PropTypes.object,
  })).isRequired,
};
export default DetailsFieldList;
