import React, {useEffect, useMemo, useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from '@material-ui/lab';
import {Sticky} from 'react-sticky';

const SpeedDialActions = (props) => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [tableEl, setTableEl] = useState(null);
  const actions = useMemo(() => {
    return [...props.actions];
  }, [props.actions]);

  useEffect(() => {
    const MuiTable = document.getElementById('MuiTable');
    if (MuiTable) setTableEl(MuiTable);
  }, []);

  const speedDialMemo = useMemo(() => ({
    ariaLabel: 'Table Actions',
    classes: {fab: styles.fab},
    direction: 'down',
    hidden: (actions.length === 0 || !tableEl) ? true : false,
    icon: <SpeedDialIcon />,
    onClick: () => setOpen(!open),
    open,
  }), [actions.length, open, styles.fab, tableEl]);
  const speedDialSticky = useCallback(() => {
    const tableBoundClient = tableEl?.getBoundingClientRect();
    const getLeftPosition = ({rightPadding}) => {
      return (tableBoundClient?.right || 0) - rightPadding + 'px';
    };
    const getTopPosition = ({topPadding, bottomPadding}) => {
      const top = tableBoundClient?.top;
      const bottom = tableBoundClient?.bottom;
      const height = tableBoundClient?.height;
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
  }, [tableEl]);
  const speedDialActionProps = useCallback((action) => {
    return {
      classes: {staticTooltipLabel: styles.staticTooltipLabel},
      onClick: () => alert(action.onClick),
      tooltipOpen: true,
      tooltipTitle: action.tooltip,
    };
  }, [styles.staticTooltipLabel]);

  return (
    <Sticky disableCompensation>{stickyProps => {
      return (
        <SpeedDial {...speedDialMemo} {...speedDialSticky(stickyProps)}>
          {actions.map((action, index) => {
            const Icon = action.icon;
            return <SpeedDialAction key={index} icon={<Icon />} {...speedDialActionProps(action)} />;
          })}
        </SpeedDial>
      );
    }}
    </Sticky>
  );
};

const useStyles = makeStyles(theme => ({
  fab: {
    'width': '40px',
    'height': '40px',
    'opacity': 0.6,
  },
  staticTooltipLabel: {
    whiteSpace: 'nowrap',
  },
}));
SpeedDialActions.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default SpeedDialActions;
