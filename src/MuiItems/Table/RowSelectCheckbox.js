import React, {forwardRef, useEffect, useRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Checkbox} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const RowSelectCheckbox = forwardRef(
  ({indeterminate, selectRowHandler, selectedFlatRows, rowData, ...rest}, ref) => {
    const styles = useStyles();
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;
    const checkboxProps = useMemo(() => ({
      classes: {root: styles.root},
      color: 'default',
      indeterminate,
      ref: resolvedRef,
      type: 'checkbox',
    }), [indeterminate, resolvedRef, styles.root]);

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    const onChangeHandler = async (event, checked) => {
      rest.onChange(event, checked);
      let dataOfSelectedRows;
      if (checked) {
        dataOfSelectedRows = [...selectedFlatRows.map(tableRow => tableRow.original), rowData];
      } else {
        // rowData is a reference to tableRow.original. this comparison will filter out the proper object.
        dataOfSelectedRows = selectedFlatRows.filter(tableRow => tableRow.original !== rowData);
      }

      if (typeof selectRowHandler === 'function') selectRowHandler({event, rowData, dataOfSelectedRows, checked});
    };

    return <Checkbox {...checkboxProps} {...rest} onChange={onChangeHandler} />;
  },
);

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    borderRadius: 0,
    padding: '0px',
  },
}));
RowSelectCheckbox.propTypes = {
  indeterminate: PropTypes.bool,
  selectRowHandler: PropTypes.func,
  selectedFlatRows: PropTypes.arrayOf(PropTypes.object),
  rowData: PropTypes.object,
};
export default RowSelectCheckbox;
