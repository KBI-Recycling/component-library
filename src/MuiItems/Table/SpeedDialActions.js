import React, {useState} from 'react';
import {Print} from '@material-ui/icons';
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from '@material-ui/lab';

const SpeedDialActions = (props) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const actions = [
    {icon: <Print />, name: 'Print1', onClick: 'Print1'},
    {icon: <Print />, name: 'Print2', onClick: 'Print2'},
  ];

  return (
    <SpeedDial
      ariaLabel="SpeedDial tooltip example"
      style={{
        position: 'absolute',
        bottom: '40px',
        right: '40px',
      }}
      hidden={false}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={() => setOpen(true)}
      open={open}
    >
      {actions.map(action => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen
          onClick={() => alert(action.onClick)}
        />
      ))}
    </SpeedDial>
  );
};

export default SpeedDialActions;
