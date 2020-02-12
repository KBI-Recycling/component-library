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

export function dateBefore(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id];
    return rowValue !== undefined && moment(rowValue).isBefore(filterValue);
  });
}

export function dateAfter(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id];
    return rowValue !== undefined && moment(rowValue).isAfter(filterValue);
  });
}

export function dateEquals(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id];
    return rowValue !== undefined && moment(rowValue).isSame(filterValue);
  });
}
