import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';

const ActionBar = (props) => {
  const actionProps = useMemo(() => ({
    style: {
      backgroundColor: 'whitesmoke',
      borderBottom: '1px solid gray',
      borderTop: '1px solid gray',
      overflowX: 'auto',
      overflowY: 'hidden',
      whiteSpace: 'nowrap',
    },
  }), []);

  if (!props.actions) return null;
  return (
    <div {...actionProps}>
      {props.actions.map((action, actionIndex) => {
        if (typeof action === 'function') action = action(props.rtProps);
        const Icon = action.icon || null;
        const actionProps ={
          color: 'primary',
          size: 'small',
          startIcon: Icon ? <Icon /> : null,
          style: {borderRadius: '0px', padding: '8px 16px'},
          onClick: event => action.onClick ? action.onClick(event) : alert('No onClick() property set.'),
          ...action?.buttonProps,
        };
        return <Button key={action.text || actionIndex} {...actionProps}>{action.text || `Action ${actionIndex + 1}`}</Button>;
      })}
    </div>
  );
};

ActionBar.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ])),
  rtProps: PropTypes.object,
};
export default ActionBar;
