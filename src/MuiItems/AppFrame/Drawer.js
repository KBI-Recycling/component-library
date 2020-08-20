import React, {useMemo} from 'react';
import {Drawer as MuiDrawer, Divider, List, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import KBILogo from './KBI-logo(small).png';
import MenuItem from './MenuItem.js';

const Drawer = ({menuItems, moduleTitle, setDrawerOpen, smallDevice, drawerOpen, currentUserEmail}) => {
  const classes = useStyles();

  // Component Props
  const muiDrawerProps = useMemo(() => ({
    classes: {paper: classes.drawerPaper},
    onClose: () => {
      if (smallDevice) setDrawerOpen(false);
    },
    open: drawerOpen,
    variant: smallDevice ? 'temporary' : 'persistent',
  }), [classes.drawerPaper, drawerOpen, setDrawerOpen, smallDevice]);

  return (
    <MuiDrawer {...muiDrawerProps}>
      <img src={KBILogo} alt='KBI' className={classes.logo} />
      <Typography className={classes.title}>{moduleTitle}</Typography>
      <Typography className={classes.email}>{currentUserEmail}</Typography>
      <Divider className={classes.divider} />
      <List className={classes.list}>
        {menuItems.map(item => (
          <MenuItem key={item.text}
            icon={item.icon()}
            link={item.link}
            text={item.text}
            selectedLinkComparison={item.selectedLinkComparison}
            setDrawerOpen={setDrawerOpen}
            smallDevice={smallDevice}
          />),
        )}
      </List>
    </MuiDrawer>
  );
};

const useStyles = makeStyles(theme => {
  const leftOffset = '32px';
  return {
    drawerPaper: {
      [theme.breakpoints.down('xs')]: {
        width: '75vw',
      },
      [theme.breakpoints.up('sm')]: {
        position: 'fixed',
        whiteSpace: 'nowrap',
        width: '300px',
        paddingTop: theme.spacing(6),
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      minHeight: '100vh',
      background: `linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.7) 100%), url('https://www.glenstone.org/wp-content/uploads/prod/2018/07/AV_Landscape-Hero-Contour-2993.jpg')`, // eslint-disable-line max-len
      backgroundSize: 'cover',
      boxShadow: '1px 0px 8px 2px rgba(0,0,0,0.25);',

    },
    logo: {
      width: '156px',
      height: '90px',
      margin: leftOffset,
    },
    title: {
      fontSize: '20px',
      fontWeight: 500,
      lineHeight: '23px',
      paddingLeft: leftOffset,
      paddingBottom: '2px',
    },
    email: {
      fontSize: '14px',
      fontHeight: 'normal',
      lineHeight: '20px',
      paddingLeft: leftOffset,
      paddingBottom: '13px',
    },
    divider: {
      height: '1px',
    },
    list: {
      padding: '16px 8px',
    },
  };
});

Drawer.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    selectedLinkComparison: PropTypes.string,
  })),
  moduleTitle: PropTypes.string.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  smallDevice: PropTypes.bool.isRequired,
  currentUserEmail: PropTypes.string.isRequired,
};

export default Drawer;
