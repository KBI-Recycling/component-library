import React, {forwardRef, useEffect, useRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Checkbox} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const RowSelectCheckbox = forwardRef(
  ({indeterminate, ...rest}, ref) => {
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

    return <Checkbox {...checkboxProps} {...rest} />;
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
};
export default RowSelectCheckbox;
