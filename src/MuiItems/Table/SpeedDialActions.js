import React, {Fragment, useMemo, useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from '@material-ui/lab';
import {Sticky} from 'react-sticky';

const SpeedDialActions = (props) => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const actions = useMemo(() => {
    return [...props.actions];
  }, [props.actions]);

  const speedDialMemo = useMemo(() => ({
    ariaLabel: 'Table Actions',
    classes: {fab: styles.fab},
    direction: 'down',
    hidden: actions.length === 0 ? true : false,
    icon: <SpeedDialIcon />,
    onClose: () => setOpen(false),
    onOpen: () => setOpen(true),
    open,
  }), [actions.length, open, styles.fab]);
  const speedDialSticky = useCallback((stickyProps) => {
    const tableWindowDifference = window.innerWidth - stickyProps.style.width;
    const paddingRight = 16;
    const stickyRight = (tableWindowDifference + paddingRight) / 2;
    const regularStyle = {
      style: {
        position: 'absolute',
        top: '50px',
        right: `${paddingRight}px`,
      },
    };
    const stickyStyle = {
      style: {
        position: 'fixed',
        top: '50px',
        right: stickyRight,
      },
    };
    if (!stickyProps.isSticky) return regularStyle;
    if (stickyProps.isSticky) return stickyStyle;
  }, []);
  const speedDialActionProps = useCallback((action) => {
    return {
      onClick: () => alert(action.onClick),
      tooltipOpen: true,
      tooltipTitle: action.tooltip,
    };
  }, []);

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
    width: '32px',
    height: '32px',
    opacity: '30%',
  },
}));
SpeedDialActions.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default SpeedDialActions;
