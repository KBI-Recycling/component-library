import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {FormControl, NativeSelect} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const SelectColumnFilter = ({column}) => {
  const classes = useStyles();
  const {filterValue, setFilter, preFilteredRows, id} = column;
  const options = useMemo(() => {
    // Calculate the options for filtering using the preFilteredRows
    const options = new Set();
    preFilteredRows.forEach(row => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);
  const selectProps = useMemo(() => ({
    classes: {root: classes.root},
    value: filterValue?.content || '',
    onChange: e => {
      const content = e.target.value;
      const type = filterValue?.type || 'Equals';
      setFilter({content, type} || undefined); // Set undefined to remove the filter entirely
    },
  }), [classes.root, filterValue, setFilter]);

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <FormControl className={classes.margin}>
        <NativeSelect {...selectProps}>
          <option value=''>All</option>
          {options.map((option, i) => <option key={i} value={option}>{option}</option>)}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  margin: {margin: '0px'},
  root: {
    fontFamily: 'monospace',
    fontSize: '1rem',
    padding: '0px 0px 2px 0px',
  },
}));
SelectColumnFilter.propTypes = {
  column: PropTypes.object.isRequired,
};
export default SelectColumnFilter;
