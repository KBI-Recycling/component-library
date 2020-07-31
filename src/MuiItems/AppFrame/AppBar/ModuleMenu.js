import React from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Menu, MenuItem} from '@material-ui/core';
// import {Auth} from 'config.js';
// import {acLogoutUser} from 'global_state/actions.js';

const ModuleMenu = ({anchorEl, setAnchorEl, moduleMenuOptions, logoutFunction}) => {
  const history = useHistory();

  const goToModule = pathToNewModule => {
    window.open(pathToNewModule, '__blank');
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
    children: [...moduleMenuOptions.map(option => {
      if (history.location.pathname.includes(option.pathComparisonString)) return null;
      else {
        return (
          <MenuItem key={option.path} onClick={() => goToModule(option.path)}>
            {option.title}
          </MenuItem>
        );
      }
    }),
    <MenuItem
      key='logout'
      onClick={() => {
        logoutFunction();
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
  moduleMenuOptions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    pathComparisonString: PropTypes.string.isRequired,
  })).isRequired,
  logoutFunction: PropTypes.func.isRequired,
};

export default ModuleMenu;
