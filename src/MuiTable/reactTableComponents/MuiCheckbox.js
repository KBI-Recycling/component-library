import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

const MuiCheckbox = React.forwardRef(
  ({indeterminate, ...rest}, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <Checkbox type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  },
);

export default MuiCheckbox;
