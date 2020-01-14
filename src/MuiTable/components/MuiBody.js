import React from 'react';
import PropTypes from 'prop-types';
import {TableBody} from '@material-ui/core';
import MuiBodyRow from './MuiBodyRow';
import TestRow from './TestRow';
import {FixedSizeList} from 'react-window';
// import AutoSizer from 'react-virtualized-auto-sizer';

const itemKey = (index, data) => data.items[index].id;
const createItemData = (columns, data) => ({
  columns,
  items: data,
});

const MuiBody = (props) => {
  const {columns, data} = props;
  const itemData = createItemData(columns, data);
  console.log(data);
  // console.log(data.map((row, index) => <MuiBodyRow key={index} columns={columns} row={row} />));
  return (
    <TableBody component='div' style={{width: '100%'}}>
      <FixedSizeList height={420} itemCount={20} itemSize={42} width={900} itemData={itemData} itemKey={itemKey}>
        {({index, style}) => (<MuiBodyRow key={index} columns={columns} row={data[index]} style={style} />)}
      </FixedSizeList>
    </TableBody>
  );
};

MuiBody.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};
export default MuiBody;
