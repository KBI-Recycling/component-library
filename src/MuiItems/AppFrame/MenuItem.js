import React, {forwardRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Link, useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core';

const MenuItem = ({icon, link, text, onClickFunc, selectedLinkComparison, smallDevice, setDrawerOpen, visible}) => {
  const classes = useStyles();
  const history = useHistory();

  const CustomLink = useMemo(() => {
    const handleClick = e => {
      e.preventDefault();
      if (onClickFunc) {
        // if a onClick function is passed, it will run here and be passed the click event
        onClickFunc(e);
      }
      // if link is not defined or set as null, do not push into history
      if (link === undefined || link === null) return;
      // Prevents same path being added to history multiple times.
      if (history.location.pathname !== link) history.push(link);
      // Close Drawer, on small devices only, when menu link is clicked.
      if (smallDevice) setDrawerOpen(false);
    };
    // Makes ListItem function more like <a /> tag.
    return forwardRef((linkProps, ref) => <Link ref={ref} to={link} {...linkProps} onClick={handleClick} />);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.pathname, link, smallDevice]);

  if (!visible) return null;

  return (
    <ListItem button component={CustomLink} classes={{root: classes.listItem}}
      selected={history.location.pathname.includes(selectedLinkComparison ? selectedLinkComparison : link)}
    >
      <ListItemIcon classes={{root: classes.listItemIcon}}>{icon}</ListItemIcon>
      <ListItemText primary={text} classes={{primary: classes.listItemTextPrimary}} />
    </ListItem>
  );
};

MenuItem.propTypes = {
  icon: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
  selectedLinkComparison: PropTypes.string,
  text: PropTypes.string.isRequired,
  smallDevice: PropTypes.bool.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  onClickFunc: PropTypes.func,
};
const useStyles = makeStyles(theme => ({
  listItem: {
    'margin': '4px 0px',
    '&.Mui-selected': {
      'background': `rgba(237, 28, 36, 0.25)`,
      'borderRadius': '4px',
      '&:hover': {
        background: `rgba(237, 28, 36, 0.25)`,
        borderRadius: '4px',
      },
      '& $listItemIcon': {
        color: '#ED1C24',
      },
    },
    '&:hover': {
      background: `rgba(237, 28, 36, 0.25)`,
      borderRadius: '4px',
    },
  },
  listItemIcon: {
    color: '#000000',
  },
  listItemTextPrimary: {
    color: '#464646',
    fontSize: '16px',
  },
}));
export default MenuItem;
