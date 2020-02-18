import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {FormControl, Input, Tooltip} from '@material-ui/core';
import {FilterList} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';
import './DatetimeColumnFilter.css';

const DatetimeColumnFilter = ({column}) => {
  const classes = useStyles();
  const {filterValue, setFilter} = column;
  const handleFilterChange = useCallback(() => {
    if (!filterValue) setFilter({content: '', type: 'After'});
    else if (filterValue.type === 'Before') setFilter({...filterValue, type: 'After'});
    else if (filterValue.type === 'After') setFilter({...filterValue, type: 'Same'});
    else if (filterValue.type === 'Same') setFilter({...filterValue, type: 'Before'});
  }, [filterValue, setFilter]);
  const filterListProps = useMemo(() => ({
    style: {cursor: 'pointer', paddingRight: '8px', fontSize: '1rem'},
    onClick: handleFilterChange,
  }), [handleFilterChange]);
  const inputProps = useMemo(() => ({
    inputProps: {autoComplete: 'off'},
    classes: {input: classes.input},
    type: 'date',
    onChange: e => {
      const content = e.target.value;
      const type = filterValue?.type || 'Before';
      if (!content) setFilter(undefined);
      else setFilter({content, type});
    },
  }), [classes.input, filterValue, setFilter]);

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <Tooltip title={filterValue?.type || 'Before'}>
        <FilterList {...filterListProps} />
      </Tooltip>
      <FormControl className={classes.margin}>
        <Input {...inputProps} />
      </FormControl>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  margin: {margin: '0px'},
  input: {
    'fontFamily': 'monospace',
    'fontSize': '1rem',
    'maxWidth': '11ch',
    'padding': '0px 0px 2px 0px',
  },
}));
DatetimeColumnFilter.propTypes = {
  column: PropTypes.object.isRequired,
};
export default DatetimeColumnFilter;
