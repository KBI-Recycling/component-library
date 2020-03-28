import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Typography} from '@material-ui/core';

const TableTitles = (props) => {
  const titles = useMemo(() => {
    if (!props.title) return {primary: null, secondary: null};
    else if (typeof props.title === 'string') return {primary: props.title, secondary: null};
    else return {primary: props.title.primary || null, secondary: props.title.secondary || null};
  }, [props.title]);
  const wrapperStyle = useMemo(() => {
    const defaultStyles = {overflowX: 'auto', overflowY: 'hidden', padding: '16px'};
    if (props.title?.wrapperStyle) return {...defaultStyles, ...props.title.wrapperStyle};
    return defaultStyles;
  }, [props.title]);
  const primaryProps = useMemo(() => ({
    variant: 'h6',
    ...props.title?.primaryProps,
    style: props.title?.primaryProps?.style ? {
      whiteSpace: 'nowrap',
      ...props.title.primaryProps.style,
    } : {
      whiteSpace: 'nowrap',
    },
  }), [props.title]);
  const secondaryProps = useMemo(() => ({
    gutterBottom: true,
    variant: 'subtitle1',
    ...props.title?.secondaryProps,
    style: props.title?.secondaryProps?.style ? {
      whiteSpace: 'nowrap',
      ...props.title.secondaryProps.style,
    } : {
      whiteSpace: 'nowrap',
    },
  }), [props.title]);

  if (!titles.primary && !titles.secondary) return null;
  return (
    <div style={wrapperStyle}>
      {titles.primary && <Typography {...primaryProps}>{titles.primary}</Typography>}
      {titles.secondary && <Typography {...secondaryProps}>{titles.secondary}</Typography>}
    </div>
  );
};

TableTitles.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
export default React.memo(TableTitles);
