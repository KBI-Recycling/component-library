import moment from 'moment';
import PropTypes from 'prop-types';
import get from 'lodash.get';

export default function exportToCSV(rows, headers, fileName, metadata, includeHeaders = true) {
  const lines = metadata ? [parseCell(metadata)] : [];

  if (includeHeaders) {
    let line = '';
    headers.forEach((header, i, arr) => {
      line += parseCell(header.Header);
      if (i < arr.length - 1) {
        line += ',';
      }
    });
    lines.push(line);
  }

  rows.forEach(row => {
    let line = '';
    headers.forEach((header, i, arr) => {
      const cellValue = get(row, header.accessor);
      if (cellValue !== undefined) {
        if (header.type === 'numeric') {
          line += parseCell(cellValue.toLocaleString());
        } else if (header.type === 'datetime') {
          line += parseCell(moment(cellValue).format(header.datetimeFormat || 'MM/DD/YYYY'));
        } else {
          line += parseCell(String(cellValue));
        }
      }
      if (i < arr.length - 1) {
        line += ',';
      }
    });
    lines.push(line);
  });

  const csvOutput = lines.join('\n');
  const csvBlob = new Blob([csvOutput], {type: 'text/csv'});
  const downloadURL = URL.createObjectURL(csvBlob);
  // Need to create a way to open the downloadURL
  const anchorElement = document.createElement('a');
  anchorElement.href = downloadURL;
  anchorElement.download = fileName || 'table-export.csv';
  anchorElement.click();
  // Clear the URL to avoid IE issues
  setTimeout(() => {
    URL.revokeObjectURL(downloadURL);
  }, 500);
  return;
}
// not "props" but since we don't use TypeScript...
exportToCSV.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({
    original: PropTypes.object,
  })).isRequired,
  headers: PropTypes.arrayOf(PropTypes.shape({
    accessor: PropTypes.string.isRequired,
    Header: PropTypes.string.isRequired,
    type: PropTypes.string,
    datetimeFormat: PropTypes.string, // A moment.js recognized date format.
  })).isRequired,
  fileName: PropTypes.string,
  metadata: PropTypes.string,
  includeHeaders: PropTypes.bool,
};

function parseCell(cellValue) {
  // Replace all double quotes with two double quotes
  cellValue = cellValue.replace(/"/g, `""`);
  // If value contains comma, new-line or double-quote, enclose in double quotes
  cellValue = /[",\n]/.test(cellValue) ? `"${cellValue}"` : cellValue;
  return cellValue;
}

parseCell.propTypes = {
  cellValue: PropTypes.string.isRequired,
};
