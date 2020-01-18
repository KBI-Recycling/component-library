import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const useStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));


const MuiPagination = ({gotoPage, canPreviousPage, previousPage, nextPage, canNextPage, pageCount}) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.root} style={{position: 'absolute', top: '50%', right: 0, display: 'flex', flexDirection: 'column-reverse', marginTop: '-96px', backgroundColor: `rgba(0, 0, 0, 0.3)`}}>
      <IconButton
        onClick={() => gotoPage(0)} disabled={!canPreviousPage}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={() => previousPage()} disabled={!canPreviousPage} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={() => nextPage()} disabled={!canNextPage}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};

MuiPagination.propTypes = {
  gotoPage: PropTypes.func.isRequired,
  canPreviousPage: PropTypes.bool.isRequired,
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  canNextPage: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
};

export default MuiPagination
;
