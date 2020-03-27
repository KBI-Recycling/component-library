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

  return (
    <div {...actionProps}>
      {props.actions.map(action => {
        if (typeof action === 'function') action = action(props.rtProps);
        console.log({action});
        const Icon = action.icon || null;
        const actionProps ={
          color: 'primary',
          size: 'small',
          startIcon: Icon ? <Icon /> : null,
          style: {borderRadius: '0px', padding: '8px 16px'},
          onClick: event => action.onClick(event),
          ...action?.buttonProps,
        };
        return <Button key={action.text} {...actionProps}>{action.text}</Button>;
      })}
    </div>
  );
};

ActionBar.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      /**  The icon that will be displayed for the action. */
      icon: PropTypes.oneOfType([PropTypes.object]).isRequired,
      /** The tooltip that will be displayed when the user hover over the action icon. */
      text: PropTypes.string,
      /** The function that will be triggered when the button is clicked. ***Signature:*** `({event, columns, data, filteredRows, filteredFlatRows, flatHeaders, flatRows, headers, preFilteredRows, preFilteredFlatRows, preSortedRows, rows, selectedFlatRows, sortedRows}) => {}` */ //eslint-disable-line
      onClick: PropTypes.func.isRequired,
    }),
  ])),
  rtProps: PropTypes.object,
};
export default ActionBar;
