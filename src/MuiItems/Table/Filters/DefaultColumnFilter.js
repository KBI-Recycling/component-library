import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {FilterList} from '@material-ui/icons';

const DefaultColumnFilter = ({column}) => {
  const {filterValue, setFilter} = column;
  const inputProps = useMemo(() => ({
    placeholder: column.Header,
    style: {
      border: '0px',
      fontFamily: 'monospace',
      fontSize: '1rem',
      maxWidth: filterValue && filterValue.length > column.Header.length ? `${filterValue.length + 1}ch` : `${column.Header.length + 1}ch`,
    },
    value: filterValue || '',
    onChange: e => {
      setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
    },
  }), [column, filterValue, setFilter]);

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <FilterList style={{paddingRight: '8px', fontSize: '1rem'}} />
      <input {...inputProps} />
    </div>
  );
};

DefaultColumnFilter.propTypes = {
  column: PropTypes.object.isRequired,
};
export default DefaultColumnFilter;
