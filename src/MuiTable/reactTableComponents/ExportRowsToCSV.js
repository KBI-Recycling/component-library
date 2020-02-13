/* eslint-disable require-jsdoc */
import moment from 'moment';
import PropTypes from 'prop-types';
export default function exportRowsToCSV(rows, headers, metadata) {
  const lines = []; // do a metada check here.

  for (let i = 0; i < rows.length; i++) {
    let line = '';
    for (let j = 0; j < headers.length; j++) {
      console.log('line', line);
      line += parseCell(String(rows[i].original[headers[j].accessor]));
      if (j !== headers.length) {
        line += ',';
      }
    }
    lines.push(line);
    console.log('lines', lines);
  }
  const csvOutput = lines.join('\n');
  console.log('output', csvOutput);
  const csvBlob = new Blob([csvOutput], {type: 'text/csv'});
  const downloadURL = URL.createObjectURL(csvBlob);
  // Need to create a way to open the downloadURL
  const anchorElement = document.createElement('a');
  anchorElement.href = downloadURL;
  anchorElement.download = 'table-export.csv';
  anchorElement.click();
  // Clear the URL to avoid IE issues
  setTimeout(() => {
    URL.revokeObjectURL(downloadURL);
  }, 500);
  return;
}

exportRowsToCSV.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({
    original: PropTypes.object,
  })).isRequired,
  headers: PropTypes.arrayOf(PropTypes.shape({
    accessor: PropTypes.string.isRequired,
    Header: PropTypes.string,
  })).isRequired,
  metada: PropTypes.string,
};

function parseCell(cellValue) {
  // Replace all double quotes with two double quotes
  cellValue = cellValue.replace(/"/g, `""`);
  // If value contains comma, new-line or double-quote, enclose in double quotes
  cellValue = /[",\n]/.test(cellValue) ? `"${cellValue}"` : cellValue;
  return cellValue;
}
