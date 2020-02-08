/* eslint-disable require-jsdoc */
function exportToCSV(table, includeHeaders = true, metadata) {
  const rows = Array.from(table.querySelectorAll('tr'));
  if (!includeHeaders && rows[0].querySelectorAll('th').length) {
    rows.shift();
  }
  const lines = metadata ? [parseCell(metadata)] : [];
  const numCols = findLongestRowLength(rows);

  for (const row of rows) {
    let line = '';
    for (let i = 0; i < numCols; i++) {
      if (row.children[i] !== undefined) {
        line += parseCell(row.children[i]);
      }
      line += (i !== (numCols - 1)) ? ',' : '';
    }
    lines.push(line);
  }
  const csvOutput = lines.join('\n');
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

function findLongestRowLength(rows) {
  return rows.reduce((l, row) => row.childElementCount > l ? row.childElementCount : l, 0);
}

function parseCell(tableCell) {
  let parsedValue = tableCell.textContent;
  // Replace all double quotes with two double quotes
  parsedValue = parsedValue.replace(/"/g, `""`);
  // If value contains comma, new-line or double-quote, enclose in double quotes
  parsedValue = /[",\n]/.test(parsedValue) ? `"${parsedValue}"` : parsedValue;
  return parsedValue;
}
