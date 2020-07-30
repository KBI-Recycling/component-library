import React from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Menu, MenuItem} from '@material-ui/core';
// import {Auth} from 'config.js';
// import {acLogoutUser} from 'global_state/actions.js';

const ModuleMenu = ({anchorEl, setAnchorEl}) => {
  const history = useHistory();

  const goToModule = moduleSelected => {
    if (moduleSelected === 'entry') {
      history.push('/entry');
    } else if (moduleSelected === 'crm') {
      history.push('/crm/accounts');
    } else if (moduleSelected === 'ehs') {
      history.push('/ehs/dashboard');
    } else if (moduleSelected === 'admin') {
      history.push('/admin/users');
    } else if (moduleSelected === 'tracking') {
      history.push('/kbi-tracking/dashboard/');
    } else if (moduleSelected === 'catalyst') {
      history.push('/catalyst/dashboard/');
    }
  };

  const appBarMenu = {
    id: 'appbar-menu',
    open: Boolean(anchorEl),
    anchorEl: anchorEl,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
    children: [
      !history.location.pathname.includes('/entry') && (
        <MenuItem key='entry' onClick={() => goToModule('entry')}>
          Entry
        </MenuItem>
      ),
      !history.location.pathname.includes('/crm') && (
        <MenuItem key='crm' onClick={() => goToModule('crm')}>
          CRM
        </MenuItem>
      ),
      !history.location.pathname.includes('/ehs') && (
        <MenuItem key='ehs' onClick={() => goToModule('ehs')}>
          EHS
        </MenuItem>
      ),
      !history.location.pathname.includes('/admin') && (
        <MenuItem key='admin' onClick={() => goToModule('admin')}>
          Admin
        </MenuItem>
      ),
      !history.location.pathname.includes('/kbi-tracking') && (
        <MenuItem key='tracking' onClick={() => goToModule('tracking')}>
          Tracking
        </MenuItem>
      ),
      !history.location.pathname.includes('/catalyst') && (
        <MenuItem key='catalyst' onClick={() => goToModule('catalyst')}>
          Catalyst
        </MenuItem>
      ),
      <MenuItem
        key='logout'
        onClick={() => {
          // Auth.signOut()
          //   .then(() => {
          //     acLogoutUser();
          //   })
          //   .catch(error => console.error('error logging out', error));
        }}
      >
        Log Out
      </MenuItem>,
    ],
    style: {position: 'fixed', right: 0},
    onClose: () => setAnchorEl(null),
  };

  return <Menu {...appBarMenu} />;
};

ModuleMenu.propTypes = {
  anchorEl: PropTypes.object,
  setAnchorEl: PropTypes.func.isRequired,
};

export default ModuleMenu;
