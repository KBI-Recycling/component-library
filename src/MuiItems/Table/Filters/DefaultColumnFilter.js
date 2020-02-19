import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {InputAdornment, TextField, Tooltip} from '@material-ui/core';
import {FilterList} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';

const DefaultColumnFilter = ({column}) => {
  const classes = useStyles();
  const {filterValue, setFilter} = column;
  const handleFilterChange = useCallback(() => {
    if (!filterValue) setFilter({content: '', type: 'Starts'});
    else if (filterValue.type === 'Includes') setFilter({...filterValue, type: 'Starts'});
    else if (filterValue.type === 'Starts') setFilter({...filterValue, type: 'Equals'});
    else if (filterValue.type === 'Equals') setFilter({...filterValue, type: 'Includes'});
  }, [filterValue, setFilter]);
  const filterListProps = useMemo(() => ({
    style: {cursor: 'pointer', fontSize: '1rem'},
    onClick: handleFilterChange,
  }), [handleFilterChange]);
  const inputProps = useMemo(() => ({
    classes: {root: classes.formControlRoot},
    placeholder: 'Type',
    FormHelperTextProps: {style: {display: 'none'}},
    InputLabelProps: {style: {display: 'none'}},
    InputProps: {
      classes: {root: classes.inputRoot},
      endAdornment: (
        <InputAdornment position='end'>
          <Tooltip title={filterValue?.type || 'Includes'}>
            <FilterList {...filterListProps} />
          </Tooltip>
        </InputAdornment>
      ),
    },
    inputProps: {
      autoComplete: 'off',
      style: {
        padding: '0px 0px 2px 0px',
        maxWidth: filterValue?.content?.length >= 5 ? `${filterValue.content.length + 1}ch` : `5ch`,
      },
    },
    value: filterValue?.content || '',
    onChange: e => {
      const content = e.target.value;
      const type = filterValue?.type || 'Includes';
      setFilter({content, type} || undefined); // Set undefined to remove the filter entirely
    },
  }), [classes.formControlRoot, classes.inputRoot, filterListProps, filterValue, setFilter]);

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <TextField {...inputProps} />
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  formControlRoot: {margin: '0px'},
  inputRoot: {
    fontFamily: 'monospace',
    fontSize: '1rem',
    padding: '0px',
  },
}));
DefaultColumnFilter.propTypes = {
  column: PropTypes.object.isRequired,
};
export default DefaultColumnFilter;
