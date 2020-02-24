import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonGroup, FormControl, Hidden, MenuItem, Select, TableRow, TableCell, Typography} from '@material-ui/core';
import {SkipPrevious, NavigateBefore, NavigateNext, SkipNext} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';


const TableFooterRow = (props) => {
  const {canNextPage, canPreviousPage, gotoPage, nextPage, state, pageOptions, previousPage, setPageSize} = props.rtProps;
  const pagiButtonStyle = useMemo(() => ({
    border: '0px',
    padding: '4px 8px',
  }), []);
  const selectDisplayStyle = useMemo(() => ({
    style: {
      color: 'rgba(0, 0, 0, 0.54)',
      fontSize: '.75rem',
      padding: '0px 24px 0px 8px',
    },
  }), []);
  const styles = useStyles();

  if (!props.paginationActive) return null;
  return (
    <TableRow>
      <TableCell colSpan={props.columns.length} style={{padding: '2px 0px'}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <ButtonGroup color='primary' style={{marginRight: '8px'}}>
            <Button style={pagiButtonStyle} disabled={!canPreviousPage} onClick={() => gotoPage(0)} >
              <SkipPrevious />
            </Button>
            <Button style={pagiButtonStyle} disabled={!canPreviousPage} onClick={() => previousPage()}>
              <NavigateBefore />
            </Button>
            <Button style={pagiButtonStyle} disabled={!canNextPage} onClick={() => nextPage()}>
              <NavigateNext />
            </Button>
            <Button style={pagiButtonStyle} disabled={!canNextPage} onClick={() => gotoPage(props.rtProps.pageCount - 1)}>
              <SkipNext />
            </Button>
          </ButtonGroup>
          <FormControl style={{marginRight: '16px'}}>
            <Select value={state.pageSize} onChange={e => setPageSize(e.target.value)} SelectDisplayProps={selectDisplayStyle}>
              {props.paginationSizes.map(pageSize => (
                <MenuItem key={pageSize} value={pageSize} className={styles.menuItem}>
                  {pageSize} Rows
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Hidden xsDown>
            <Typography variant='caption' style={{marginRight: '24px'}}>
              Page {state.pageIndex + 1} of {pageOptions.length}
            </Typography>
          </Hidden>
        </div>
      </TableCell>
    </TableRow>
  );
};

const useStyles = makeStyles(theme => ({
  menuItem: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '.75rem',
    padding: '4px 8px',
  },
}));
TableFooterRow.propTypes = {
  columns: PropTypes.array.isRequired,
  paginationActive: PropTypes.bool,
  paginationSizes: PropTypes.arrayOf(PropTypes.number),
  rtProps: PropTypes.object.isRequired,
};
export default TableFooterRow;
