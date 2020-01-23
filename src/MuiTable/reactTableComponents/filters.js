/* eslint-disable require-jsdoc */
import moment from 'moment';
export function startsWith(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id];
    return rowValue !== undefined ?
      String(rowValue)
        .toLowerCase()
        .startsWith(String(filterValue).toLowerCase()) :
      true;
  });
}

export function dateRange(rows, ids, filterValue) {
  const [min, max] = filterValue || [];
  console.log('Min and Max', min, max);
  return rows.filter(row => {
    // console.log(row);
    return ids.some(id => {
      const rowValue = row.values[id];
      if (min && max) {
        return moment(rowValue).isAfter(min) && moment(rowValue).isBefore(max);
      } else if (min) {
        return moment(rowValue).isAfter(min);
      } else if (max) {
        return moment(rowValue).isBefore(max);
      }
    });
  });
}
