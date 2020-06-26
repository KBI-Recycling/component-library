import React, {forwardRef, useMemo} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
// import {acSetDrawerOpen} from 'global_state/actions.js';

const MenuItem = ({icon, link, text, selectedLinkComparison}) => {
  const smallDevice = false; // useSelector(state => state.global.smallDevice);
  const classes = useStyles();
  // const dispatch = useDispatch();
  const history = useHistory();

  const CustomLink = useMemo(() => {
    const handleClick = e => {
      e.preventDefault();
      // Prevents same path being added to history multiple times.
      if (history.location.pathname !== link) history.push(link);
      // Close Drawer, on small devices only, when menu link is clicked.
      // if (smallDevice) dispatch(acSetDrawerOpen(false));
    };
    // Makes ListItem function more like <a /> tag.
    return forwardRef((linkProps, ref) => <Link ref={ref} to={link} {...linkProps} onClick={handleClick} />);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.pathname, link, smallDevice]);

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
