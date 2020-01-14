import React from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonGroup, TableBody, TableRow, TableCell} from '@material-ui/core';
import MuiBodyRow from './MuiBodyRow';

const MuiBody = (props) => {
  const {columns, data} = props;

  return (
    <TableBody component='div'>
      {data.slice(0, 10).map((row, index) => <MuiBodyRow key={index} columns={columns} row={row} />)}
      <TableRow component='div'>
        <TableCell colSpan={columns.length} style={{border: 0}}>
          <ButtonGroup color='primary' fullWidth>
            <Button>Load 100 More</Button>
            <Button>Load 250 More</Button>
            <Button>Load All</Button>
          </ButtonGroup>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

MuiBody.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};
export default MuiBody;
