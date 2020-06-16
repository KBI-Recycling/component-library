import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {Grid, List, ListItem, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';

const DetailsFieldList = props => {
  const styles = useStyles();
  const {fields} = props;
  const history = useHistory();
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
    onClick: field.link ? () => history.push(field.link) : () => { },
    value: field.value,
    variant: 'outlined',
  }), [history, styles.disabled]);

  return (
    <List style={{minWidth: '100%', maxWidth: '100%'}}>
      <ListItem style={{flexDirection: 'column'}}>
        <Grid container spacing={2} className={styles.menu}>
          {fields.map((field, index) => {
            const {visible = true} = field;
            if (visible) return <Grid item key={index}><TextField {...textFieldProps(field)} /></Grid>;
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
  fields: [{label: `Add 'fields' props`, value: `Add 'fields' props`}],
};
DetailsFieldList.propTypes = {
  fields: PropTypes.array.isRequired,
};
export default DetailsFieldList;
