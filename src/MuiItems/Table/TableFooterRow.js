import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonGroup, FormControl, Hidden, MenuItem, Select, TableRow, TableCell, Typography} from '@material-ui/core';
import {SkipPrevious, NavigateBefore, NavigateNext, SkipNext} from '@material-ui/icons';


const TableFooterRow = (props) => {
  const pagiButtonStyle = useMemo(() => {
    return {
      border: '0px',
      padding: '4px 8px',
    };
  }, []);
  const selectDisplayStyle = useMemo(() => {
    return {
      style: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '.75rem',
        padding: '0px 24px 0px 8px',
      },
    };
  }, []);
  const menuItemStyle = useMemo(() => {
    return {
      color: 'rgba(0, 0, 0, 0.54)',
      fontSize: '.75rem',
      padding: '4px 8px',
    };
  }, []);

  if (!props.paginationActive) return null;
  return (
    <TableRow>
      <TableCell colSpan={props.colSpan} style={{padding: '2px 0px'}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <ButtonGroup color='primary' style={{marginRight: '8px'}}>
            <Button style={pagiButtonStyle} disabled={!props.canPreviousPage} onClick={() => props.gotoPage(0)} >
              <SkipPrevious />
            </Button>
            <Button style={pagiButtonStyle} disabled={!props.canPreviousPage} onClick={() => props.previousPage()}>
              <NavigateBefore />
            </Button>
            <Button style={pagiButtonStyle} disabled={!props.canNextPage} onClick={() => props.nextPage()}>
              <NavigateNext />
            </Button>
            <Button style={pagiButtonStyle} disabled={!props.canNextPage} onClick={() => props.gotoPage(props.pageCount - 1)}>
              <SkipNext />
            </Button>
          </ButtonGroup>
          <FormControl style={{marginRight: '16px'}}>
            <Select value={props.statePageSize} onChange={e => props.setPageSize(e.target.value)} SelectDisplayProps={selectDisplayStyle}>
              {props.paginationSizes.map(pageSize => (
                <MenuItem key={pageSize} value={pageSize} style={menuItemStyle}>
                  {pageSize} Rows
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Hidden xsDown>
            <Typography variant='caption' style={{marginRight: '24px'}}>
              Page {props.statePageIndex + 1} of {props.pageOptionsLength}
            </Typography>
          </Hidden>
        </div>
      </TableCell>
    </TableRow>
  );
};

TableFooterRow.propTypes = {
  canNextPage: PropTypes.bool.isRequired,
  canPreviousPage: PropTypes.bool.isRequired,
  colSpan: PropTypes.number.isRequired,
  gotoPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageOptionsLength: PropTypes.number.isRequired,
  paginationActive: PropTypes.bool,
  paginationSizes: PropTypes.arrayOf(PropTypes.number),
  previousPage: PropTypes.func.isRequired,
  setPageSize: PropTypes.func.isRequired,
  statePageIndex: PropTypes.number.isRequired,
  statePageSize: PropTypes.number.isRequired,
};
export default React.memo(TableFooterRow);
