import React, {useMemo} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
import {Drawer as MuiDrawer, Divider, List, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
// import KBILogo from './KBI-logo(small).png';
import MenuItem from './MenuItem.js';
// import {acSetDrawerOpen} from 'global_state/actions.js';

const Drawer = ({menuItems, moduleTitle}) => {
  const currentUserEmail = 'an email here'; // useSelector(state => state.global.currentUser.email);
  const drawerOpen = true; // useSelector(state => state.global.drawerOpen);
  const smallDevice = false; // useSelector(state => state.global.smallDevice);
  const classes = useStyles();
  // const dispatch = useDispatch();

  // Component Props
  const muiDrawerProps = useMemo(() => ({
    classes: {paper: classes.drawerPaper},
    onClose: () => {
      // if (smallDevice) dispatch(acSetDrawerOpen(false));
    },
    open: drawerOpen,
    variant: smallDevice ? 'temporary' : 'persistent',
  }), [classes, drawerOpen, smallDevice]);

  return (
    <MuiDrawer {...muiDrawerProps}>
      <img src={'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdlpng.com%2Fpng%2F1733783&psig=AOvVaw3Xa8MCdKlIHdg7HKnFmKDu&ust=1593286021449000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJiTl42boOoCFQAAAAAdAAAAABAZ'} alt='KBI' className={classes.logo} />
      <Typography className={classes.title}>{moduleTitle}</Typography>
      <Typography className={classes.email}>{currentUserEmail}</Typography>
      <Divider className={classes.divider} />
      <List className={classes.list}>
        {menuItems.map(item => <MenuItem key={item.text} icon={item.icon()} link={item.link} text={item.text} selectedLinkComparison={item.selectedLinkComparison} />)}
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
};

export default Drawer;
