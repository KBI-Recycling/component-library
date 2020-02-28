import React, {useMemo, useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from '@material-ui/lab';
import {useScrollPosition} from './Hooks/useScrollPosition';

const SpeedDialActions = (props) => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const [scrolling, setScrolling] = useState(false);
  const actions = useMemo(() => {
    return [...props.actions];
  }, [props.actions]);

  const scrollEffect = useCallback(({currPosition, scrolling}) => {
    if (!scrolling) {
      setPosition({...currPosition});
      setScrolling(false);
    } else if (scrolling) setScrolling(true);
  }, []);
  useScrollPosition(scrollEffect, [props.tableEl], props.tableEl);

  const speedDialMemo = useMemo(() => ({
    ariaLabel: 'Table Actions',
    classes: {fab: styles.fab},
    direction: 'down',
    hidden: (actions.length === 0 || scrolling) ? true : false,
    icon: <SpeedDialIcon />,
    onClick: () => setOpen(!open),
    open: open && !scrolling,
    FabProps: {style: {opacity: open ? 1 : 0.4}},
    transitionDuration: {enter: 250, exit: 100},
  }), [actions.length, open, scrolling, styles.fab]);
  const speedDialSticky = useCallback(() => {
    const getLeftPosition = ({rightPadding}) => {
      return (position?.right || 0) - rightPadding + 'px';
    };
    const getTopPosition = ({topPadding, bottomPadding}) => {
      const top = position?.top;
      const bottom = position?.bottom;
      const height = position?.height;
      const topAdjustment = () => {
        if (top > 0) return 0; // Top of table still visible; Do not adjust FAB;
        else if (top <= 0 && bottom >= bottomPadding) return Math.abs(top); // Adjust FAB with scroll;
        else return height - bottomPadding; // Bottom of table reached; Hold FAB at bottom position;
      };
      return (top || 0) + topAdjustment() + topPadding + 'px';
    };
    const style = {
      position: 'fixed',
      top: getTopPosition({topPadding: 50, bottomPadding: 150}),
      left: getLeftPosition({rightPadding: 64}),
    };
    return {style};
  }, [position]);
  const speedDialActionProps = useCallback((action) => {
    return {
      classes: {staticTooltipLabel: styles.staticTooltipLabel},
      onClick: event => action.onClick({
        event,
        columns: props.rtProps.columns,
        data: props.rtProps.data,
        filteredRows: props.rtProps.filteredRows,
        filteredFlatRows: props.rtProps.filteredFlatRows,
        flatHeaders: props.rtProps.flatHeaders,
        flatRows: props.rtProps.flatRows,
        headers: props.rtProps.headers,
        preFilteredRows: props.rtProps.preFilteredRows,
        preFilteredFlatRows: props.rtProps.preFilteredFlatRows,
        preSortedRows: props.rtProps.preSortedRows,
        rows: props.rtProps.rows,
        selectedFlatRows: props.rtProps.selectedFlatRows,
        sortedRows: props.rtProps.sortedRows,
      }),
      tooltipOpen: true,
      tooltipTitle: action.tooltip,
    };
  }, [props.rtProps, styles.staticTooltipLabel]);

  return (
    <SpeedDial {...speedDialMemo} {...speedDialSticky()}>
      {actions.map((action, index) => {
        const Icon = action.icon;
        return <SpeedDialAction key={index} icon={<Icon />} {...speedDialActionProps(action)} />;
      })}
    </SpeedDial>
  );
};

const useStyles = makeStyles(theme => ({
  fab: {
    'width': '40px',
    'height': '40px',
  },
  staticTooltipLabel: {
    whiteSpace: 'nowrap',
  },
}));
SpeedDialActions.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  rtProps: PropTypes.object.isRequired,
  tableEl: PropTypes.object,
};
export default SpeedDialActions;
