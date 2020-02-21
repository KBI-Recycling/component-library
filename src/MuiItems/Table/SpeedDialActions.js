import React, {useMemo, useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

import {SpeedDial, SpeedDialAction, SpeedDialIcon} from '@material-ui/lab';

const SpeedDialActions = (props) => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const actions = useMemo(() => {
    return [...props.actions];
  }, [props.actions]);

  const speedDialProps = useMemo(() => ({
    ariaLabel: 'Table Actions',
    classes: {
      root: styles.root,
      fab: styles.fab,
    },
    direction: 'down',
    hidden: actions.length === 0 ? true : false,
    icon: <SpeedDialIcon />,
    onClose: () => setOpen(false),
    onOpen: () => setOpen(true),
    open,
  }), [actions.length, open, styles.fab, styles.root]);
  const speedDialActionProps = useCallback((action) => {
    return {
      onClick: () => alert(action.onClick),
      tooltipOpen: true,
      tooltipTitle: action.tooltip,
    };
  }, []);

  return (
    <SpeedDial {...speedDialProps}>
      {actions.map((action, index) => {
        const Icon = action.icon;
        return <SpeedDialAction key={index} icon={<Icon />} {...speedDialActionProps(action)} />;
      })}
    </SpeedDial>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: '16px',
    right: '16px',
  },
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
