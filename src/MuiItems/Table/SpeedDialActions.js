import React, {useMemo, useCallback, useState} from 'react';
import PropTypes from 'prop-types';

import {SpeedDial, SpeedDialAction, SpeedDialIcon} from '@material-ui/lab';

const SpeedDialActions = (props) => {
  const [open, setOpen] = useState(false);
  const actions = useMemo(() => {
    return [...props.actions];
  }, [props.actions]);

  const speedDialProps = useMemo(() => ({
    ariaLabel: 'Table Actions',
    hidden: false,
    icon: <SpeedDialIcon />,
    onClose: () => setOpen(false),
    onOpen: () => setOpen(true),
    open,
    style: {
      position: 'absolute',
      bottom: '40px',
      right: '40px',
    },
  }), [open]);
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

SpeedDialActions.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default SpeedDialActions;
