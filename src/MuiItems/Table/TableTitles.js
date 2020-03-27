import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Typography} from '@material-ui/core';

const TableTitles = (props) => {
  const titles = useMemo(() => {
    if (!props.title) return {primary: null, secondary: null};
    else if (typeof props.title === 'string') return {primary: props.title, secondary: null};
    else return {primary: props.title.primary || null, secondary: props.title.secondary || null};
  }, [props.title]);
  const primaryProps = useMemo(() => ({
    variant: 'h6',
    ...props.title?.primaryProps,
    style: props.title?.primaryProps?.style ? {
      padding: '0px 0px 0px 16px',
      whiteSpace: 'nowrap',
      ...props.title.primaryProps.style,
    } : {
      padding: '0px 0px 0px 16px',
    },
  }), [props.title]);
  const secondaryProps = useMemo(() => ({
    gutterBottom: true,
    variant: 'subtitle1',
    ...props.title?.secondaryProps,
    style: props.title?.secondaryProps?.style ? {
      padding: '0px 0px 0px 16px',
      whiteSpace: 'nowrap',
      ...props.title.secondaryProps.style,
    } : {
      padding: '0px 0px 0px 16px',
    },
  }), [props.title]);

  if (!titles.primary && !titles.secondary) return null;
  return (
    <div style={{overflowX: 'auto', overflowY: 'hidden'}}>
      {titles.primary && <Typography {...primaryProps}>{titles.primary}</Typography>}
      {titles.secondary && <Typography {...secondaryProps}>{titles.secondary}</Typography>}
    </div>
  );
};

TableTitles.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({primary: PropTypes.string, secondary: PropTypes.string})]),
};
export default TableTitles;
