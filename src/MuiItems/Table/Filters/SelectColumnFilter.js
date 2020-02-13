import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {FilterList} from '@material-ui/icons';

const SelectColumnFilter = ({column}) => {
  const {filterValue, setFilter, preFilteredRows, id} = column;
  const options = useMemo(() => {
    // Calculate the options for filtering using the preFilteredRows
    const options = new Set();
    preFilteredRows.forEach(row => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <FilterList style={{paddingRight: '8px', fontSize: '1rem'}} />
      <select value={filterValue} onChange={e => setFilter(e.target.value || undefined)}>
        <option value=''>All</option>
        {options.map((option, i) => <option key={i} value={option}>{option}</option>)}
      </select>
    </div>
  );
};

SelectColumnFilter.propTypes = {
  column: PropTypes.object.isRequired,
};
export default SelectColumnFilter;
