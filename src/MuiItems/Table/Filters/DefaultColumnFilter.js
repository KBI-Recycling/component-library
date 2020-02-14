import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {FilterList} from '@material-ui/icons';

const DefaultColumnFilter = ({column}) => {
  const {filterValue, setFilter} = column;
  const handleFilterChange = useCallback(() => {
    if (!filterValue) setFilter({content: '', type: 'includes'});
    else if (filterValue.type === 'includes') setFilter({...filterValue, type: 'startsWith'});
    else if (filterValue.type === 'startsWith') setFilter({...filterValue, type: 'equals'});
    else if (filterValue.type === 'equals') setFilter({...filterValue, type: 'includes'});
  }, [filterValue, setFilter]);
  const filterListProps = useMemo(() => ({
    style: {cursor: 'pointer', paddingRight: '8px', fontSize: '1rem'},
    onClick: handleFilterChange,
  }), [handleFilterChange]);
  const inputProps = useMemo(() => ({
    placeholder: column.Header,
    style: {
      border: '0px',
      fontFamily: 'monospace',
      fontSize: '1rem',
      maxWidth: filterValue && filterValue.length > column.Header.length ? `${filterValue.length + 1}ch` : `${column.Header.length + 1}ch`,
    },
    value: filterValue?.content || '',
    onChange: e => {
      const content = e.target.value;
      const type = filterValue?.type || 'includes';
      setFilter({content, type} || undefined); // Set undefined to remove the filter entirely
    },
  }), [column, filterValue, setFilter]);

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <FilterList {...filterListProps} />
      <input {...inputProps} />
    </div>
  );
};

DefaultColumnFilter.propTypes = {
  column: PropTypes.object.isRequired,
};
export default DefaultColumnFilter;
