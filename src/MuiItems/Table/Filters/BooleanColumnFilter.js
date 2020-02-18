import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {FormControl, NativeSelect, Tooltip} from '@material-ui/core';
import {FilterList} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';

const BooleanColumnFilter = ({column}) => {
  const classes = useStyles();
  const {filterValue, setFilter} = column;
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
      <Tooltip title={filterValue?.type || 'Equals'}>
        <FilterList style={{paddingRight: '8px', fontSize: '1rem'}} />
      </Tooltip>
      <FormControl className={classes.margin}>
        <NativeSelect {...selectProps}>
          <option value=''>All</option>
          <option value={true}>True</option>
          <option value={false}>False</option>
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
BooleanColumnFilter.propTypes = {
  column: PropTypes.object.isRequired,
};
export default BooleanColumnFilter;
