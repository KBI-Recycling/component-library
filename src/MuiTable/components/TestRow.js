import React from 'react';
import PropTypes from 'prop-types';
import {TableRow} from '@material-ui/core';
import MuiBodyCell from './MuiBodyCell';

const TestRow = (props) => {
  console.log(props);
  const {index, style, data: {columns, items, classes}} = props;
  const item = items[index];
  console.log(item);
  return (
    <TableRow component='div'>
      {columns.map((column, index) => {
        console.log(column);
        // const {field, ...otherProps} = column;
        return <MuiBodyCell key={index} field={item[column.dataKey]} />;
      })}
    </TableRow>
  );
};

TestRow.propTypes = {
  columns: PropTypes.array.isRequired,
  row: PropTypes.object.isRequired,
};
export default TestRow;
