import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Checkbox, Tooltip} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {CheckBoxOutlineBlank, Close, Done, FilterList} from '@material-ui/icons';

const BooleanColumnFilter = ({column}) => {
  const classes = useStyles();
  const {filterValue, setFilter} = column;
  const checkboxProps = useMemo(() => ({
    checked: filterValue?.content === 'true' ? true : false,
    checkedIcon: <Done />,
    classes: {root: classes.root},
    color: 'default',
    disableRipple: true,
    icon: <Close />,
    indeterminate: !filterValue || filterValue?.content === 'indeterminate' ? true : false,
    indeterminateIcon: <CheckBoxOutlineBlank />,
    onChange: e => {
      const type = 'Boolean';
      const content = (() => {
        if (filterValue?.content === undefined) return 'true';
        else if (filterValue.content === 'true') return 'false';
        else if (filterValue.content === 'false') return 'indeterminate';
        else if (filterValue.content === 'indeterminate') return 'true';
      })();
      setFilter({type, content});
    },
  }), [classes.root, filterValue, setFilter]);

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <Tooltip title={filterValue?.type || 'Boolean'}>
        <FilterList style={{paddingRight: '8px', fontSize: '1rem'}} />
      </Tooltip>
      <Checkbox {...checkboxProps} />
    </div>
  );
};
const useStyles = makeStyles({
  root: {
    'padding': '0px',
    '&:hover': {
      padding: '0px',
    },
  },
});
BooleanColumnFilter.propTypes = {
  column: PropTypes.object.isRequired,
};
export default BooleanColumnFilter;
