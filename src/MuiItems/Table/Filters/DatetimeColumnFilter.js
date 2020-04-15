import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {FormControl, Input, InputAdornment, Tooltip} from '@material-ui/core';
import {FilterList} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';
import './DatetimeColumnFilter.css';

const DatetimeColumnFilter = ({column}) => {
  const classes = useStyles();
  const {filterValue, setFilter} = column;
  const handleFilterChange = useCallback(() => {
    if (!filterValue) setFilter({content: '', type: 'Before'});
    else if (filterValue.type === 'Before') setFilter({...filterValue, type: 'After'});
    else if (filterValue.type === 'After') setFilter({...filterValue, type: 'Same'});
    else if (filterValue.type === 'Same') setFilter({...filterValue, type: 'Before'});
  }, [filterValue, setFilter]);
  const filterListProps = useMemo(() => ({
    style: {cursor: 'pointer', fontSize: '1rem'},
    onClick: handleFilterChange,
  }), [handleFilterChange]);
  const inputProps = useMemo(() => ({
    endAdornment: (<InputAdornment position='end'>
      <Tooltip title={filterValue?.type || 'Same'}>
        <FilterList {...filterListProps} />
      </Tooltip>
    </InputAdornment>),
    inputProps: {autoComplete: 'off', tablefilter: 'true'},
    classes: {input: classes.input},
    type: 'date',
    onChange: e => {
      const content = e.target.value;
      const type = filterValue?.type || 'Same';
      const columnType = column.type;
      if (!content) setFilter(undefined);
      else setFilter({content, type, columnType});
    },
  }), [column, classes.input, filterListProps, filterValue, setFilter]);

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
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
