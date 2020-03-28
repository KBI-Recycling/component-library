import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';

const ActionButton = React.memo((props) => {
  const [forceUpdate, setForceUpdate] = useState(0);
  const {buttonProps, icon, onClick, rtProps, text} = props;
  const Icon = icon || null;
  const tableData = {
    columns: rtProps.columns,
    data: rtProps.data,
    initialState: rtProps.initialState,
    state: rtProps.state,
    allColumns: rtProps.allColumns,
    rows: rtProps.rows,
    rowsById: rtProps.rowsById,
    headers: rtProps.headers,
    filteredRows: rtProps.filteredRows,
    selectedRows: rtProps.selectedFlatRows,
  };
  const actionProps = {
    color: 'primary',
    size: 'small',
    startIcon: Icon ? <Icon /> : null,
    style: {borderRadius: '0px', padding: '6px 16px'},
    onClick: event => onClick ? onClick({event, tableData}) : {},
    onFocus: event => setForceUpdate(forceUpdate + 1),
    ...buttonProps,
  };
  return <Button {...actionProps}>{text}</Button>;
});
ActionButton.propTypes = {
  buttonProps: PropTypes.object,
  icon: PropTypes.oneOfType([PropTypes.object]),
  onClick: PropTypes.func,
  rtProps: PropTypes.object,
  text: PropTypes.string,
};

const ActionBar = ({actions, rtProps}) => {
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

  if (!actions) return null;
  return (
    <div {...actionProps}>
      {actions.map((action, actionIndex) => {
        if (typeof action === 'function') action = action(rtProps);
        const {buttonProps, icon, onClick, text} = action;
        return <ActionButton key={text || actionIndex} buttonProps={buttonProps} icon={icon} onClick={onClick} text={text} rtProps={rtProps} />;
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
